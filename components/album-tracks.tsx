"use client"

import { useState } from "react"
import { Play, Pause, Heart, Download, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Track {
  id: string
  title: string
  duration: string
  beatCoins: number
  favorite: boolean
}

interface AlbumTracksProps {
  tracks: Track[]
}

export function AlbumTracks({ tracks }: AlbumTracksProps) {
  const [playing, setPlaying] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    tracks.reduce((acc, track) => ({ ...acc, [track.id]: track.favorite }), {}),
  )

  const togglePlay = (id: string) => {
    setPlaying(playing === id ? null : id)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-muted/50 [&_tr]:border-b">
            <tr className="border-b transition-colors">
              <th className="h-12 w-12 px-4"></th>
              <th className="h-12 w-[50px] px-4 text-left font-medium text-muted-foreground">#</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Title</th>
              <th className="h-12 w-[100px] px-4 text-left font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
              </th>
              <th className="h-12 w-[100px] px-4 text-left font-medium text-muted-foreground">BeatCoins</th>
              <th className="h-12 w-[100px] px-4 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {tracks.map((track, index) => (
              <tr
                key={track.id}
                className={cn("border-b transition-colors hover:bg-muted/50", playing === track.id && "bg-muted/60")}
              >
                <td className="p-4 align-middle text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => togglePlay(track.id)}
                  >
                    {playing === track.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </td>
                <td className="p-4 align-middle font-medium">{index + 1}</td>
                <td className="p-4 align-middle font-medium">{track.title}</td>
                <td className="p-4 align-middle text-muted-foreground">{track.duration}</td>
                <td className="p-4 align-middle">
                  <span className="font-medium text-[#FFD700]">{track.beatCoins}</span>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => toggleFavorite(track.id)}
                    >
                      <Heart className={cn("h-4 w-4", favorites[track.id] ? "fill-[#DC143C] text-[#DC143C]" : "")} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                        <DropdownMenuItem>Share Track</DropdownMenuItem>
                        <DropdownMenuItem>View Artist</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

