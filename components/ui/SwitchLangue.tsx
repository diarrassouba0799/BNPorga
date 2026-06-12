'use client'
import { useLangueStore } from '@/store/useLangueStore'

export default function SwitchLangue() {
  const { langue, setLangue } = useLangueStore()

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setLangue('it')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
        style={{
          background: langue === 'it' ? '#009B4E' : 'transparent',
          color: langue === 'it' ? 'white' : '#6b7280',
        }}
      >
        🇮🇹 IT
      </button>
      <button
        onClick={() => setLangue('fr')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
        style={{
          background: langue === 'fr' ? '#009B4E' : 'transparent',
          color: langue === 'fr' ? 'white' : '#6b7280',
        }}
      >
        🇫🇷 FR
      </button>
    </div>
  )
}