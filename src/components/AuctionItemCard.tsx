import { FC } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuctionItemProps {
  id: number;
  name: string;
  emoji: string;
  startingPrice: number;
  color: number;
  endDate : Date

}

export const AuctionItemCard: FC<AuctionItemProps> = ({ id, name, emoji, startingPrice, color,endDate }) => {
  const hexColor = `#${color.toString(16).padStart(6, "0")}`;
  const isOver = endDate < new Date()

  return (
    <Card 
      key={id} 
      className="overflow-hidden transition-shadow hover:shadow-lg"
      style={{ borderTop: `4px solid ${hexColor}` }}
    >
      <CardContent className="p-6">
        <div 
          className="text-4xl mb-4 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${hexColor}20` }}
        >
          {emoji}
        </div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Starting bid
        </p>
        <p className="text-2xl font-bold" style={{ color: hexColor }}>
          ${(startingPrice / 100).toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="bg-muted p-4">
        <Button asChild className="w-full" variant="outline" disabled={isOver}>
          <Link href = {`/items/${id}`}>
          {!isOver?"Start Bidding":"View Auction Results"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};