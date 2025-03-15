'use client'
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MusicPlayer } from "@/components/music-player"
import { RadioPlayer } from "@/components/radio-player"
import { RadioStations } from "@/components/radio-stations"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useDonationStore } from "@/store/use-donation-store"
import { useEffect, useState } from 'react'

const soulPortraits = [
  {
    id: 1,
    name: "King David",
    role: "Psalmist",
    image: "/placeholder.svg",
    description: "The sweet psalmist of Israel, whose songs still echo through eternity.",
    favoriteVerse: "The Lord is my shepherd; I shall not want.",
  },
  {
    id: 2,
    name: "Bob Marley",
    role: "Prophet of Reggae",
    image: "/placeholder.svg",
    description: "Messenger of love and unity through music.",
    favoriteVerse: "One love, one heart, let's get together and feel alright.",
  },
  {
    id: 3,
    name: "Peter Tosh",
    role: "Word, Sound and Power",
    image: "/placeholder.svg",
    description: "Teacher of righteousness through music.",
    favoriteVerse: "I'm not in this world to live up to your expectations.",
  },
]

const getSpiritualPrograms = () => {
  const currentHour = new Date().getHours()
  
  return [
    {
      time: "06:00 - 08:00",
      name: "Morning Meditation",
      description: "Start your day with spiritual vibrations",
      current: currentHour >= 6 && currentHour < 8
    },
    {
      time: "08:00 - 10:00",
      name: "Psalms & Proverbs",
      description: "Ancient wisdom for modern times",
      current: currentHour >= 8 && currentHour < 10
    },
    {
      time: "10:00 - 12:00",
      name: "Roots Revival",
      description: "Classic roots reggae and spiritual messages",
      current: currentHour >= 10 && currentHour < 12
    },
    {
      time: "12:00 - 14:00",
      name: "Zion Teachings",
      description: "Lessons from the ancient prophets",
      current: currentHour >= 12 && currentHour < 14
    },
    {
      time: "14:00 - 16:00",
      name: "Gospel Reggae",
      description: "Modern gospel with reggae rhythms",
      current: currentHour >= 14 && currentHour < 16
    },
    {
      time: "16:00 - 18:00",
      name: "Dub & Meditation",
      description: "Deep dub rhythms for meditation",
      current: currentHour >= 16 && currentHour < 18
    },
    {
      time: "18:00 - 20:00",
      name: "Nyabinghi Drumming",
      description: "Traditional Rastafarian drumming and chants",
      current: currentHour >= 18 && currentHour < 20
    },
    {
      time: "20:00 - 22:00",
      name: "Conscious Dancehall",
      description: "Positive and uplifting dancehall",
      current: currentHour >= 20 && currentHour < 22
    },
    {
      time: "22:00 - 00:00",
      name: "Night Meditation",
      description: "Calm and peaceful vibrations for the night",
      current: currentHour >= 22 || currentHour < 0
    },
    {
      time: "00:00 - 06:00",
      name: "Roots & Culture",
      description: "Classic roots reggae through the night",
      current: currentHour >= 0 && currentHour < 6
    }
  ]
}

export default function RadioPage() {
  const { isDialogOpen, selectedAmount, handleDonate, setIsDialogOpen, processDonation } = useDonationStore()
  const [programs, setPrograms] = useState(getSpiritualPrograms())

  useEffect(() => {
    // Update programs every minute
    const interval = setInterval(() => {
      setPrograms(getSpiritualPrograms())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

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
        <div className="container py-8">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Adonai Radio</h1>
              <p className="text-muted-foreground">Listen to live reggae, gospel, and spiritual music streams</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
              <div className="space-y-8">
                <RadioPlayer />

                <div>
                  <h2 className="text-2xl font-bold mb-4">Souls of Zion</h2>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {soulPortraits.map((soul) => (
                        <CarouselItem key={soul.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#006400]/20 to-[#FFD700]/10 p-4">
                              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                                <img src={soul.image} alt={soul.name} className="w-full h-full object-cover" />
                              </div>
                              <h3 className="font-bold text-lg mb-1">{soul.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{soul.role}</p>
                              <p className="text-sm mb-3">{soul.description}</p>
                              <p className="text-sm italic">&quot;{soul.favoriteVerse}&quot;</p>
                            </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Current Program</h2>
                  <div className="rounded-md border overflow-hidden">
                    {programs.map((program, index) => (
                      <div key={program.time} className={program.current ? "bg-muted/50" : ""}>
                        <div className="px-4 py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{program.name}</h3>
                              <p className="text-sm text-muted-foreground">{program.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{program.time}</p>
                              {program.current && (
                                <span className="text-primary text-sm font-medium">LIVE NOW</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {index < programs.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">Other Stations</h2>
                  <RadioStations />
                </div>

                <div className="rounded-md border p-4 bg-gradient-to-br from-[#006400]/20 to-[#FFD700]/10">
                  <h3 className="font-bold mb-2">Support Adonai Radio</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Help us keep the positive vibrations flowing by supporting our radio station with BeatCoins.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Donate BeatCoins:</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDonate(50)}
                        className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80"
                      >
                        50 BC
                      </button>
                      <button 
                        onClick={() => handleDonate(100)}
                        className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80"
                      >
                        100 BC
                      </button>
                      <button 
                        onClick={() => handleDonate(200)}
                        className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80"
                      >
                        200 BC
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-bold mb-2">Radio Chat</h3>
                  <div className="h-[300px] overflow-y-auto bg-muted/30 rounded-md p-2 mb-3 text-sm">
                    <div className="mb-2">
                      <span className="font-bold text-[#FFD700]">RastaLion:</span> Blessings to all listeners!
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-[#008B8B]">ZionRider:</span> This track is fire 🔥
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-[#DC143C]">JahLove:</span> Greetings from Jamaica
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-[#006400]">RootsWarrior:</span> One love to everyone ❤️
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-[#800080]">EthiopianPrincess:</span> Who's the artist?
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-[#FFD700]">DJ_Adonai:</span> Currently playing: Bob Marley - Redemption Song
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                    <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MusicPlayer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Donation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to donate {selectedAmount} BeatCoins to Adonai Radio?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={processDonation}
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/80"
              >
                Confirm Donation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

