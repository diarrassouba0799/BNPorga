'use client'
import { Bell } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export default function Topbar({ title }: { title: string }) {
  const { user, avatar } = useAuthStore()

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-1 h-7 rounded-full hidden lg:block"
          style={{ background: 'linear-gradient(180deg, #009B4E, #006635)' }}
        />
        <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        {/* Initiales — visible partout */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #009B4E, #006635)' }}
        >
          {avatar ? (
            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-xs">
              {user?.prenom?.[0]?.toUpperCase()}{user?.nom?.[0]?.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}