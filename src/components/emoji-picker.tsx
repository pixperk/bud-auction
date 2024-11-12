'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export function EmojiPicker({ defaultEmoji }: { defaultEmoji: string }) {
  const [selectedEmoji, setSelectedEmoji] = useState(defaultEmoji)
  const [customEmoji, setCustomEmoji] = useState('')

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native)
  }

  const handleCustomEmojiSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customEmoji) {
      setSelectedEmoji(customEmoji)
      setCustomEmoji('')
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 p-0">
          {selectedEmoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        <form onSubmit={handleCustomEmojiSubmit} className="mt-2 flex gap-2">
          <Input
            type="text"
            placeholder="Custom emoji"
            value={customEmoji}
            onChange={(e) => setCustomEmoji(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </PopoverContent>
      <input type="hidden" name="emoji" value={selectedEmoji} />
    </Popover>
  )
}