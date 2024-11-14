import { auth } from "@/auth";
import { db } from "@/db/database";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";



export async function updateDiscordId(id : string){
    const session = await auth();
    if(!session || !session.user) throw new Error("Unauthorized")
    await db().update(users)
    .set({discordId : id})
    .where(eq(users.id, session.user.id!));
}
