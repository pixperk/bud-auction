import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { db as database } from "@/db/database";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const allItems = await database().query.items.findMany();

  return (
    <main className="container py-12 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Auction Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allItems.map((item) => {
          const intColor = item.color;
          const color = `#${intColor.toString(16).padStart(6, "0")}`;

          return (
            <Card 
              key={item.id} 
              className="overflow-hidden transition-shadow hover:shadow-lg"
              style={{ borderTop: `4px solid ${color}` }}
            >
              <CardContent className="p-6">
                <div 
                  className="text-4xl mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  {item.emoji}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Starting bid
                </p>
                <p className="text-2xl font-bold" style={{ color }}>
                  ${(item.startingPrice / 100).toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="bg-muted p-4">
                <Button className="w-full" variant="outline">
                  Place Bid
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default Page;