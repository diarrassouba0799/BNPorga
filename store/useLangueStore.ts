import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Langue } from '@/lib/i18n'

interface LangueState {
  langue: Langue
  setLangue: (l: Langue) => void
}

export const useLangueStore = create<LangueState>()(
  persist(
    (set) => ({
      langue: 'it',
      setLangue: (langue) => set({ langue }),
    }),
    { name: 'bnp-langue' }
  )
)