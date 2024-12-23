"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bids } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import { toDollars } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import format from "date-fns/format";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  User,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { createBidAction } from "./actions";

type BidType = Bids & {
  user: {
    image: string | null;
    name: string | null;
  };
};

interface AuctionItemProps {
  ownerId: string;
  itemId: number;
  name: string;
  startingBid: number;
  startedBy: {
    name: string | null;
    image: string | null;
  };
  current: number;
  emoji: string;
  color: string;
  bidInterval: number;
  bidders: BidType[];
  endDate: Date;
}

export default function AuctionItemPage({
  ownerId,
  itemId,
  name,
  startingBid,
  current,
  emoji,
  color,
  bidders,
  bidInterval,
  startedBy,
  endDate,
}: AuctionItemProps) {
  const session = useSession();

  const canPlaceBid = session && session.data?.user;
  const owner = ownerId === session.data?.user?.id;
  const isBidOver = endDate < new Date()
  const highestBidder = bidders[0]
  const [currentBid, setCurrentBid] = useState(
    current > 0 ? current : startingBid
  );
  const [userBid, setUserBid] = useState(current > 0 ? current : startingBid);
  const { toast } = useToast();

  const handleBidChange = (increment: boolean) => {
    setUserBid((prevBid) => {
      const newBid = increment ? prevBid + bidInterval : prevBid - bidInterval;
      return Math.max(currentBid, newBid);
    });
  };

  const handleBidSubmit = async () => {
         try {
        setCurrentBid(userBid);
        await createBidAction(itemId, userBid);
        toast({
          title: "Bid placed successfully!",
          description: `Your bid of $${userBid.toLocaleString()} has been placed.`,
        });
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? "Inappropriate Bid Amount" : "An unexpected error occurred.";
        setCurrentBid(currentBid);
        setUserBid(currentBid);
        toast({
          title: "Error placing bid",
          description: errorMessage,
          variant: "destructive",
        });
      }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
          <Badge
            style={{ backgroundColor: color }}
            className="text-white text-2xl p-2"
          >
            {emoji}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="text-gray-500" />
              <p className="text-gray-700">
                {isBidOver ? (
                  "This bid has ended"
                ) : (
                  <>
                    Ends on : {" "}
                    <span className="font-semibold">
                      {format(endDate, "eeee, MMMM dd, yyyy")}
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-gray-500" />
              <span className="text-gray-700">{bidders.length} bids</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Bid</h3>
              <p className="text-3xl font-bold" style={{ color }}>
                ${currentBid.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <h3 className="text-lg font-semibold mb-2">Place Your Bid</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-none"
                    onClick={() => handleBidChange(false)}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Input
                    type="number"
                    value={userBid.toFixed(2)}
                    onChange={(e) => setUserBid(Number(e.target.value))}
                    className="text-center w-24 border-0 focus:ring-0 focus:outline-none"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-none"
                    onClick={() => handleBidChange(true)}
                  >
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Item Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Bid Interval</p>
                <p className="text-base font-medium">${bidInterval}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Starting Bid</p>
                <p className="text-base font-medium">
                  ${startingBid.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="mt-3 text-gray-700">
              This {name.toLowerCase()} is a rare find, perfect for collectors
              and enthusiasts alike.
            </p>
          </div>

          <div className="flex items-center justify-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={startedBy.image || undefined}
                alt={startedBy.name || "User"}
              />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-600">Auction started by</p>
              <p className="font-medium">{startedBy.name || "Anonymous"}</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full"
                disabled={bidders.length === 0}
              >
                <Users className="mr-2 h-5 w-5" /> View Bidders
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Bidders</DialogTitle>
                <DialogDescription>
                  Current bidders for {name}
                </DialogDescription>
              </DialogHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Bid Amount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bidders.map((bidder) => (
                    <TableRow key={bidder.id}>
                      <TableCell>{bidder.user.name}</TableCell>
                      <TableCell>
                        ${toDollars(bidder.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>{formatDate(bidder.timestamp)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      <CardFooter>
      {isBidOver && highestBidder ? (
          <div className="flex items-center justify-between w-full p-2 bg-green-100 rounded-md">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={highestBidder.user.image || undefined}
                  alt={highestBidder.user.name || "Winner"}
                />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Winning Bidder</p>
                <p className="font-medium">{highestBidder.user.name || "Anonymous"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Winning Bid</p>
              <p className="text-xl font-bold text-green-600">
                ${toDollars(highestBidder.amount)}
              </p>
            </div>
          </div>
        ) : (
          !isBidOver && (
            <Button
              onClick={handleBidSubmit}
              className="w-full text-lg"
              disabled={!canPlaceBid || owner}
              style={{ backgroundColor: color }}
            >
              {canPlaceBid ? (
                owner ? (
                  "You are the owner"
                ) : (
                  <>
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Place Bid</span>
                  </>
                )
              ) : (
                "Kindly Log In to Bid"
              )}
            </Button>
          )
        )}

      </CardFooter>
    </Card>
  );
}
