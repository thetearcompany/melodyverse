import { MusicPlayer } from "@/components/music-player"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MusicLibrary } from "@/components/music-library"
import { BentoGrid } from "@/components/bento-grid"

export default function Home() {
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
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
          <aside className="hidden w-[250px] flex-col md:flex">
            <MusicLibrary />
          </aside>
          <div className="flex flex-col gap-6 py-6">
            <h1 className="text-3xl font-bold tracking-tight">Iconic Rasta Albums</h1>
            <p className="text-muted-foreground">Discover the spiritual and revolutionary sounds of Reggae music</p>
            <BentoGrid />
          </div>
        </div>
      </main>
      <MusicPlayer />
    </div>
  )
}

