"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for concert locations
const concertLocations = [
  {
    id: "1",
    title: "Roots & Culture Festival",
    artist: "Bob Marley Tribute Band",
    date: "2025-04-20",
    location: "Kingston, Jamaica",
    venue: "Tuff Gong Stadium",
    price: 120,
    featured: true,
    soldOut: false,
    coordinates: { x: 30, y: 45 }, // Simplified coordinates for the mock map
  },
  {
    id: "2",
    title: "Reggae Sumfest",
    artist: "Various Artists",
    date: "2025-05-15",
    location: "Montego Bay, Jamaica",
    venue: "Catherine Hall Entertainment Complex",
    price: 150,
    featured: true,
    soldOut: false,
    coordinates: { x: 25, y: 42 },
  },
  {
    id: "3",
    title: "Nyabinghi Drumming Circle",
    artist: "Rastafari Elders",
    date: "2025-06-10",
    location: "Nine Mile, Jamaica",
    venue: "Bob Marley Mausoleum",
    price: 80,
    featured: false,
    soldOut: false,
    coordinates: { x: 28, y: 40 },
  },
  {
    id: "4",
    title: "Dub & Bass Night",
    artist: "King Tubby Sound System",
    date: "2025-06-25",
    location: "London, UK",
    venue: "Brixton Academy",
    price: 90,
    featured: false,
    soldOut: true,
    coordinates: { x: 60, y: 20 },
  },
  {
    id: "5",
    title: "One Love Peace Concert",
    artist: "Various Artists",
    date: "2025-07-04",
    location: "Kingston, Jamaica",
    venue: "National Stadium",
    price: 110,
    featured: true,
    soldOut: false,
    coordinates: { x: 31, y: 46 },
  },
  {
    id: "6",
    title: "Rasta Gathering",
    artist: "Burning Spear & Friends",
    date: "2025-08-17",
    location: "Shashamane, Ethiopia",
    venue: "Shashamane Community Center",
    price: 100,
    featured: false,
    soldOut: false,
    coordinates: { x: 70, y: 50 },
  },
]

export function ConcertMap() {
  const [selectedConcert, setSelectedConcert] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="relative w-full h-[600px] bg-muted">
        {/* This is a simplified map visualization */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-50"></div>

        {/* Map overlay with grid lines */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 10 }).map((_, rowIndex) =>
            Array.from({ length: 10 }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="border border-muted-foreground/10" />
            )),
          )}
        </div>

        {/* Concert location pins */}
        {concertLocations.map((concert) => (
          <TooltipProvider key={concert.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute p-0 h-auto w-auto"
                  style={{
                    left: `${concert.coordinates.x}%`,
                    top: `${concert.coordinates.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedConcert(selectedConcert === concert.id ? null : concert.id)}
                >
                  <div className="flex flex-col items-center">
                    <MapPin
                      className={`h-8 w-8 ${
                        selectedConcert === concert.id
                          ? "text-[#DC143C]"
                          : concert.featured
                            ? "text-[#FFD700]"
                            : "text-[#006400]"
                      } ${concert.soldOut ? "opacity-50" : "opacity-100"}`}
                      fill={selectedConcert === concert.id ? "#DC143C" : "transparent"}
                    />
                    {selectedConcert === concert.id && (
                      <div className="mt-1 px-2 py-1 bg-background border rounded-md shadow-lg text-xs whitespace-nowrap">
                        {concert.title}
                      </div>
                    )}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <div className="text-xs">
                  <div className="font-bold">{concert.title}</div>
                  <div>{concert.venue}</div>
                  <div>{formatDate(concert.date)}</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {/* Selected concert info panel */}
        {selectedConcert && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-background/95 backdrop-blur-sm rounded-lg border p-4 shadow-lg">
            {(() => {
              const concert = concertLocations.find((c) => c.id === selectedConcert)
              if (!concert) return null

              return (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{concert.title}</h3>
                    {concert.soldOut ? (
                      <Badge variant="outline" className="bg-[#DC143C]/10 text-[#DC143C] border-[#DC143C]/20">
                        Sold Out
                      </Badge>
                    ) : (
                      concert.featured && <Badge className="bg-[#FFD700] text-black">Featured</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{concert.artist}</p>
                  <div className="text-xs space-y-1 mb-3">
                    <div className="flex items-center">
                      <span className="font-medium w-16">Date:</span>
                      <span>{formatDate(concert.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-16">Venue:</span>
                      <span>{concert.venue}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-16">Location:</span>
                      <span>{concert.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-16">Price:</span>
                      <span className="text-[#FFD700] font-medium">{concert.price} BeatCoins</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      className="rounded-full bg-[#006400] hover:bg-[#006400]/90"
                      disabled={concert.soldOut}
                    >
                      {concert.soldOut ? "Sold Out" : "Buy Tickets"}
                    </Button>
                  </div>
                </>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

