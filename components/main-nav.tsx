"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Music, Home, Search, Library, Radio, Ticket } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Music className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">BeatStream</span>
      </Link>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/search" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href="/search">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/library" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href="/library">
            <Library className="mr-2 h-4 w-4" />
            Library
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/radio" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href="/radio">
            <Radio className="mr-2 h-4 w-4" />
            Radio
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/concerts" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href="/concerts">
            <Ticket className="mr-2 h-4 w-4" />
            Concerts
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/social-network" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href="/social-network">
            Social Network
          </Link>
        </Button>
      </nav>
    </div>
  )
}

