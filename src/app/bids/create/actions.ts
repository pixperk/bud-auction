"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const user = session.user;
  if (!user || !user.id) throw new Error("Unauthorized");

  const startingPrice = formData.get('startingPrice') as string

  const priceAsCents = Math.floor(parseFloat(startingPrice)*100)
  const hexWithoutHash = (formData.get("color") as string).replace("#", "");
  const intColor = parseInt(hexWithoutHash, 16);

  await db()
    .insert(items)
    .values({
      name: formData.get("name") as string,
      startingPrice : priceAsCents,
      userId: user.id,
      color : intColor,
      emoji : formData.get("emoji") as string
    });
  redirect("/");
}