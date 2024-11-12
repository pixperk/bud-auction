import { env } from "@/env";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Declare a global variable in Node.js to cache the database connection in development mode
declare global {
  // eslint-disable-next-line no-var
  var database: NodePgDatabase<typeof schema> | undefined;
}

let database: NodePgDatabase<typeof schema>;

function db() {
  if (!database) {
    try {
      const pool = new Pool({ connectionString: env.DATABASE_URL });
      database = drizzle(pool, { schema });
      
      // Cache the database instance globally in development
      if (env.NODE_ENV !== "production") {
        global.database = database;
      }
    } catch (error) {
      console.error("Failed to initialize database connection:", error);
      throw new Error("Database connection initialization failed");
    }
  }
  return database;
}

export { db };
