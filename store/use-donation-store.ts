import { create } from 'zustand'
import Dexie from 'dexie'

interface DonationStore {
  isDialogOpen: boolean
  selectedAmount: number
  donationHistory: Array<{
    id: string
    amount: number
    status: 'pending' | 'completed' | 'failed'
    timestamp: Date
  }>
  setIsDialogOpen: (open: boolean) => void
  setSelectedAmount: (amount: number) => void
  handleDonate: (amount: number) => void
  processDonation: () => void
}

// Create Dexie database
class DonationDB extends Dexie {
  donations: Dexie.Table<{
    id: string
    amount: number
    status: 'pending' | 'completed' | 'failed'
    timestamp: Date
  }, string>

  constructor() {
    super('DonationDB')
    this.version(1).stores({
      donations: 'id, amount, status, timestamp'
    })
    this.donations = this.table('donations')
  }
}

const db = new DonationDB()

export const useDonationStore = create<DonationStore>((set, get) => ({
  isDialogOpen: false,
  selectedAmount: 0,
  donationHistory: [],

  setIsDialogOpen: (open) => set({ isDialogOpen: open }),
  setSelectedAmount: (amount) => set({ selectedAmount: amount }),

  handleDonate: (amount) => {
    set({ selectedAmount: amount, isDialogOpen: true })
  },

  processDonation: () => {
    const { selectedAmount } = get()
    console.log(`Processing donation of ${selectedAmount} BeatCoins`)
    set({ isDialogOpen: false })
  }
})) 