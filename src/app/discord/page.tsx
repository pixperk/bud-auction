import { auth } from "@/auth";
import { db } from "@/db/database";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import DiscordSettings from "./discord-settings";
import { updateDiscordId } from "./actions";

const page = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/");

  const user = await db().query.users.findFirst({
    where: eq(users.id, session.user.id!),
  });

  const updateDiscord = async(discordId : string)=>{
    "use server"
    await updateDiscordId(discordId)
  }

  if (!user) redirect("/");
  return <DiscordSettings initialDiscordId={user.discordId ?? ""} updateDiscord = {updateDiscord}/>;
};

export default page;
