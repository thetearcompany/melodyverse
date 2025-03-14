import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MusicPlayer } from "@/components/music-player"
import { RadioPlayer } from "@/components/radio-player"
import { RadioStations } from "@/components/radio-stations"
import { Separator } from "@/components/ui/separator"

export default function RadioPage() {
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
                  <h2 className="text-2xl font-bold mb-4">About Adonai Radio</h2>
                  <p className="text-muted-foreground mb-4">
                    Adonai Radio brings you the best in reggae, gospel, and spiritual music from around the world. Our
                    mission is to spread positive vibrations and messages of love, unity, and faith through music.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    The name "Adonai" comes from Hebrew and is one of the names used to refer to God in the Bible, often
                    translated as "Lord" or "Master." Our radio celebrates the spiritual roots of reggae music and its
                    connection to Rastafarian faith and other spiritual traditions.
                  </p>
                  <p className="text-muted-foreground">
                    Tune in 24/7 for uplifting music that feeds the soul and elevates the mind. Whether you're looking
                    for classic roots reggae, modern conscious music, or spiritual hymns with a reggae twist, Adonai
                    Radio has something for you.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Current Program</h2>
                  <div className="rounded-md border overflow-hidden">
                    <div className="bg-muted/50 px-4 py-3 font-medium">Now Playing: Roots & Culture Hour</div>
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <span>12:00 - 14:00</span>
                        <span className="text-primary font-medium">LIVE NOW</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>14:00 - 16:00</span>
                        <span>Gospel Reggae Session</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>16:00 - 18:00</span>
                        <span>Dub & Meditation</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>18:00 - 20:00</span>
                        <span>Nyabinghi Drumming</span>
                      </div>
                    </div>
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
                      <button className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80">
                        50 BC
                      </button>
                      <button className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80">
                        100 BC
                      </button>
                      <button className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80">
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
                      <span className="font-bold text-[#FFD700]">DJ_Adonai:</span> Currently playing: Bob Marley -
                      Redemption Song
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
    </div>
  )
}

