"use client"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic,
  Download,
  Heart,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Mock current track data
const currentTrack = {
  id: "track-1",
  title: "Cosmic Harmony",
  artist: "Stellar Beats",
  album: "Galactic Rhythms",
  coverArt: "/placeholder.svg?height=60&width=60",
  duration: 237, // in seconds
  beatCoins: 50,
}

// Mock queue data
const queueTracks = [
  {
    id: "track-2",
    title: "Midnight Serenade",
    artist: "Luna Waves",
    album: "Nocturnal Echoes",
    coverArt: "/placeholder.svg?height=40&width=40",
    duration: 195,
  },
  {
    id: "track-3",
    title: "Electric Dreams",
    artist: "Neon Pulse",
    album: "Synthetic Emotions",
    coverArt: "/placeholder.svg?height=40&width=40",
    duration: 224,
  },
  {
    id: "track-4",
    title: "Ocean Whispers",
    artist: "Aqua Tides",
    album: "Deep Blue",
    coverArt: "/placeholder.svg?height=40&width=40",
    duration: 263,
  },
]

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.coverArt || "/placeholder.svg"}
            alt={currentTrack.title}
            className="h-12 w-12 rounded-md"
          />
          <div>
            <h3 className="text-sm font-medium">{currentTrack.title}</h3>
            <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>
            <div className="mt-1 flex items-center">
              <span className="text-xs text-[#FFD700]">{currentTrack.beatCoins} BeatCoins</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 h-6 w-6 text-[#DC143C]"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={cn("h-4 w-4", isFavorite ? "fill-[#DC143C]" : "")} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-1 h-6 w-6 text-[#4B0082]">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download (50 BeatCoins)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsShuffle(!isShuffle)}
                  >
                    <Shuffle className={cn("h-4 w-4", isShuffle ? "text-[#006400]" : "")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shuffle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-primary"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5 text-primary" /> : <Play className="h-5 w-5 text-primary" />}
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-5 w-5" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsRepeat(!isRepeat)}
                  >
                    <Repeat className={cn("h-4 w-4", isRepeat ? "text-[#006400]" : "")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Repeat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex w-full max-w-md items-center space-x-2">
            <span className="w-12 text-right text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={currentTrack.duration}
              step={1}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="w-full"
            />
            <span className="w-12 text-xs text-muted-foreground">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Volume and Queue */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(value) => {
                setVolume(value[0])
                if (value[0] > 0) setIsMuted(false)
              }}
              className="w-24"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ListMusic className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <h3 className="mb-4 text-lg font-medium">Queue</h3>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Now Playing</h4>
                    <div className="flex items-center space-x-3 rounded-md border p-2">
                      <img
                        src={currentTrack.coverArt || "/placeholder.svg"}
                        alt={currentTrack.title}
                        className="h-10 w-10 rounded-md"
                      />
                      <div>
                        <p className="text-sm font-medium">{currentTrack.title}</p>
                        <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Next Up</h4>
                    <div className="space-y-2">
                      {queueTracks.map((track) => (
                        <div key={track.id} className="flex items-center space-x-3 rounded-md border p-2">
                          <img
                            src={track.coverArt || "/placeholder.svg"}
                            alt={track.title}
                            className="h-10 w-10 rounded-md"
                          />
                          <div>
                            <p className="text-sm font-medium">{track.title}</p>
                            <p className="text-xs text-muted-foreground">{track.artist}</p>
                          </div>
                          <span className="ml-auto text-xs text-muted-foreground">{formatTime(track.duration)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

