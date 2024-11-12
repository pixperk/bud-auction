import { env } from "@/env";
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from "./schema";


declare global {
  // eslint-disable-next-line no-var -- only var works here
var database : NodePgDatabase<typeof schema> | undefined
}

let database : NodePgDatabase<typeof schema>

if (env.NODE_ENV === "production") {
  database = drizzle(env.DATABASE_URL);
} else {
  if (!global.database) {
    global.database = drizzle(env.DATABASE_URL);
  }
  database = global.database;
}

export { database };
