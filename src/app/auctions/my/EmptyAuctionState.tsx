import { FC } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const EmptyAuctionState: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
      <div className="mb-8">
      <svg
          className="mx-auto h-48 w-48 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeWidth={0.5}
            d="M6 6h.008v.008H6V6z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold mb-2">No auctions yet</h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Get started by creating your first auction. It's easy and only takes a few minutes!
      </p>
      <Link href="/bids/create" passHref>
        <Button
          size="lg"
          className="font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:-translate-y-1 active:translate-y-0 px-8 py-3 rounded-full"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Auction
        </Button>
      </Link>
    </div>
  );
};