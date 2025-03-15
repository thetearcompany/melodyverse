export interface RadioStation {
  id: string
  name: string
  genre: "reggae" | "amapiano" | "gospel" | "dub"
  description: string
  streamUrl: string
  current: boolean
} 