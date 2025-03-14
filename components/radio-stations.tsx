"use client"

import { useState } from "react"
import { Radio, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RadioStation {
  id: string
  name: string
  genre: string
  listeners: number
  isLive: boolean
  isFeatured?: boolean
}

const stations: RadioStation[] = [
  {
    id: "1",
    name: "Roots Reggae Radio",
    genre: "Roots Reggae",
    listeners: 312,
    isLive: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Dub Station",
    genre: "Dub",
    listeners: 189,
    isLive: true,
  },
  {
    id: "3",
    name: "Nyabinghi Rhythms",
    genre: "Nyabinghi",
    listeners: 97,
    isLive: false,
  },
  {
    id: "4",
    name: "Zion Gate FM",
    genre: "Gospel Reggae",
    listeners: 256,
    isLive: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Dancehall Vibes",
    genre: "Dancehall",
    listeners: 423,
    isLive: true,
  },
]

export function RadioStations() {
  const [activeStation, setActiveStation] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      {stations.map((station) => (
        <div
          key={station.id}
          className={cn(
            "flex items-center justify-between p-3 rounded-md border transition-colors",
            activeStation === station.id ? "bg-muted border-primary" : "hover:bg-muted/50",
          )}
        >
          <div className="flex items-center space-x-3">
            <Radio className={cn("h-4 w-4", station.isLive ? "text-[#FFD700]" : "text-muted-foreground")} />
            <div>
              <div className="flex items-center">
                <span className="font-medium">{station.name}</span>
                {station.isFeatured && <Badge className="ml-2 bg-[#006400] text-xs">Featured</Badge>}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{station.genre}</span>
                <span className="mx-1">•</span>
                <span>{station.listeners} listeners</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setActiveStation(activeStation === station.id ? null : station.id)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

