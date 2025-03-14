"use client"

import * as React from "react"
import { SkipBack, Play, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Track {
  album: string
  title: string
  duration: string
}

const tracks: Track[] = [
  {
    album: "Zatunes.co.za",
    title: "Euphoria Mix via Zatunes.co.za",
    duration: "2:32:26",
  },
  {
    album: "?",
    title: "Amapiano FM",
    duration: "?",
  },
]

const playlists = ["Przyjdź mój Jezu", "2", "__RADIA__", "Mama' Gun", "Afrika Speaks", "Love Supreme"]

export function FoobarPlayer() {
  const [volume, setVolume] = React.useState(75)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = React.useState("__RADIA__")

  return (
    <div className="flex h-screen flex-col bg-zinc-900 text-zinc-100">
      <div className="flex h-10 items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4">
        <div className="text-lg font-medium text-zinc-100">foobar2000</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-zinc-400">Output Device</span>
            <Select defaultValue="default">
              <SelectTrigger className="h-7 w-32 border-zinc-700 bg-zinc-800 text-zinc-100">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-zinc-100">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="speakers">Speakers</SelectItem>
                <SelectItem value="headphones">Headphones</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-zinc-400">Playback Order</span>
            <Select defaultValue="default">
              <SelectTrigger className="h-7 w-32 border-zinc-700 bg-zinc-800 text-zinc-100">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-zinc-100">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="repeat">Repeat</SelectItem>
                <SelectItem value="shuffle">Shuffle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-64 border-r border-zinc-700 bg-zinc-800">
          <div className="p-4">
            <h2 className="mb-4 text-sm font-medium text-zinc-400">Playlists</h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {playlists.map((playlist, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start text-sm font-normal ${
                    selectedPlaylist === playlist ? "bg-zinc-700 text-[#FFD700]" : "text-zinc-100 hover:bg-zinc-700"
                  }`}
                  onClick={() => setSelectedPlaylist(playlist)}
                >
                  {playlist}
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>

        <div className="flex-1 bg-zinc-900">
          <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 border-b border-zinc-700 bg-zinc-800 p-2 text-sm font-medium text-zinc-400">
            <div>Album</div>
            <div>Title</div>
            <div className="text-right">Duration</div>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr,2fr,1fr] gap-4 border-b border-zinc-700 p-2 text-sm hover:bg-zinc-800"
              >
                <div className="text-[#008B8B]">{track.album}</div>
                <div className="text-[#C0C0C0]">{track.title}</div>
                <div className="text-right text-[#800080]">{track.duration}</div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      <div className="flex h-20 items-center justify-between border-t border-zinc-700 bg-zinc-800 px-4">
        <div className="text-sm text-zinc-400">Not playing</div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-zinc-100 hover:bg-zinc-700 hover:text-[#FFD700]">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-100 hover:bg-zinc-700 hover:text-[#FFD700]"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-100 hover:bg-zinc-700 hover:text-[#FFD700]">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex w-48 items-center space-x-2">
          <Volume2 className="h-4 w-4 text-zinc-400" />
          <Slider value={[volume]} max={100} step={1} className="w-32" onValueChange={(value) => setVolume(value[0])} />
          <span className="text-xs text-zinc-400">volume</span>
        </div>
      </div>
    </div>
  )
}

