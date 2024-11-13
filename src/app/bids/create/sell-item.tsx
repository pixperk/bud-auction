'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { createItemAction } from './actions'
import { PlusCircleIcon, Palette, Smile } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

function EmojiPickerModal({ onEmojiSelect }: { onEmojiSelect: (emoji: string) => void }) {
  const [selectedEmoji, setSelectedEmoji] = useState('🔔')
  const [open, setOpen] = useState(false)
  
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji)
    onEmojiSelect(emojiData.emoji)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-16 h-16 text-3xl p-0 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors">
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
  const [selectedColor, setSelectedColor] = useState('#FF5733')
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
          className="w-16 h-16 p-0 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors" 
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
  const [endDate, setEndDate] = useState<Date>()
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("emoji", selectedEmoji);
    formData.append("color", selectedColor);
    
  
    try {
      if(!endDate || endDate < new Date()) throw new Error("Please Select appropriate date")
      await createItemAction(formData, endDate);
      toast({
        title: "Item created successfully!",
        description: "Your new auction item has been added.",
      });
     
    } catch (e : any) {
      toast({
        title: "Error creating item",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <main className="container max-w-2xl py-12 mx-auto px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Post an Item to Sell</h1>
          <p className="text-muted-foreground text-lg">Fill in the details of the item you want to auction</p>
        </div>
        <Separator className="my-8" />
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Item Name</label>
              <Input 
                required 
                id="name" 
                name="name" 
                placeholder="Enter item name" 
                className="h-12 text-lg border-2 border-gray-300 focus:border-gray-500 transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="startingPrice" className="text-sm font-medium text-gray-700">Starting Price</label>
              <Input
                required
                id="startingPrice"
                name="startingPrice"
                placeholder="Enter starting price"
                type="number"
                step="0.01"
                min="0"
                className="h-12 text-lg border-2 border-gray-300 focus:border-gray-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="bidInterval" className="text-sm font-medium text-gray-700">Bid Interval</label>
              <Input
                required
                id="bidInterval"
                name="bidInterval"
                placeholder="Enter bid interval"
                type="number"
                step="0.01"
                min="0"
                className="h-12 text-lg border-2 border-gray-300 focus:border-gray-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-700">Auction End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Smile className="mr-2 h-4 w-4" />
                Choose an Emoji
              </label>
              <div className="flex justify-center">
                <EmojiPickerModal onEmojiSelect={setSelectedEmoji} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                Choose a Color
              </label>
              <div className="flex justify-center">
                <ColorPickerModal onColorSelect={setSelectedColor} />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:-translate-y-1 active:translate-y-0 px-8 py-4 rounded-full text-lg"
          >
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create New Auction
          </Button>
        </form>
      </div>
    </main>
  )
}