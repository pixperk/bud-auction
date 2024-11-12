import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable("ba_bids", {
  id: serial("id").primaryKey(),
  
});
