"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { bids, items } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Knock } from "@knocklabs/node";
import { env } from "@/env";

const knock = new Knock(env.KNOCK_SECRET_KEY);

export async function createBidAction(itemId: number, userBid: number) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const item = await db().query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) throw new Error("Item Not Found");

  const bidValue = userBid * 100;

  const bidDiff =
    bidValue - (item.currentBid == 0 ? item.startingPrice : item.currentBid);

  if (Math.round(bidDiff % item.bidInterval) !== 0) {
    throw new Error("Invalid bid amount: Must be in the correct bid interval.");
  }

  if (item.endDate < new Date()) throw new Error("Bidding is over");
  if (
    bidValue < (item.currentBid == 0 ? item.startingPrice : item.currentBid) ||
    (item.currentBid && bidValue == item.currentBid)
  )
    throw new Error("Your bid must be higher than the current bid.");

  await db().insert(bids).values({
    amount: bidValue,
    itemId,
    userId: userId,
    timestamp: new Date(),
  });

  await db()
    .update(items)
    .set({
      currentBid: bidValue,
    })
    .where(eq(items.id, itemId));
  //Send notification
  const currentBids = await db().query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: {
      user: true,
    },
  });

  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  for (const bid of currentBids) {
    if (
      bid.userId !== userId &&
      !recipients.find((recipient) => recipient.id === bid.userId)
    ) {
      recipients.push({
        id: bid.userId + "",
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email!,
      });
    }
  }

  if (recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: userId,
        name: session.user?.name ?? "Anonymous",
        email: session.user?.email,
        collection: "users",
      },
      recipients,
      data: {
        itemId,
        bidAmount: bidValue,
        itemName: item.name,
      },
    });
  }
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
