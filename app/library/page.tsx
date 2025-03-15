import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MusicPlayer } from "@/components/music-player"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MusicLibrary } from "@/components/music-library"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Music, Download, Clock, Heart } from "lucide-react"

// Mock data for tracks
const tracks = [
  {
    id: "1",
    title: "Cosmic Harmony",
    artist: "Stellar Beats",
    album: "Galactic Rhythms",
    duration: "3:57",
    beatCoins: 50,
    favorite: true,
  },
  {
    id: "2",
    title: "Midnight Serenade",
    artist: "Luna Waves",
    album: "Nocturnal Echoes",
    duration: "3:15",
    beatCoins: 45,
    favorite: false,
  },
  {
    id: "3",
    title: "Electric Dreams",
    artist: "Neon Pulse",
    album: "Synthetic Emotions",
    duration: "3:44",
    beatCoins: 55,
    favorite: true,
  },
  {
    id: "4",
    title: "Ocean Whispers",
    artist: "Aqua Tides",
    album: "Deep Blue",
    duration: "4:23",
    beatCoins: 60,
    favorite: false,
  },
  {
    id: "5",
    title: "Mountain Echo",
    artist: "Alpine Sound",
    album: "Heights",
    duration: "3:38",
    beatCoins: 40,
    favorite: false,
  },
  {
    id: "6",
    title: "Desert Mirage",
    artist: "Sand Dunes",
    album: "Oasis",
    duration: "4:12",
    beatCoins: 50,
    favorite: true,
  },
]

export default function LibraryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container">
          <MusicLibrary />
          <div className="flex flex-col gap-4 py-6">
            <h1 className="text-3xl font-bold tracking-tight">Your Library</h1>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Music</TabsTrigger>
                <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="relative w-full">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="sticky top-0 bg-background [&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50">
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[40px]">#</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Title</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Artist</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Album</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[100px]">
                              <Clock className="h-4 w-4" />
                            </th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[100px]">
                              BeatCoins
                            </th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[80px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {tracks.map((track, index) => (
                            <tr key={track.id} className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">{index + 1}</td>
                              <td className="p-4 align-middle font-medium">
                                <div className="flex items-center">
                                  <Music className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {track.title}
                                </div>
                              </td>
                              <td className="p-4 align-middle">{track.artist}</td>
                              <td className="p-4 align-middle">{track.album}</td>
                              <td className="p-4 align-middle text-muted-foreground">{track.duration}</td>
                              <td className="p-4 align-middle">
                                <span className="font-medium text-[#FFD700]">{track.beatCoins}</span>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Heart
                                      className={`h-4 w-4 ${track.favorite ? "fill-[#DC143C] text-[#DC143C]" : ""}`}
                                    />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
              <TabsContent value="downloaded" className="mt-4">
                <div className="rounded-md border p-8 text-center">
                  <h3 className="text-lg font-medium">No downloaded tracks yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use your BeatCoins to download tracks for offline listening
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="favorites" className="mt-4">
                <div className="rounded-md border">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="relative w-full">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="sticky top-0 bg-background [&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50">
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[40px]">#</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Title</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Artist</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Album</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[100px]">
                              <Clock className="h-4 w-4" />
                            </th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[100px]">
                              BeatCoins
                            </th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[80px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {tracks
                            .filter((track) => track.favorite)
                            .map((track, index) => (
                              <tr key={track.id} className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle">{index + 1}</td>
                                <td className="p-4 align-middle font-medium">
                                  <div className="flex items-center">
                                    <Music className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {track.title}
                                  </div>
                                </td>
                                <td className="p-4 align-middle">{track.artist}</td>
                                <td className="p-4 align-middle">{track.album}</td>
                                <td className="p-4 align-middle text-muted-foreground">{track.duration}</td>
                                <td className="p-4 align-middle">
                                  <span className="font-medium text-[#FFD700]">{track.beatCoins}</span>
                                </td>
                                <td className="p-4 align-middle">
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Heart className="h-4 w-4 fill-[#DC143C] text-[#DC143C]" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <MusicPlayer />
    </div>
  )
}

