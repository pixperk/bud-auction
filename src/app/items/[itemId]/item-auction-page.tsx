'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast, useToast } from "@/hooks/use-toast"
import { Clock, DollarSign, Users, ChevronUp, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createBidAction } from './actions'
import { Bids } from '@/db/schema'
import { toDollars } from '@/utils/currency'
import { formatDate } from '@/utils/date'

type BidType = Bids & {
  user: {
    image: string | null; 
    name: string | null;  
  };
};

interface AuctionItemProps {
  itemId : number
  name: string;
  startingBid: number;
  current : number
  emoji: string;
  color: string;
  bidInterval: number;
  bidders: BidType[];
}

export default function AuctionItemPage({ itemId,name, startingBid,current, emoji, color, bidders, bidInterval }: AuctionItemProps) {
  const [currentBid, setCurrentBid] = useState(current>0?current:startingBid)
  const [userBid, setUserBid] = useState(current>0?current:startingBid)
  const { toast } = useToast()

  const handleBidChange = (increment: boolean) => {
    setUserBid(prevBid => {
      const newBid = increment ? prevBid + bidInterval : prevBid - bidInterval
      return Math.max(currentBid, newBid) 
    })
  }

  const handleBidSubmit = async () => {
    if (userBid > currentBid) {
      try {
        setCurrentBid(userBid);
  
        await createBidAction(itemId, userBid);
  
        toast({
          title: "Bid placed successfully!",
          description: `Your bid of $${userBid.toLocaleString()} has been placed.`,
        });
      } catch (e : any) {
        setCurrentBid(currentBid);
        setUserBid(currentBid)
  
        toast({
          title: "Error placing bid",
          description: e.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Bid too low",
        description: "Your bid must be higher than the current bid.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
          <Badge style={{ backgroundColor: color }} className="text-white text-2xl p-2">
            {emoji}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="text-gray-500" />
              <span className="text-gray-700">Time left: 2d 5h 30m</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-gray-500" />
              <span className="text-gray-700">{bidders.length} bidders</span>
            </div>
          </div>

<div className='flex  items-center justify-between'>
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Bid</h3>
            <p className="text-3xl font-bold" style={{ color }}>
              ${currentBid.toLocaleString()}
            </p>
          </div>

          

          <div className='flex flex-col items-center justify-center'>
            <h3 className="text-lg font-semibold mb-2">Place Your Bid</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none px-4 py-2"
                  onClick={() => handleBidChange(false)}
                >
                  <ChevronDown className="h-5 w-5 text-gray-600" />
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
                  className="border-none px-4 py-2"
                  onClick={() => handleBidChange(true)}
                >
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Item Details</h3>
            <p className="text-gray-700">
              <b>Bid Interval : ${bidInterval}</b><br/>
              This {name.toLowerCase()} is a rare find, perfect for collectors and enthusiasts alike.
              Don&apos;t miss your chance to own this unique piece!
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" disabled={bidders.length === 0}>
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
                      <TableCell>${toDollars(bidder.amount).toLocaleString()}</TableCell>
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
        <Button
          onClick={handleBidSubmit}
          className="w-full text-lg"
          style={{ backgroundColor: color }}
        >
          <DollarSign className="mr-2 h-5 w-5" /> Place Bid
        </Button>
      </CardFooter>
    </Card>
  )
}
