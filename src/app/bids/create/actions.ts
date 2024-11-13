"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData, endDate:Date) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const user = session.user;
  if (!user || !user.id) throw new Error("Unauthorized");

  const startingPrice = formData.get('startingPrice') as string
  const bidInterval = formData.get('bidInterval') as string

  const priceAsCents = Math.floor(parseFloat(startingPrice)*100)
  const bidIntervalAsCents = Math.floor(parseFloat(bidInterval)*100)
  const hexWithoutHash = (formData.get("color") as string).replace("#", "");
  const intColor = parseInt(hexWithoutHash, 16);

  await db()
    .insert(items)
    .values({
      name: formData.get("name") as string,
      startingPrice : priceAsCents,
      userId: user.id,
      color : intColor,
      emoji : formData.get("emoji") as string,
      bidInterval : bidIntervalAsCents,
      endDate
    });
    redirect("/auctions/my");
}
