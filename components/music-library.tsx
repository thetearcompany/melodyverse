"use client"

import { useState } from "react"
import { Folder, Music, Plus, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock data for folders and playlists
const mockFolders = [
  {
    id: "1",
    name: "Rock",
    tracks: [
      { id: "101", title: "Rock Track 1", artist: "Artist 1" },
      { id: "102", title: "Rock Track 2", artist: "Artist 2" },
    ],
  },
  {
    id: "2",
    name: "Jazz",
    tracks: [
      { id: "201", title: "Jazz Track 1", artist: "Artist 3" },
      { id: "202", title: "Jazz Track 2", artist: "Artist 4" },
    ],
  },
  {
    id: "3",
    name: "Electronic",
    tracks: [
      { id: "301", title: "Electronic Track 1", artist: "Artist 5" },
      { id: "302", title: "Electronic Track 2", artist: "Artist 6" },
    ],
  },
]

const mockPlaylists = [
  { id: "p1", name: "Favorites", count: 12 },
  { id: "p2", name: "Recently Played", count: 8 },
  { id: "p3", name: "Most Played", count: 15 },
]

export function MusicLibrary() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({})

  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  return (
    <div className="flex h-full flex-col py-2">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>
        <div className="space-y-1">
          <Button variant="secondary" className="w-full justify-start">
            <Music className="mr-2 h-4 w-4" />
            All Music
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Folder
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 py-4">
          <div className="px-3">
            <h3 className="mb-2 text-sm font-medium">Folders</h3>
            <div className="space-y-1">
              {mockFolders.map((folder) => (
                <Collapsible key={folder.id} open={openFolders[folder.id]} onOpenChange={() => toggleFolder(folder.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-start font-normal">
                      {openFolders[folder.id] ? (
                        <ChevronDown className="mr-2 h-4 w-4" />
                      ) : (
                        <ChevronRight className="mr-2 h-4 w-4" />
                      )}
                      <Folder className="mr-2 h-4 w-4 text-[#008B8B]" />
                      {folder.name}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 pt-1">
                    {folder.tracks.map((track) => (
                      <Button key={track.id} variant="ghost" size="sm" className="w-full justify-start font-normal">
                        <Music className="mr-2 h-4 w-4 text-[#C0C0C0]" />
                        {track.title}
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
          <div className="px-3">
            <h3 className="mb-2 text-sm font-medium">Playlists</h3>
            <div className="space-y-1">
              {mockPlaylists.map((playlist) => (
                <Button key={playlist.id} variant="ghost" size="sm" className="w-full justify-start font-normal">
                  <Music className="mr-2 h-4 w-4 text-[#800080]" />
                  {playlist.name}
                  <span className="ml-auto text-xs text-muted-foreground">{playlist.count}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

