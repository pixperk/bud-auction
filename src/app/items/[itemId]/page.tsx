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
    with : {
      user : {
        columns : {
          name : true,
          image : true
        }
      }
    }
  });

  if (!item) {
    redirect("/auctions/my");
  }
 
  const bidders = await getAllBids(parseInt(itemId));
 
  
  const intColor = item.color;
  const color = `#${intColor.toString(16).padStart(6, "0")}`;
  return (
    <AuctionItemPage
      ownerId= {item.userId}
      itemId = { parseInt(itemId)}
      name={item.name}
      startingBid={toDollars(item.startingPrice)}
      startedBy = {item.user}
      current={toDollars(item.currentBid)}
      emoji={item.emoji}
      color={color}
      bidders={bidders}
      bidInterval={toDollars(item.bidInterval)}
      endDate = {item.endDate}
    />
  );
};

export default page;
