"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "./date-range-picker"
import EventList from "./event-list"
import EventMap from "./event-map"

export default function EventSearch() {
  const [view, setView] = useState<"list" | "map">("list")
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Label htmlFor="location" className="sr-only">
            Location
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="location" placeholder="Enter location" className="pl-8" />
          </div>
        </div>
        <DatePickerWithRange className="w-full md:w-auto" />
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="arts">Arts & Theater</SelectItem>
            <SelectItem value="food">Food & Drink</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="price-range">Price Range</Label>
          <Slider
            id="price-range"
            min={0}
            max={200}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
            List
          </Button>
          <Button variant={view === "map" ? "default" : "outline"} size="sm" onClick={() => setView("map")}>
            Map
          </Button>
        </div>
      </div>

      {view === "list" ? <EventList /> : <EventMap />}
    </div>
  )
}

