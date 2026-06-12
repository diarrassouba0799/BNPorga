'use client'
import Topbar from '@/components/layout/Topbar'
import VirementForm from '@/components/virements/VirementForm'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'

export default function VirementsPage() {
  const { langue } = useLangueStore()
  return (
    <div>
      <Topbar title={t('virements', langue)} />
      <div className="p-6 max-w-2xl mx-auto">
        <VirementForm />
      </div>
    </div>
  )
}