'use client'
import React, { useState } from 'react';
import { 
  Music, 
  Users, 
  MessageCircle, 
  Star, 
  Flame,
  Heart,
  Clock,
  ListMusic,
  Radio,
  Mic2,
  Share2,
  Calendar,
  Plus,
  Search,
  Bell,
  Settings,
  Headphones,
  Tag,
  Bookmark,
  TrendingUp,
  Music2,
  UserPlus,
  Zap,
  Award,
  Play,
  Pause,
  MoreVertical,
  Filter,
  Globe,
  Mic,
  Video,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDonationStore } from "@/store/use-donation-store";
import { MusicPlayer } from "@/components/music-player";

// Przykładowe dane
const mockPosts = [
  {
    id: 1,
    author: {
      name: "DJ Beatmaster",
      role: "Producent",
      location: "Warszawa",
      avatar: "/artists/artist1.jpg",
      verified: true,
      genres: ["Hip-Hop", "Trap", "Boombap"]
    },
    content: "Właśnie skończyłem nowy beat! Kto chętny do kolaboracji? 🎵 #trap #boombap",
    audio: {
      url: "/samples/beat1.mp3",
      title: "Nowy Beat 2024",
      duration: "2:45",
      genre: "Trap",
      bpm: 140
    },
    likes: 128,
    comments: 24,
    shares: 12,
    tags: ["trap", "boombap", "newbeat"],
    isPlaying: false
  },
  {
    id: 2,
    author: {
      name: "MC Flow",
      role: "Raper",
      location: "Kraków",
      avatar: "/artists/artist2.jpg",
      verified: true
    },
    content: "Szukam producenta do współpracy nad EP. Styl: boom bap, jazz rap. Poważne oferty tylko! 🎤",
    likes: 89,
    comments: 35,
    shares: 8,
    tags: ["collaboration", "rapper", "jazzrap"]
  }
];

const mockEvents = [
  {
    id: 1,
    title: "Hip-Hop Jam Session",
    date: "Sobota, 20 Maja 2024",
    time: "20:00",
    location: "Klub Muzyczny Underground",
    cover: "/events/event1.jpg",
    description: "Otwarte jam session dla wszystkich hip-hopowych artystów! Przyjdź, pokaż swój talent i poznaj innych twórców.",
    participants: 46
  },
  {
    id: 2,
    title: "Producenckie Warsztaty",
    date: "Niedziela, 21 Maja 2024",
    time: "16:00",
    location: "Studio Nagrań Melodia",
    cover: "/events/event2.jpg",
    description: "Warsztaty produkcji muzycznej z profesjonalistami. Poznaj tajniki tworzenia hitów!",
    participants: 28
  }
];

const mockArtists = [
  {
    id: 1,
    name: "DJ Beatmaster",
    role: "Producent",
    avatar: "/artists/artist1.jpg",
    followers: 1200,
    verified: true
  },
  {
    id: 2,
    name: "MC Flow",
    role: "Raper",
    avatar: "/artists/artist2.jpg",
    followers: 850,
    verified: false
  },
  {
    id: 3,
    name: "Melody Queen",
    role: "Wokalistka",
    avatar: "/artists/artist3.jpg",
    followers: 2300,
    verified: true
  }
];

