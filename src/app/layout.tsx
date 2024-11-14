import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "@knocklabs/react-notification-feed/dist/index.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bud Auction",
  description: "Auction project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionProvider>
       
        <Navbar />
        <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-8">
          {children}
        </div>
        <Toaster/>
       
        </SessionProvider>
      </body>
    </html>
  );
}
