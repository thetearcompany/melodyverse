export interface Track {
  id: string
  title: string
  artist: string
  albumId?: string
  duration: number
  price?: number
  beatCoins?: number
  playCount?: number
  fileUrl: string
  coverUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Album {
  id: string
  title: string
  artist: string
  year: string
  coverArt: string
  description: string
  beatCoins: number
  featured: boolean
  label: string
  producer: string
  duration: string
  tracks: Track[]
  colors?: {
    from: string
    to: string
  }
  createdAt?: Date
  updatedAt?: Date
} 