const SocialNetworkPage = () => {
  const { isDialogOpen, selectedAmount, handleDonate, setIsDialogOpen, processDonation } = useDonationStore();
  const [activePost, setActivePost] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handlePlayPause = (postId: number) => {
    if (activePost === postId) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePost(postId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Główna nawigacja */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              MelodyVerse
            </h2>
            <nav className="flex items-center gap-6">
              <Button variant="ghost" className="gap-2">
                <Music2 className="h-4 w-4" />
                Muzyka
              </Button>
              <Button variant="ghost" className="gap-2">
                <Users className="h-4 w-4" />
                Społeczność
              </Button>
              <Button variant="ghost" className="gap-2">
                <Radio className="h-4 w-4" />
                Live
              </Button>
              <Button variant="ghost" className="gap-2">
                <Award className="h-4 w-4" />
                Rankingi
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Szukaj..." className="pl-8" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary" />
          </div>
        </div>
      </header>

      <div className="flex-1">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Społeczność
              </h2>
              <p className="text-lg text-muted-foreground">
                Łącz się z artystami, twórz i inspiruj
              </p>
            </div>
            <Button variant="default" size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nowy Post
            </Button>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Nawigacja - 3/12 */}
            <div className="col-span-3 border-r pr-6">
              <div className="space-y-8 sticky top-20">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Odkrywaj</h3>
                  <div className="flex flex-col gap-3">
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Flame className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Popularne
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Star className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Nowe Talenty
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <TrendingUp className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Trendy
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Calendar className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Wydarzenia
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Twoje Miejsce</h3>
                  <div className="flex flex-col gap-3">
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Heart className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Obserwowane
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Bookmark className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Zapisane
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Tag className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Twoje Tagi
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Społeczność</h3>
                  <div className="flex flex-col gap-3">
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Users className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Artyści
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <MessageCircle className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Dyskusje
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium hover:bg-accent group">
                      <Radio className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                      Live Sessions
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button variant="outline" className="w-full bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-white hover:from-[#FFD700]/90 hover:to-[#DC143C]/90">
                    Wesprzyj Artystów
                  </Button>
                </div>
              </div>
            </div>

            {/* Feed - 6/12 */}
            <div className="col-span-6">
              <div className="flex items-center justify-between mb-8">
                <Tabs defaultValue="foryou" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="foryou">Dla Ciebie</TabsTrigger>
                    <TabsTrigger value="following">Obserwowani</TabsTrigger>
                    <TabsTrigger value="latest">Najnowsze</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4" />
                    Filtry
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    Globalne
                  </Button>
                </div>
              </div>

              {showFilters && (
                <div className="mb-6 p-4 border rounded-lg bg-card">
                  <h4 className="font-medium mb-3">Filtruj według:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Hip-Hop", "Trap", "Boombap", "Jazz", "R&B", "Pop"].map((genre) => (
                      <Badge 
                        key={genre}
                        variant={selectedGenre === genre ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <ScrollArea className="h-[calc(100vh-14rem)]">
                <div className="space-y-8">
                  {mockPosts.map((post) => (
                    <div key={post.id} className="rounded-lg border bg-card p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-semibold">{post.author.name}</h4>
                              {post.author.verified && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  <Zap className="h-3 w-3 mr-1" />
                                  Pro
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-5 w-5" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-muted-foreground">{post.author.role} | {post.author.location}</p>
                            {post.author.genres?.map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          <p className="mt-4">{post.content}</p>
                          {post.audio && (
                            <div className="mt-4">
                              <div className="rounded-md border bg-card/50 p-4">
                                <div className="flex items-center gap-4">
                                  <Button 
                                    size="icon" 
                                    className="h-10 w-10 rounded-full"
                                    onClick={() => handlePlayPause(post.id)}
                                  >
                                    {activePost === post.id && isPlaying ? (
                                      <Pause className="h-5 w-5" />
                                    ) : (
                                      <Play className="h-5 w-5" />
                                    )}
                                  </Button>
                                  <div className="flex-1">
                                    <h5 className="font-medium">{post.audio.title}</h5>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <span>{post.audio.duration}</span>
                                      <span>BPM: {post.audio.bpm}</span>
                                      <Badge variant="secondary">{post.audio.genre}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <audio controls className="w-full mt-4">
                                  <source src={post.audio.url} type="audio/mpeg" />
                                </audio>
                              </div>
                            </div>
                          )}
                          <div className="mt-4 flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Heart className="h-4 w-4" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <MessageCircle className="h-4 w-4" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Share2 className="h-4 w-4" />
                              {post.shares}
                            </Button>
                          </div>
                          {post.tags && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-accent">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {mockEvents.map((event) => (
                    <div key={event.id} className="rounded-lg border bg-card p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={event.cover}
                          alt={event.title}
                          className="h-32 w-32 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.date} | {event.time}
                          </p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                          <p className="mt-4">{event.description}</p>
                          <div className="mt-4 flex items-center gap-4">
                            <Button className="gap-2">
                              <Calendar className="h-4 w-4" />
                              Dołącz
                            </Button>
                            <span className="text-sm text-muted-foreground">
                              {event.participants} osób weźmie udział
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Polecani artyści - 3/12 */}
            <div className="col-span-3 space-y-8">
              <div className="sticky top-20">
                <h3 className="text-2xl font-semibold mb-6">Polecani Artyści</h3>
                <div className="space-y-4">
                  {mockArtists.map((artist) => (
                    <div key={artist.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{artist.name}</h4>
                          {artist.verified && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              <Zap className="h-3 w-3 mr-1" />
                              Pro
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{artist.role}</p>
                        <p className="text-xs text-muted-foreground">{artist.followers} obserwujących</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Obserwuj
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-6">Nadchodzące Wydarzenia</h3>
                  <div className="space-y-4">
                    {mockEvents.map((event) => (
                      <div key={event.id} className="p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.date} | {event.time}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        <Button variant="ghost" size="sm" className="mt-2 gap-2">
                          <Calendar className="h-4 w-4" />
                          Szczegóły
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-6">Popularne Tagi</h3>
                  <div className="flex flex-wrap gap-2">
                    {["trap", "boombap", "producer", "collaboration", "beatmaker", "rapper", "studio", "live"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-accent">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-4">
        <Button size="icon" className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg">
          <Mic className="h-6 w-6" />
        </Button>
        <Button size="icon" className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg">
          <Video className="h-6 w-6" />
        </Button>
        <Button size="icon" className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg">
          <Image className="h-6 w-6" />
        </Button>
      </div>

      {/* Player */}
      <MusicPlayer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Potwierdź Wsparcie</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Czy na pewno chcesz wesprzeć artystę kwotą {selectedAmount} BeatCoins?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Anuluj
              </Button>
              <Button 
                onClick={processDonation}
                className="bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-white hover:from-[#FFD700]/90 hover:to-[#DC143C]/90"
              >
                Potwierdź
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialNetworkPage; 