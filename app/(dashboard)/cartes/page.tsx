'use client'
import Topbar from '@/components/layout/Topbar'
import CarteVisuelle from '@/components/cartes/CarteVisuelle'
import { mockCartes } from '@/lib/data'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'

export default function CartesPage() {
  const { langue } = useLangueStore()
  return (
    <div>
      <Topbar title={t('mes_cartes_titre', langue)} />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockCartes.map((carte) => (
            <CarteVisuelle key={carte.id} carte={carte} />
          ))}
        </div>
      </div>
    </div>
  )
}