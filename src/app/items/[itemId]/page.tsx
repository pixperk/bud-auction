import { db } from "@/db/database";
import { bids, items } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { FC } from "react";
import AuctionItemPage from "./item-auction-page";
import { toDollars } from "@/utils/currency";
import { getAllBids } from "./actions";

interface pageProps {
  params: { itemId: string };
}

const page: FC<pageProps> = async ({ params: { itemId } }) => {
  const item = await db().query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  if (!item) {
    redirect("/auctions/my");
  }
 
  const bidders = await getAllBids(parseInt(itemId));

  
  const intColor = item.color;
  const color = `#${intColor.toString(16).padStart(6, "0")}`;
  return (
    <AuctionItemPage
      itemId = { parseInt(itemId)}
      name={item.name}
      startingBid={toDollars(item.startingPrice)}
      current={toDollars(item.currentBid)}
      emoji={item.emoji}
      color={color}
      bidders={bidders}
      bidInterval={toDollars(item.bidInterval)}
    />
  );
};

export default page;
