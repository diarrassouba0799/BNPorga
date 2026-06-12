'use client'
import Topbar from '@/components/layout/Topbar'
import ParametresClient from '@/components/parametres/ParametresClient'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'

export default function ParametresPage() {
  const { langue } = useLangueStore()
  return (
    <div>
      <Topbar title={t('parametres', langue)} />
      <div className="p-6 max-w-2xl mx-auto">
        <ParametresClient />
      </div>
    </div>
  )
}