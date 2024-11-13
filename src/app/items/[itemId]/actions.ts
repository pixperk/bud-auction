"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { bids, items } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBidAction(itemId: number, userBid: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const item = await db().query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) throw new Error("Item Not Found");

  const bidValue = userBid * 100;

  const bidDiff = (bidValue - (item.currentBid==0?item.startingPrice:item.currentBid))

  if (Math.round( bidDiff % item.bidInterval) !== 0) {
    throw new Error("Invalid bid amount: Must be in the correct bid interval.");
  }


  await db().insert(bids).values({
    amount: bidValue,
    itemId,
    userId: session.user.id,
    timestamp: new Date(),
  });

  await db()
    .update(items)
    .set({
      currentBid: bidValue,
    })
    .where(eq(items.id, itemId));

  revalidatePath(`/items/${itemId}`);
}

export async function getAllBids(itemId: number) {
  const allBids = await db().query.bids.findMany({
    where: eq(bids.itemId, itemId),
    orderBy: desc(bids.id),
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
  });

  return allBids;
}
