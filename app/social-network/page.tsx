'use client'
import React from 'react';
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
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useDonationStore } from "@/store/use-donation-store";

const SocialNetworkPage = () => {
  const { isDialogOpen, selectedAmount, handleDonate, setIsDialogOpen, processDonation } = useDonationStore();

  return (
    <div className="flex h-full flex-col py-2">
      <div className="container py-6">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              MelodyVerse Social
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
            <div className="space-y-8 sticky top-4">
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
                    <Calendar className="mr-4 h-5 w-5 group-hover:text-primary transition-colors" />
                    Wydarzenia
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
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <div className="space-y-8">
                {/* Przykładowy post artysty */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src="/artists/artist1.jpg"
                      alt="Artist Avatar"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">DJ Beatmaster</h4>
                          <p className="text-sm text-muted-foreground">Producent | Warszawa</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="mt-4">Właśnie skończyłem nowy beat! Kto chętny do kolaboracji? 🎵 #trap #boombap</p>
                      <div className="mt-4">
                        <audio controls className="w-full">
                          <source src="/samples/beat1.mp3" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Heart className="h-4 w-4" />
                          128
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          24
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Przykładowe wydarzenie */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src="/events/event1.jpg"
                      alt="Event Cover"
                      className="h-32 w-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold">Hip-Hop Jam Session</h4>
                      <p className="text-sm text-muted-foreground mt-1">Sobota, 20 Maja 2024 | 20:00</p>
                      <p className="mt-4">Otwarte jam session dla wszystkich hip-hopowych artystów! Przyjdź, pokaż swój talent i poznaj innych twórców.</p>
                      <div className="mt-4 flex items-center gap-4">
                        <Button className="gap-2">
                          <Calendar className="h-4 w-4" />
                          Dołącz
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          46 osób weźmie udział
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Polecani artyści - 3/12 */}
          <div className="col-span-3 space-y-8">
            <div className="sticky top-4">
              <h3 className="text-2xl font-semibold mb-6">Polecani Artyści</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((artist) => (
                  <div key={artist} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                    <img
                      src={`/artists/artist${artist}.jpg`}
                      alt="Artist Avatar"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">Artist Name</h4>
                      <p className="text-sm text-muted-foreground">Producer</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Obserwuj
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-6">Nadchodzące Wydarzenia</h3>
                <div className="space-y-4">
                  {[1, 2].map((event) => (
                    <div key={event} className="p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                      <h4 className="font-semibold">Event Name</h4>
                      <p className="text-sm text-muted-foreground">20 Maja 2024 | 20:00</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        Szczegóły
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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