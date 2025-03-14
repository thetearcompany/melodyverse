"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const locations = [
  { value: "all", label: "All Locations" },
  { value: "jamaica", label: "Jamaica" },
  { value: "uk", label: "United Kingdom" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "usa", label: "United States" },
]

export function ConcertFilters() {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showSoldOut, setShowSoldOut] = useState(true)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="justify-between">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filters</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup heading="Location">
              {locations.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setLocation(currentValue === location ? "all" : currentValue)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", location === item.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        <Separator />

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Price Range (BeatCoins)</Label>
              <span className="text-xs text-muted-foreground">
                {priceRange[0]} - {priceRange[1]}
              </span>
            </div>
            <Slider value={priceRange} min={0} max={200} step={10} onValueChange={setPriceRange} className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-sold-out">Show Sold Out Events</Label>
            <Switch id="show-sold-out" checked={showSoldOut} onCheckedChange={setShowSoldOut} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="featured-only">Featured Events Only</Label>
            <Switch id="featured-only" checked={featuredOnly} onCheckedChange={setFeaturedOnly} />
          </div>

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLocation("all")
                setPriceRange([0, 200])
                setShowSoldOut(true)
                setFeaturedOnly(false)
              }}
            >
              Reset
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

