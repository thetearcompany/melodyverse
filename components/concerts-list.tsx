"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, Ticket, Heart, Share, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for concerts
const concerts = [
  {
    id: "1",
    title: "Roots & Culture Festival",
    artist: "Bob Marley Tribute Band",
    date: "2025-04-20",
    time: "18:00",
    location: "Kingston, Jamaica",
    venue: "Tuff Gong Stadium",
    description:
      "A tribute to the legendary Bob Marley featuring some of the best reggae artists performing his timeless classics.",
    price: 120,
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
    soldOut: false,
    coordinates: { lat: 18.0179, lng: -76.8099 },
  },
  {
    id: "2",
    title: "Reggae Sumfest",
    artist: "Various Artists",
    date: "2025-05-15",
    time: "16:00",
    location: "Montego Bay, Jamaica",
    venue: "Catherine Hall Entertainment Complex",
    description:
      "The biggest reggae festival in Jamaica featuring both established and upcoming artists from around the world.",
    price: 150,
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
    soldOut: false,
    coordinates: { lat: 18.4762, lng: -77.9209 },
  },
  {
    id: "3",
    title: "Nyabinghi Drumming Circle",
    artist: "Rastafari Elders",
    date: "2025-06-10",
    time: "20:00",
    location: "Nine Mile, Jamaica",
    venue: "Bob Marley Mausoleum",
    description:
      "Experience the spiritual power of traditional Nyabinghi drumming with Rastafari elders in Bob Marley's birthplace.",
    price: 80,
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    soldOut: false,
    coordinates: { lat: 18.3625, lng: -77.3764 },
  },
  {
    id: "4",
    title: "Dub & Bass Night",
    artist: "King Tubby Sound System",
    date: "2025-06-25",
    time: "22:00",
    location: "London, UK",
    venue: "Brixton Academy",
    description:
      "A night of heavy dub and bass music featuring the legendary King Tubby Sound System and special guests.",
    price: 90,
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    soldOut: true,
    coordinates: { lat: 51.4652, lng: -0.1151 },
  },
  {
    id: "5",
    title: "One Love Peace Concert",
    artist: "Various Artists",
    date: "2025-07-04",
    time: "17:00",
    location: "Kingston, Jamaica",
    venue: "National Stadium",
    description:
      "A revival of the historic 1978 concert, bringing together artists to promote peace and unity through music.",
    price: 110,
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
    soldOut: false,
    coordinates: { lat: 18.0179, lng: -76.8099 },
  },
  {
    id: "6",
    title: "Rasta Gathering",
    artist: "Burning Spear & Friends",
    date: "2025-08-17",
    time: "19:00",
    location: "Shashamane, Ethiopia",
    venue: "Shashamane Community Center",
    description:
      "A spiritual gathering in the Rastafarian community in Ethiopia, featuring legendary artist Burning Spear.",
    price: 100,
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    soldOut: false,
    coordinates: { lat: 7.2006, lng: 38.599 },
  },
]

export function ConcertsList() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {concerts.map((concert) => (
        <div key={concert.id} className="rounded-lg border overflow-hidden bg-card">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
            <div className="relative">
              <Image
                src={concert.image || "/placeholder.svg"}
                alt={concert.title}
                width={400}
                height={300}
                className="object-cover h-full w-full"
              />
              {concert.featured && <Badge className="absolute top-4 left-4 bg-[#FFD700] text-black">Featured</Badge>}
              {concert.soldOut && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge className="bg-[#DC143C] text-white text-lg px-4 py-2 transform rotate-[-15deg]">
                    SOLD OUT
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{concert.title}</h2>
                  <p className="text-lg text-muted-foreground mb-4">{concert.artist}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-[#FFD700]" />
                      <span>{formatDate(concert.date)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-[#FFD700]" />
                      <span>{concert.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-[#FFD700]" />
                      <span>
                        {concert.venue}, {concert.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{concert.description}</p>
                </div>

                <div className="flex flex-col items-end space-y-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="text-2xl font-bold text-[#FFD700]">{concert.price} BeatCoins</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => toggleFavorite(concert.id)}
                    >
                      <Heart className={cn("h-5 w-5", favorites[concert.id] ? "fill-[#DC143C] text-[#DC143C]" : "")} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Share className="h-5 w-5" />
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <MapPin className="mr-2 h-4 w-4" />
                          View Map
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{concert.title}</DialogTitle>
                          <DialogDescription>
                            {concert.venue}, {concert.location}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                            <MapPin className="h-8 w-8 text-[#FFD700]" />
                            <span className="ml-2">Map view would appear here</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm">
                            <div className="font-medium">{formatDate(concert.date)}</div>
                            <div className="text-muted-foreground">{concert.time}</div>
                          </div>
                          <Button size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Directions
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Button className="rounded-full bg-[#006400] hover:bg-[#006400]/90" disabled={concert.soldOut}>
                    <Ticket className="mr-2 h-4 w-4" />
                    {concert.soldOut ? "Sold Out" : "Buy Tickets"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

