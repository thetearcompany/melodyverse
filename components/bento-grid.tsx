"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, Heart, Info, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Album {
  id: string
  title: string
  artist: string
  year: string
  coverArt: string
  description: string
  beatCoins: number
  featured?: boolean
  className?: string
  size?: "small" | "medium" | "large"
  colors: {
    from: string
    to: string
  }
}

const albums: Album[] = [
  {
    id: "1",
    title: "Exodus",
    artist: "Bob Marley & The Wailers",
    year: "1977",
    coverArt: "/placeholder.svg?height=400&width=400",
    description:
      "Named by Time Magazine as the best album of the 20th century, Exodus is a masterpiece that includes classics like 'Jamming', 'One Love', and 'Three Little Birds'.",
    beatCoins: 120,
    featured: true,
    size: "large",
    colors: {
      from: "#FFD700",
      to: "#DC143C",
    },
  },
  {
    id: "2",
    title: "Equal Rights",
    artist: "Peter Tosh",
    year: "1977",
    coverArt: "/placeholder.svg?height=300&width=300",
    description:
      "A powerful political statement and one of the most important reggae albums ever made, featuring 'Get Up, Stand Up' and 'Downpressor Man'.",
    beatCoins: 100,
    size: "medium",
    colors: {
      from: "#008B8B",
      to: "#000080",
    },
  },
  {
    id: "3",
    title: "Marcus Garvey",
    artist: "Burning Spear",
    year: "1975",
    coverArt: "/placeholder.svg?height=300&width=300",
    description:
      "A roots reggae classic that pays tribute to Marcus Garvey with powerful messages of black empowerment and Rastafarian spirituality.",
    beatCoins: 90,
    size: "small",
    colors: {
      from: "#800080",
      to: "#4B0082",
    },
  },
  {
    id: "4",
    title: "Blackheart Man",
    artist: "Bunny Wailer",
    year: "1976",
    coverArt: "/placeholder.svg?height=300&width=300",
    description:
      "The debut solo album from the founding member of The Wailers, exploring Rastafarian themes with songs like 'Dreamland' and 'Fighting Against Conviction'.",
    beatCoins: 85,
    size: "medium",
    colors: {
      from: "#006400",
      to: "#008B8B",
    },
  },
  {
    id: "5",
    title: "Two Sevens Clash",
    artist: "Culture",
    year: "1977",
    coverArt: "/placeholder.svg?height=300&width=300",
    description:
      "A landmark roots reggae album based on a prophecy that apocalyptic events would occur when the year '77 met the day '7' (July 7, 1977).",
    beatCoins: 80,
    size: "small",
    colors: {
      from: "#FF0000",
      to: "#800080",
    },
  },
  {
    id: "6",
    title: "Heart of the Congos",
    artist: "The Congos",
    year: "1977",
    coverArt: "/placeholder.svg?height=300&width=300",
    description:
      "Produced by Lee 'Scratch' Perry, this album is considered one of the most important reggae albums of all time with its unique vocal harmonies.",
    beatCoins: 95,
    size: "medium",
    colors: {
      from: "#FFD700",
      to: "#006400",
    },
  },
  {
    id: "7",
    title: "Catch a Fire",
    artist: "Bob Marley & The Wailers",
    year: "1973",
    coverArt: "/placeholder.svg?height=300&width=300",
    description:
      "The album that introduced Bob Marley to an international audience, featuring classics like 'Stir It Up' and 'Concrete Jungle'.",
    beatCoins: 110,
    size: "small",
    colors: {
      from: "#DC143C",
      to: "#000080",
    },
  },
]

export function BentoGrid() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
      {albums.map((album) => (
        <BentoCard
          key={album.id}
          album={album}
          isFavorite={!!favorites[album.id]}
          onToggleFavorite={() => toggleFavorite(album.id)}
          className={cn(
            album.size === "large" && "md:col-span-2 md:row-span-2",
            album.size === "medium" && "md:col-span-1 md:row-span-2",
          )}
        />
      ))}
    </div>
  )
}

interface BentoCardProps {
  album: Album
  isFavorite: boolean
  onToggleFavorite: () => void
  className?: string
}

function BentoCard({ album, isFavorite, onToggleFavorite, className }: BentoCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border bg-background p-2", className)}>
      <div
        className="absolute inset-0 z-0 opacity-50 transition-opacity group-hover:opacity-75"
        style={{
          background: `linear-gradient(45deg, ${album.colors.from}, ${album.colors.to})`,
        }}
      />

      <div className="relative z-10 h-full p-4 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {album.year}
            </Badge>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground drop-shadow-sm">{album.title}</h3>
            <p className="text-sm text-foreground/80 drop-shadow-sm">{album.artist}</p>
          </div>

          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      onToggleFavorite()
                    }}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      className={cn("h-4 w-4", isFavorite ? "fill-[#DC143C] text-[#DC143C]" : "text-foreground")}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                  aria-label="More information"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {album.title} ({album.year})
                  </DialogTitle>
                  <DialogDescription>by {album.artist}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={album.coverArt || "/placeholder.svg"}
                      alt={album.title}
                      width={150}
                      height={150}
                      className="rounded-md object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">{album.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#FFD700]">{album.beatCoins} BeatCoins</span>
                      <Button size="sm" asChild>
                        <Link href={`/album/${album.id}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Album
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-[#FFD700]">{album.beatCoins} BeatCoins</span>
          <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href={`/album/${album.id}`}>
              <Play className="mr-2 h-4 w-4" />
              Play
            </Link>
          </Button>
        </div>

        {album.featured && <Badge className="absolute top-4 right-4 bg-[#DC143C]">Featured</Badge>}
      </div>
    </div>
  )
}

