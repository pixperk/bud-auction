import { db } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { FC } from "react";
import AuctionItemPage from "./item-auction-page";
import { toDollars } from "@/utils/currency";

interface pageProps {
  params: { itemId: number };
}

const page: FC<pageProps> = async ({ params: { itemId } }) => {
  const item = await db().query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) {
    redirect("/auctions/my");
  }
  const mockBidders = [
   
  ];
  const intColor = item.color;
  const color = `#${intColor.toString(16).padStart(6, "0")}`;
  return (
    <AuctionItemPage
      name={item.name}
      startingBid={toDollars(item.startingPrice)}
      emoji={item.emoji}
      color={color}
      bidders={mockBidders}
      bidInterval={toDollars(item.bidInterval)}
    />
  );
};

export default page;
