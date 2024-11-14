import { AuctionItemCard } from "@/components/AuctionItemCard";
import { getItems } from "./itemQuery";
import { isBidOver } from "@/utils/bid";



const Page = async () => {
  const allItems  = await getItems()
  return (
    <main className="container py-12 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Auction Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allItems.map((item) => (
          <AuctionItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            emoji={item.emoji}
            startingPrice={item.startingPrice}
            color={item.color}
            isOver = {isBidOver(item)} 
          />
        ))}
      </div>
    </main>
  );
};

export default Page;