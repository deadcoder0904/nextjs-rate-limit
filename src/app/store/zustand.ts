import { create } from 'zustand'

type Store = {
  fingerprint: string
  setFingerprint: (fingerprint: string) => void
}

export const useStore = create<Store>()((set) => ({
  fingerprint: '',
  setFingerprint: (fingerprint) => set({ fingerprint }),
}))
