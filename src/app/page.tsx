import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight, Gavel, Clock, Users, Shield } from "lucide-react";

const LandingPage: FC = () => {
  return (
   
      <main className="container mx-auto px-2 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to Bud Auction</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover unique items and bid on exciting auctions. Join our community of buyers and sellers today!
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              View Ongoing Auctions
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Why Choose Bud Auction?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Gavel, title: "Easy Bidding", description: "Intuitive interface for seamless bidding experience" },
              { icon: Clock, title: "Real-time Updates", description: "Get instant notifications on your bids and auctions" },
              { icon: Users, title: "Vibrant Community", description: "Connect with passionate collectors and sellers" },
            ].map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", review: "Bud Auction has transformed my collecting hobby. The variety of items is incredible!", rating: 5 },
              { name: "Sarah Lee", review: "As a seller, I love how easy it is to list items and reach potential buyers.", rating: 4 },
              { name: "Mike Brown", review: "The real-time bidding feature keeps me coming back. It's so exciting!", rating: 5 },
            ].map((review, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{review.review}"</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">Ready to Start Bidding?</h2>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Join Bud Auction Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>

  );
};

export default LandingPage;