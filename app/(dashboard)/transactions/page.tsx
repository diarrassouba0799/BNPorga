'use client'
import Topbar from '@/components/layout/Topbar'
import TransactionList from '@/components/transactions/TransactionList'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'

export default function TransactionsPage() {
  const { langue } = useLangueStore()
  return (
    <div>
      <Topbar title={t('historique', langue)} />
      <div className="p-6 max-w-4xl mx-auto">
        <TransactionList />
      </div>
    </div>
  )
}