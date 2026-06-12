'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, CreditCard, Send, Settings } from 'lucide-react'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import SwitchLangue from '@/components/ui/SwitchLangue'

export default function MobileNav() {
  const pathname = usePathname()
  const { langue } = useLangueStore()

  const navItems = [
    { href: '/dashboard', label: t('accueil', langue), icon: LayoutDashboard },
    { href: '/transactions', label: t('mouvements', langue), icon: ArrowLeftRight },
    { href: '/virements', label: t('virement', langue), icon: Send },
    { href: '/cartes', label: t('cartes', langue), icon: CreditCard },
    { href: '/parametres', label: t('profil', langue), icon: Settings },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Switch langue au dessus de la nav */}
      <div className="bg-white border-t border-gray-100 flex justify-center py-1.5">
        <SwitchLangue />
      </div>
      <nav className="bg-white border-t border-gray-200">
        <div className="flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors',
                  active ? 'text-[#009B4E]' : 'text-gray-400'
                )}
              >
                <Icon size={20} />
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}