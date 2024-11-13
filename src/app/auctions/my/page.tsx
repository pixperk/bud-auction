import { db as database } from "@/db/database";
import { FC } from "react";
import { AuctionItemCard } from "@/components/AuctionItemCard";
import { eq } from "drizzle-orm";
import { items } from "@/db/schema";
import { auth } from "@/auth";
import { EmptyAuctionState } from "./EmptyAuctionState";
import { redirect } from "next/navigation";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const session = await auth();
  if(!session || !session.user)  redirect("/")

    const user = session.user

  const allItems = await database().query.items.findMany({
    where : eq(items.userId, user.id!)
  });

  const hasItems = allItems.length>0

  if(!hasItems){
    return <EmptyAuctionState/>
  }

  return (
    <main className="container py-12 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">{user.name?`${user.name.split(" ")[0]}'s` : "Your"} Auctions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allItems.map((item) => (
          <AuctionItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            emoji={item.emoji}
            startingPrice={item.startingPrice}
            color={item.color}
            endDate = {item.endDate} 

          />
        ))}
      </div>
    </main>
  );
};

export default Page;