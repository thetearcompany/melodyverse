import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MusicPlayer } from "@/components/music-player"
import { ConcertsList } from "@/components/concerts-list"
import { ConcertMap } from "@/components/concert-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConcertFilters } from "@/components/concert-filters"

export default function ConcertsPage() {
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
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Live Concerts</h1>
              <p className="text-muted-foreground">Discover upcoming reggae concerts and events near you</p>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>

                <ConcertFilters />
              </div>

              <TabsContent value="list" className="mt-0">
                <ConcertsList />
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <ConcertMap />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  )
}

