"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { createItemAction } from './actions'

function EmojiPickerModal({ onEmojiSelect }: { onEmojiSelect: (emoji: string) => void }) {
  const [selectedEmoji, setSelectedEmoji] = useState('😀')
  const [open, setOpen] = useState(false)

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji)
    onEmojiSelect(emojiData.emoji)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-24 h-24 text-6xl p-0">
          {selectedEmoji}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Choose an Emoji</DialogTitle>
        </DialogHeader>
        <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" height="350px" />
      </DialogContent>
    </Dialog>
  )
}

function ColorPickerModal({ onColorSelect }: { onColorSelect: (color: string) => void }) {
  const [selectedColor, setSelectedColor] = useState('#FF0000')
  const [open, setOpen] = useState(false)

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    onColorSelect(color)
  }

  const handlePredefinedColorSelect = (color: string) => {
    handleColorSelect(color)
    setOpen(false)
  }

  const predefinedColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008080', '#FFC0CB', '#A52A2A', '#808080'
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-24 h-24 p-0" 
          style={{ backgroundColor: selectedColor }}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose a Color</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {predefinedColors.map((color) => (
            <Button
              key={color}
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: color }}
              onClick={() => handlePredefinedColorSelect(color)}
            />
          ))}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorSelect(e.target.value)}
            className="h-10 w-full"
          />
        </div>
        <Button onClick={() => setOpen(false)} className="mt-4">
          Confirm Color
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default function SellItemPage() {
  const [selectedEmoji, setSelectedEmoji] = useState('😀')
  const [selectedColor, setSelectedColor] = useState('#FF0000')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.append('emoji', selectedEmoji)
    formData.append('color', selectedColor)
    
    createItemAction(formData);
  }

  return (
    <main className="container max-w-2xl py-12 mx-auto">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Post an Item to Sell</h1>
          <p className="text-muted-foreground">Fill in the details of the item you want to sell</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input required id="name" name="name" placeholder="Enter item name" className="h-14 text-lg" />
            <Input
              required
              id="startingPrice"
              name="startingPrice"
              placeholder="Enter starting price"
              type="number"
              step="0.01"
              min="0"
              className="h-14 text-lg"
            />
          </div>
          <div className="flex justify-center gap-8">
            <EmojiPickerModal onEmojiSelect={setSelectedEmoji} />
            <ColorPickerModal onColorSelect={setSelectedColor} />
          </div>
          <Button className="w-full h-14 text-lg" type="submit">
            Post Item
          </Button>
        </form>
      </div>
    </main>
  )
}