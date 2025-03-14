import Link from "next/link"
import Image from "next/image"

// Mock data - would come from a database in a real app
const relatedAlbums = [
  {
    id: "2",
    title: "Catch a Fire",
    artist: "Bob Marley & The Wailers",
    coverArt: "/placeholder.svg?height=150&width=150",
    year: "1973",
    beatCoins: 110,
  },
  {
    id: "3",
    title: "Rastaman Vibration",
    artist: "Bob Marley & The Wailers",
    coverArt: "/placeholder.svg?height=150&width=150",
    year: "1976",
    beatCoins: 100,
  },
  {
    id: "4",
    title: "Equal Rights",
    artist: "Peter Tosh",
    coverArt: "/placeholder.svg?height=150&width=150",
    year: "1977",
    beatCoins: 100,
  },
]

interface RelatedAlbumsProps {
  currentAlbumId: string
}

export function RelatedAlbums({ currentAlbumId }: RelatedAlbumsProps) {
  // Filter out the current album if it's in the related albums
  const filteredAlbums = relatedAlbums.filter((album) => album.id !== currentAlbumId)

  return (
    <div className="space-y-4">
      {filteredAlbums.map((album) => (
        <Link href={`/album/${album.id}`} key={album.id}>
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
            <Image
              src={album.coverArt || "/placeholder.svg"}
              width={60}
              height={60}
              alt={album.title}
              className="rounded-md"
            />
            <div>
              <h4 className="font-medium text-sm">{album.title}</h4>
              <p className="text-xs text-muted-foreground">{album.artist}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">{album.year}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-xs font-medium text-[#FFD700]">{album.beatCoins} BC</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

