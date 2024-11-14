'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UserBadge } from "@/components/UserBadge"
import { env } from "@/env"
import { toDollars } from '@/utils/currency'
import {
  KnockFeedProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react-notification-feed"
import { ArrowUpIcon, Gavel, Menu } from 'lucide-react'
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRef, useState } from 'react'
import { Button } from "./ui/button"

const navItems = [
  { name: "My Auctions", href: "/auctions/my" },
  { name: "All Auctions", href: "/auctions/all" },
  { name: "Create Auction", href: "/bids/create" },
]

export function Navbar() {
  const session = useSession()
  const [isVisible, setIsVisible] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const notifButtonRef = useRef(null)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <nav className="bg-background border-b sticky top-0 z-50 transition-shadow duration-300 ease-in-out hover:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Gavel className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">
                Bud Auction
              </span>
            </Link>
          </div>
          {session.data?.user ? (
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                href="/auctions/all"
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
              >
                All Auctions
              </Link>
            </div>
          )}
          <div className="flex items-center space-x-4">
            {session.data?.user && (
              <KnockFeedProvider
                apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
                feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}
                userId={session.data.user.id!}
              >
                <>
                  <NotificationIconButton
                    ref={notifButtonRef}
                    onClick={() => setIsVisible(!isVisible)}
                  />
                  <NotificationFeedPopover
                    buttonRef={notifButtonRef}
                    isVisible={isVisible}
                    onClose={() => setIsVisible(false)}
                    renderItem={(item) => (
                      <Link
                        onClick={() => setIsVisible(false)}
                        href={`/items/${item.item.data.itemId}`}
                        className="block p-4 hover:bg-accent/50 transition-all duration-300 ease-in-out rounded-lg m-2"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <ArrowUpIcon className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              New Bid on {item.item.data.itemName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Someone outbid you with ${toDollars(item.item.data.bidAmount)}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-xs font-medium text-white bg-red-500 px-2.5 py-0.5 rounded-full">
                            Outbid
                          </div>
                        </div>
                        <div className="mt-2 border-t border-border pt-2">
                          <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200">
                            View Auction
                          </button>
                        </div>
                      </Link>
                    )}
                  />
                </>
              </KnockFeedProvider>
            )}
            <div className="hidden md:block">
              {session.data?.user ? (
                <UserBadge user={session.data.user} />
              ) : (
                <Button type="submit" onClick={() => signIn()}>
                  Sign In
                </Button>
              )}
            </div>
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Link href="/" onClick={toggleSidebar} className="flex items-center space-x-2">
                      <Gavel className="h-6 w-6 text-purple-600" />
                      <span className="text-xl font-bold text-purple-600">
                        Bud Auction
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-5rem)] pb-10">
                  <div className="flex flex-col space-y-4 mt-4">
                    {session.data?.user ? (
                      <>
                        {navItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
                            onClick={toggleSidebar}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <div className="flex justify-center items-center p-4 border-t border-border mt-4">
                          <UserBadge user={session.data.user} />
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auctions/all"
                          className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
                          onClick={toggleSidebar}
                        >
                          All Auctions
                        </Link>
                        <div className="flex justify-center items-center p-4 border-t border-border mt-4">
                          <Button type="submit" onClick={() => signIn()} className="w-full">
                            Sign In
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}