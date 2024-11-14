import { db } from "@/db/database";
import { items } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getItems(){
    const allItems = await db().query.items.findMany({
    limit : 60,
    orderBy : desc(items.id)
  });
return allItems
}
