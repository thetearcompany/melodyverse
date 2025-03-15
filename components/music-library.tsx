"use client"

import { useState } from "react"
import { 
  Music, 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  X, 
  Star,
  Clock,
  Flame,
  Radio,
  Heart,
  ListMusic,
  Tags,
  Folder,
  Info,
  Calendar,
  Building2,
  User,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useMusicStore } from "@/store/use-music-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface TrackForm {
  title: string
  duration: number
  fileUrl: string
}

interface AlbumForm {
  title: string
  artist: string
  year: string
  coverArt: string
  description: string
  label: string
  producer: string
  price: number
  beatCoins: number
  tracks: TrackForm[]
}

const initialAlbumForm: AlbumForm = {
  title: "",
  artist: "",
  year: new Date().getFullYear().toString(),
  coverArt: "",
  description: "",
  label: "",
  producer: "",
  price: 0,
  beatCoins: 0,
  tracks: []
}

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
  const [albumForm, setAlbumForm] = useState<AlbumForm>(initialAlbumForm)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { library, playTrack, createAlbum, addTrackToAlbum } = useMusicStore()

  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleAddTrack = () => {
    setAlbumForm((prev) => ({
      ...prev,
      tracks: [...prev.tracks, { title: "", duration: 0, fileUrl: "" }]
    }))
  }

  const handleRemoveTrack = (index: number) => {
    setAlbumForm((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((_, i) => i !== index)
    }))
  }

  const handleTrackChange = (index: number, field: keyof TrackForm, value: string) => {
    setAlbumForm((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track, i) => {
        if (i === index) {
          return { ...track, [field]: field === 'duration' ? parseInt(value) || 0 : value }
        }
        return track
      })
    }))
  }

  const handleCreateAlbum = () => {
    const newAlbum = {
      title: albumForm.title,
      artist: albumForm.artist,
      year: albumForm.year,
      coverArt: albumForm.coverArt,
      description: albumForm.description,
      beatCoins: albumForm.beatCoins,
      price: albumForm.price,
      featured: false,
      label: albumForm.label,
      producer: albumForm.producer,
      duration: "0:00",
      tracks: []
    }

    const albumId = createAlbum(newAlbum)
    if (albumId) {
      albumForm.tracks.forEach(track => {
        addTrackToAlbum(albumId, {
          title: track.title,
          artist: albumForm.artist,
          duration: track.duration,
          fileUrl: track.fileUrl,
          beatCoins: 0,
          playCount: 0
        })
      })

      setAlbumForm(initialAlbumForm)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="flex h-full flex-col py-2">
      <div className="container py-6">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              MelodyVerse
            </h2>
            <p className="text-lg text-muted-foreground">
              Odkryj świat muzyki
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Dodaj Album
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nowy Album</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Nazwa Albumu</Label>
                    <Input
                      id="title"
                      value={albumForm.title}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist">Artysta</Label>
                    <Input
                      id="artist"
                      value={albumForm.artist}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, artist: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Rok</Label>
                    <Input
                      id="year"
                      value={albumForm.year}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, year: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Cena (PLN)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={albumForm.price}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beatCoins">BeatCoins</Label>
                    <Input
                      id="beatCoins"
                      type="number"
                      min="0"
                      value={albumForm.beatCoins}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, beatCoins: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="label">Wytwórnia</Label>
                    <Input
                      id="label"
                      value={albumForm.label}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, label: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="producer">Producent</Label>
                    <Input
                      id="producer"
                      value={albumForm.producer}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, producer: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverArt">Okładka</Label>
                  <div className="flex gap-4">
                    <Input
                      id="coverArt"
                      value={albumForm.coverArt}
                      onChange={(e) => setAlbumForm((prev) => ({ ...prev, coverArt: e.target.value }))}
                      placeholder="URL okładki"
                    />
                    {albumForm.coverArt && (
                      <img src={albumForm.coverArt} alt="Podgląd" className="h-20 w-20 rounded object-cover" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                    id="description"
                    value={albumForm.description}
                    onChange={(e) => setAlbumForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Utwory</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddTrack}>
                      <Plus className="mr-2 h-4 w-4" />
                      Dodaj Utwór
                    </Button>
                  </div>
                  
                  {albumForm.tracks.map((track, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`track-${index}-title`}>Tytuł</Label>
                            <Input
                              id={`track-${index}-title`}
                              value={track.title}
                              onChange={(e) => handleTrackChange(index, 'title', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`track-${index}-duration`}>Długość (sekundy)</Label>
                            <Input
                              id={`track-${index}-duration`}
                              type="number"
                              value={track.duration}
                              onChange={(e) => handleTrackChange(index, 'duration', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`track-${index}-file`}>Plik</Label>
                          <Input
                            id={`track-${index}-file`}
                            value={track.fileUrl}
                            onChange={(e) => handleTrackChange(index, 'fileUrl', e.target.value)}
                            placeholder="URL pliku audio"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTrack(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={handleCreateAlbum}
                  disabled={!albumForm.title || !albumForm.artist || albumForm.tracks.length === 0}
                >
                  Utwórz Album
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Biblioteka - 4/12 */}
          <div className="col-span-4 border-r pr-6">
            <div className="space-y-8 sticky top-4">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Gatunki</h3>
                <div className="flex flex-col gap-3">
                  <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                    <Music className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Hip-Hop
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                    <Music className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Amapiano
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                    <Music className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Reggae
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Twoja Biblioteka</h3>
                <div className="flex flex-col gap-3">
                  <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                    <Heart className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Ulubione
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                    <Clock className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Ostatnio odtwarzane
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                    <Flame className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Najczęściej odtwarzane
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                    <ListMusic className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Playlisty
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Zawartość - 8/12 */}
          <div className="col-span-8">
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">Polecane Albumy</h3>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <Star className="mr-2 h-4 w-4" />
                      Zobacz więcej
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {library.albums
                      .filter(album => album.featured)
                      .map((album) => (
                        <HoverCard key={album.id} openDelay={200}>
                          <HoverCardTrigger asChild>
                            <div className="group relative overflow-hidden rounded-lg border bg-card hover:bg-accent/50 hover:border-primary transition-all duration-300 cursor-pointer">
                              <div className="p-6">
                                <div className="flex gap-6">
                                  <img
                                    src={album.coverArt}
                                    alt={album.title}
                                    className="h-36 w-36 rounded-md object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                                  />
                                  <div className="flex flex-col justify-between flex-1">
                                    <div>
                                      <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">{album.title}</h4>
                                      <p className="text-base text-muted-foreground">{album.artist}</p>
                                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{album.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <span className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {album.duration}
                                      </span>
                                      <span className="flex items-center gap-2">
                                        <ListMusic className="h-4 w-4" />
                                        {album.tracks.length} utworów
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Collapsible>
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-between rounded-none border-t bg-accent/50"
                                  >
                                    Lista utworów
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="space-y-1 p-2 bg-card/50 backdrop-blur-sm">
                                  {album.tracks.map((track) => (
                                    <Button
                                      key={track.id}
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-between font-normal hover:bg-accent"
                                      onClick={() => playTrack(track)}
                                    >
                                      <span className="flex items-center">
                                        <Music className="mr-2 h-4 w-4 text-muted-foreground" />
                                        {track.title}
                                      </span>
                                      <span className="flex items-center text-sm text-muted-foreground">
                                        {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                                      </span>
                                    </Button>
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent side="right" align="start" className="w-[500px] p-0">
                            <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
                              <img
                                src={album.coverArt}
                                alt={album.title}
                                className="absolute inset-0 object-cover w-full blur-sm brightness-50"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                  src={album.coverArt}
                                  alt={album.title}
                                  className="h-36 w-36 rounded-md object-cover shadow-2xl"
                                />
                              </div>
                            </div>
                            <div className="p-6 space-y-6">
                              <div>
                                <h3 className="text-2xl font-bold">{album.title}</h3>
                                <p className="text-lg text-muted-foreground">{album.artist}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>Rok wydania: {album.year}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Building2 className="h-4 w-4 text-primary" />
                                    <span>Wytwórnia: {album.label}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <User className="h-4 w-4 text-primary" />
                                    <span>Producent: {album.producer}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>Czas trwania: {album.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <ListMusic className="h-4 w-4 text-primary" />
                                    <span>{album.tracks.length} utworów</span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium flex items-center gap-2">
                                  <Info className="h-4 w-4 text-primary" />
                                  O albumie
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{album.description}</p>
                              </div>

                              <Button className="w-full" onClick={() => playTrack(album.tracks[0])}>
                                <Play className="mr-2 h-4 w-4" />
                                Odtwórz album
                              </Button>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">Wszystkie Albumy</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Clock className="mr-2 h-4 w-4" />
                        Najnowsze
                      </Button>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Flame className="mr-2 h-4 w-4" />
                        Popularne
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {library.albums.map((album) => (
                      <div key={album.id} className="group relative overflow-hidden rounded-lg border bg-card hover:bg-accent/50 hover:border-primary transition-all duration-300">
                        <div className="flex gap-6">
                          <img
                            src={album.coverArt}
                            alt={album.title}
                            className="h-32 w-32 rounded-md object-cover"
                          />
                          <div className="flex flex-col justify-between flex-1">
                            <div>
                              <h4 className="text-xl font-semibold">{album.title}</h4>
                              <p className="text-base text-muted-foreground">{album.artist}</p>
                              <p className="text-sm text-muted-foreground mt-2">{album.description}</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {album.duration}
                              </span>
                              <span className="flex items-center gap-2">
                                <ListMusic className="h-4 w-4" />
                                {album.tracks.length} utworów
                              </span>
                            </div>
                          </div>
                        </div>
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full mt-4 justify-between"
                            >
                              Lista utworów
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-2 mt-2">
                            {album.tracks.map((track) => (
                              <Button
                                key={track.id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-between font-normal"
                                onClick={() => playTrack(track)}
                              >
                                <span className="flex items-center">
                                  <Music className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {track.title}
                                </span>
                                <span className="flex items-center text-sm text-muted-foreground">
                                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                                </span>
                              </Button>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

