import { create } from 'zustand'
import { RadioStation } from '@/types/radio'

interface RadioStore {
  currentStation: RadioStation | null
  isPlaying: boolean
  volume: number
  audioElement: HTMLAudioElement | null
  setCurrentStation: (station: RadioStation) => void
  playStation: (station: RadioStation) => void
  pauseStation: () => void
  setVolume: (volume: number) => void
  initAudio: () => void
}

export const useRadioStore = create<RadioStore>((set, get) => ({
  currentStation: null,
  isPlaying: false,
  volume: 0.8,
  audioElement: null,

  initAudio: () => {
    if (!get().audioElement) {
      const audio = new Audio()
      audio.volume = get().volume
      set({ audioElement: audio })
    }
  },

  setCurrentStation: (station) => {
    set({ currentStation: station })
  },

  playStation: (station) => {
    const { audioElement, currentStation } = get()
    
    if (!audioElement) return
    
    // If different station, change source
    if (!currentStation || currentStation.id !== station.id) {
      audioElement.src = station.streamUrl
      set({ currentStation: station })
    }
    
    audioElement.play()
    set({ isPlaying: true })
  },

  pauseStation: () => {
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
  }
})) 