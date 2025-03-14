import Image from "next/image"
import Link from "next/link"
import { Play, Heart, Share, Download, Clock, ArrowLeft, Disc, Calendar, Music } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlbumTracks } from "@/components/album-tracks"
import { RelatedAlbums } from "@/components/related-albums"

// This would typically come from a database
const getAlbum = (id: string) => {
  // For demo purposes, return mock data
  return {
    id: "1",
    title: "Exodus",
    artist: "Bob Marley & The Wailers",
    year: "1977",
    coverArt: "/placeholder.svg?height=500&width=500",
    description:
      "Named by Time Magazine as the best album of the 20th century, Exodus is a masterpiece that includes classics like 'Jamming', 'One Love', and 'Three Little Birds'. This album was created during Bob Marley's exile in London after an assassination attempt in Jamaica. The themes of exile, spiritual journey, and redemption run throughout the album.",
    beatCoins: 120,
    featured: true,
    label: "Island Records",
    producer: "Bob Marley & The Wailers",
    duration: "37:24",
    tracks: [
      { id: "t1", title: "Natural Mystic", duration: "3:28", beatCoins: 20, favorite: false },
      { id: "t2", title: "So Much Things to Say", duration: "3:08", beatCoins: 20, favorite: true },
      { id: "t3", title: "Guiltiness", duration: "3:13", beatCoins: 15, favorite: false },
      { id: "t4", title: "The Heathen", duration: "2:32", beatCoins: 15, favorite: false },
      { id: "t5", title: "Exodus", duration: "7:40", beatCoins: 25, favorite: true },
      { id: "t6", title: "Jamming", duration: "3:31", beatCoins: 20, favorite: false },
      { id: "t7", title: "Waiting in Vain", duration: "4:16", beatCoins: 20, favorite: false },
      { id: "t8", title: "Turn Your Lights Down Low", duration: "3:39", beatCoins: 15, favorite: false },
      { id: "t9", title: "Three Little Birds", duration: "3:00", beatCoins: 25, favorite: true },
      { id: "t10", title: "One Love / People Get Ready", duration: "2:52", beatCoins: 25, favorite: false },
    ],
    colors: {
      from: "#FFD700",
      to: "#DC143C",
    },
  }
}

export default function AlbumPage({ params }: { params: { id: string } }) {
  const album = getAlbum(params.id)

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
        {/* Album Header with Cover Art */}
        <div
          className="w-full py-12 relative overflow-hidden"
          style={{
            background: `linear-gradient(45deg, ${album.colors.from}, ${album.colors.to})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />

          <div className="container relative z-10">
            <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0 relative">
                <Image
                  src={album.coverArt || "/placeholder.svg"}
                  width={300}
                  height={300}
                  alt={album.title}
                  className="rounded-lg shadow-xl"
                />
                {album.featured && <Badge className="absolute top-4 right-4 bg-[#DC143C]">Featured</Badge>}
              </div>

              <div className="flex flex-col text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{album.title}</h1>
                <h2 className="text-2xl md:text-3xl font-medium mb-4">{album.artist}</h2>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-white/70" />
                    <span>{album.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Disc className="mr-2 h-4 w-4 text-white/70" />
                    <span>{album.label}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-white/70" />
                    <span>{album.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="mr-2 h-4 w-4 text-white/70" />
                    <span>{album.tracks.length} tracks</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Button size="lg" className="rounded-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                    <Play className="mr-2 h-5 w-5" />
                    Play Album
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Add to Favorites
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20"
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                </div>

                <div className="max-w-2xl">
                  <p className="text-lg text-white/80 leading-relaxed">{album.description}</p>
                </div>

                <div className="mt-6 flex items-center">
                  <span className="text-xl font-bold text-[#FFD700]">{album.beatCoins} BeatCoins</span>
                  <Button
                    variant="outline"
                    className="ml-4 rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Album
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Album Content */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Tracks</h3>
              <AlbumTracks tracks={album.tracks} />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Album Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Artist</span>
                    <span>{album.artist}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Released</span>
                    <span>{album.year}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Label</span>
                    <span>{album.label}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Producer</span>
                    <span>{album.producer}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{album.duration}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Related Albums</h3>
                <RelatedAlbums currentAlbumId={album.id} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  )
}

