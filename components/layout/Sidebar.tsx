'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ArrowLeftRight, CreditCard,
  Send, LogOut, ChevronRight, Settings
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import SwitchLangue from '@/components/ui/SwitchLangue'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuthStore()
  const { langue } = useLangueStore()

  const navItems = [
    { href: '/dashboard', label: t('tableau_de_bord', langue), icon: LayoutDashboard },
    { href: '/transactions', label: t('transactions', langue), icon: ArrowLeftRight },
    { href: '/virements', label: t('virements', langue), icon: Send },
    { href: '/cartes', label: t('mes_cartes', langue), icon: CreditCard },
    { href: '/parametres', label: t('parametres', langue), icon: Settings },
  ]

  function handleLogout() {
    logout()
    document.cookie = 'bnp-auth=; Max-Age=0; path=/'
    router.push('/login')
  }

  return (
    <aside
      className="hidden lg:flex flex-col w-64 h-screen sticky top-0"
      style={{ background: 'linear-gradient(180deg, #004a00 0%, #006600 50%, #009B4E 100%)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        
          <img src="https://images.icon-icons.com/2699/PNG/512/bnpparibas_logo_icon_168503.png" alt="BNP Paribas" className="w-10 h-11"/>
        
        <div>
          <p className="font-bold text-white text-sm tracking-wide">BNP Paribas</p>
          <p className="text-xs text-green-200">Banque en ligne</p>
        </div>
      </div>

      {/* Switch langue */}
      <div className="px-4 py-3 border-b border-white/10">
        <SwitchLangue />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active ? 'bg-white text-[#009B4E]' : 'text-green-100 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      {/* Profil */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">
              {user?.prenom?.[0]?.toUpperCase()}{user?.nom?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.prenom} {user?.nom}
            </p>
            <p className="text-xs text-green-200 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          {t('deconnexion', langue)}
        </button>
      </div>
    </aside>
  )
}