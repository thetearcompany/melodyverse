import { create } from 'zustand'
import { Track, Album } from '@/types/music'

interface MusicStore {
  currentTrack: Track | null
  queue: Track[]
  isPlaying: boolean
  volume: number
  audioElement: HTMLAudioElement | null
  library: {
    folders: {
      id: string
      name: string
      tracks: Track[]
    }[]
    playlists: {
      id: string
      name: string
      tracks: Track[]
    }[]
    albums: Album[]
  }
  setCurrentTrack: (track: Track) => void
  setQueue: (tracks: Track[]) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (trackId: string) => void
  clearQueue: () => void
  playTrack: (track: Track) => void
  pauseTrack: () => void
  setVolume: (volume: number) => void
  initAudio: () => void
  // Funkcje biblioteki
  addToLibrary: (track: Track, folderId: string) => void
  createFolder: (name: string) => void
  createPlaylist: (name: string) => void
  addToPlaylist: (track: Track, playlistId: string) => void
  createAlbum: (album: Omit<Album, "id" | "createdAt" | "updatedAt">) => void
  addTrackToAlbum: (albumId: string, track: Omit<Track, "id" | "albumId" | "createdAt" | "updatedAt">) => void
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.8,
  audioElement: null,
  library: {
    folders: [
      {
        id: "worship",
        name: "Worship",
        tracks: []
      },
      {
        id: "praise",
        name: "Praise",
        tracks: []
      }
    ],
    playlists: [
      {
        id: "favorites",
        name: "Ulubione Adonai",
        tracks: []
      }
    ],
    albums: [
      {
        id: "eastwest-rockers-jedyna-bron",
        title: "Jedyna Broń",
        artist: "East West Rockers",
        year: "2008",
        coverArt: "https://ecsmedia.pl/c/jedyna-bron-b-iext120461274.jpg",
        description: "Debiutancki album zespołu East West Rockers, łączący reggae, dancehall i hip-hop.",
        beatCoins: 100,
        featured: true,
        label: "Lou & Rocked Boys",
        producer: "East West Rockers",
        duration: "54:20",
        tracks: [
          {
            id: "ewr-1",
            title: "Intro",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 89,
            beatCoins: 5,
            playCount: 0,
            fileUrl: "https://example.com/ewr/intro.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          },
          {
            id: "ewr-2",
            title: "Jedyna Broń",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 232,
            beatCoins: 10,
            playCount: 0,
            fileUrl: "https://example.com/ewr/jedyna-bron.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          },
          {
            id: "ewr-3",
            title: "Babilon",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 245,
            beatCoins: 10,
            playCount: 0,
            fileUrl: "https://example.com/ewr/babilon.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          },
          {
            id: "ewr-4",
            title: "Nie Ma Miejsca",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 218,
            beatCoins: 10,
            playCount: 0,
            fileUrl: "https://example.com/ewr/nie-ma-miejsca.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          },
          {
            id: "ewr-5",
            title: "Moja Muzyka",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 256,
            beatCoins: 10,
            playCount: 0,
            fileUrl: "https://example.com/ewr/moja-muzyka.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          },
          {
            id: "ewr-6",
            title: "Każdy Dzień",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 224,
            beatCoins: 10,
            playCount: 0,
            fileUrl: "https://example.com/ewr/kazdy-dzien.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          },
          {
            id: "ewr-7",
            title: "Nie Zatrzymasz Mnie",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 238,
            beatCoins: 10,
            playCount: 0,
            fileUrl: "https://example.com/ewr/nie-zatrzymasz-mnie.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          },
          {
            id: "ewr-8",
            title: "Outro",
            artist: "East West Rockers",
            albumId: "eastwest-rockers-jedyna-bron",
            duration: 95,
            beatCoins: 5,
            playCount: 0,
            fileUrl: "https://example.com/ewr/outro.mp3",
            createdAt: new Date("2008-01-01"),
            updatedAt: new Date("2008-01-01")
          }
        ],
        createdAt: new Date("2008-01-01"),
        updatedAt: new Date("2008-01-01")
      }
    ]
  },

  initAudio: () => {
    if (!get().audioElement) {
      const audio = new Audio()
      audio.volume = get().volume
      set({ audioElement: audio })
    }
  },

  setCurrentTrack: (track) => {
    set({ currentTrack: track })
  },

  setQueue: (tracks) => {
    set({ queue: tracks })
  },

  addToQueue: (track) => {
    set((state) => ({ queue: [...state.queue, track] }))
  },

  removeFromQueue: (trackId) => {
    set((state) => ({
      queue: state.queue.filter((track) => track.id !== trackId)
    }))
  },

  clearQueue: () => {
    set({ queue: [] })
  },

  playTrack: (track) => {
    const { audioElement, currentTrack } = get()
    
    if (!audioElement) return
    
    // If different track, change source
    if (!currentTrack || currentTrack.id !== track.id) {
      audioElement.src = track.fileUrl
      set({ currentTrack: track })
    }
    
    audioElement.play()
    set({ isPlaying: true })
  },

  pauseTrack: () => {
    const { audioElement } = get()
    if (audioElement) {
      audioElement.pause()
      set({ isPlaying: false })
    }
  },

  setVolume: (volume) => {
    const { audioElement } = get()
    if (audioElement) {
      audioElement.volume = volume
    }
    set({ volume })
  },

  addToLibrary: (track, folderId) => {
    set((state) => ({
      library: {
        ...state.library,
        folders: state.library.folders.map((folder) => {
          if (folder.id === folderId) {
            return {
              ...folder,
              tracks: [...folder.tracks, track]
            }
          }
          return folder
        })
      }
    }))
  },

  createFolder: (name) => {
    set((state) => ({
      library: {
        ...state.library,
        folders: [
          ...state.library.folders,
          {
            id: Date.now().toString(),
            name,
            tracks: []
          }
        ]
      }
    }))
  },

  createPlaylist: (name) => {
    set((state) => ({
      library: {
        ...state.library,
        playlists: [
          ...state.library.playlists,
          {
            id: Date.now().toString(),
            name,
            tracks: []
          }
        ]
      }
    }))
  },

  addToPlaylist: (track, playlistId) => {
    set((state) => ({
      library: {
        ...state.library,
        playlists: state.library.playlists.map((playlist) => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              tracks: [...playlist.tracks, track]
            }
          }
          return playlist
        })
      }
    }))
  },

  createAlbum: (album) => {
    const newAlbum: Album = {
      ...album,
      id: Date.now().toString(),
      tracks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    set((state) => ({
      library: {
        ...state.library,
        albums: [...state.library.albums, newAlbum]
      }
    }))
    
    return newAlbum.id
  },

  addTrackToAlbum: (albumId, track) => {
    const newTrack: Track = {
      ...track,
      id: Date.now().toString(),
      albumId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    set((state) => ({
      library: {
        ...state.library,
        albums: state.library.albums.map((album) => {
          if (album.id === albumId) {
            return {
              ...album,
              tracks: [...album.tracks, newTrack],
              updatedAt: new Date()
            }
          }
          return album
        })
      }
    }))
  }
})) 