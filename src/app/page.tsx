'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, Gavel, MessageSquare, Star, Users } from 'lucide-react'
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"


export default function LandingPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="flex flex-col md:flex-row items-center mb-20">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to Bud Auction</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Discover unique items and bid on exciting auctions. Join our community of buyers and sellers today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={() => signIn("google",{
                  callbackUrl : "/auctions/all"
                })} size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/auctions/all">
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                View Ongoing Auctions
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 px-5">
          <Image
            src="/undraw_online_groceries_a02y.svg"
            alt="Auction illustration"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">Why Choose Bud Auction?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Gavel, title: "Easy Bidding", description: "Intuitive interface for seamless bidding experience" },
            { icon: Clock, title: "Real-time Updates", description: "Get instant notifications on your bids and auctions" },
            { icon: Users, title: "Vibrant Community", description: "Connect with passionate collectors and sellers" },
            { icon: MessageSquare, title: "Discord Alerts", description: "Instant Discord messages when you're outbid" },
          ].map((feature, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alex Johnson", review: "Bud Auction has transformed my collecting hobby. The variety of items is incredible!", rating: 5, avatar: "/alex.svg" },
            { name: "Sarah Lee", review: "As a seller, I love how easy it is to list items and reach potential buyers.", rating: 4, avatar: "/sarah.svg" },
            { name: "Mike Brown", review: "The real-time bidding feature and Discord alerts keep me engaged. It's so exciting!", rating: 5, avatar: "/mike.svg" },
          ].map((review, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={review.avatar}
                    alt={`${review.name}'s avatar`}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">&quot;{review.review}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
            <p className="text-gray-600 text-center max-w-xs">Sign up and join our community of buyers and sellers</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Gavel className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Place Your Bids</h3>
            <p className="text-gray-600 text-center max-w-xs">Find items you love and start bidding</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Stay Updated</h3>
            <p className="text-gray-600 text-center max-w-xs">Receive instant Discord alerts when you&apos;re outbid</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Ready to Start Bidding?</h2>
        <Button onClick={() => signIn("google",{
                  callbackUrl : "/auctions/all"
                })} size="lg" className="bg-purple-600 hover:bg-purple-700">
          Join Bud Auction Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </main>
  )
}