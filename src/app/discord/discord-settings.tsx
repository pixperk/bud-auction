'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const highlightedLinkClass = "text-primary font-medium hover:underline hover:text-primary/80 transition-colors"

export default function DiscordSettings({ initialDiscordId = '', updateDiscord }: { initialDiscordId?: string, updateDiscord: (discordId: string) => Promise<void> }) {
  const [discordId, setDiscordId] = useState(initialDiscordId)
  const { toast } = useToast()

  const handleSaveChanges = () => {
    try {
       updateDiscord(discordId)
      toast({
        title: "Settings updated",
        description: "Your Discord ID has been successfully saved.",
        duration: 3000,
      })
    } catch (e : unknown) {
      toast({
        title: "Error",
        description:  e instanceof Error ? e.message : "Failed to update Discord ID. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } 
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Discord Settings</CardTitle>
          <CardDescription>Configure your Discord integration for Bud Auction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="discordId">Discord ID</Label>
            <Input
              id="discordId"
              placeholder="e.g., 1251455341758119938"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Don&apos;t know how to find your Discord ID?{' '}
              <Link href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-" className={highlightedLinkClass} target="_blank" rel="noopener noreferrer">
                Learn how to obtain it here
              </Link>.
            </p>
          </div>

          <Alert>
            <AlertTitle>Guidelines for Discord Integration</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <Link href="https://discord.com/oauth2/authorize?client_id=1306223397696569395&permissions=2048&integration_type=0&scope=bot" className={highlightedLinkClass} target="_blank" rel="noopener noreferrer">
                    Add our bot to your server
                  </Link> to receive outbidding alerts on Discord.
                </li>
                <li>If your Discord ID is empty, you won&apos;t receive Discord DMs.</li>
                <li>Make sure to allow direct messages from server members in your Discord privacy settings.</li>
                <li>Keep your Discord ID up to date to ensure you receive all notifications.</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="flex items-center space-x-2">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              By providing your Discord ID, you agree to receive notifications from Bud Auction.
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>
           Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}