'use client'
import { Transaction } from '@/types'
import { formatMontant, formatDate } from '@/lib/utils'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'

const categorieEmoji: Record<string, string> = {
  Salaire: '💼', Courses: '🛒', Loisirs: '🎬', Transport: '🚆',
  Factures: '⚡', Virement: '↔️', Shopping: '🛍️', Sante: '💊', Logement: '🏠',
}

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  const { langue } = useLangueStore()

  const labelVoirTout = langue === 'it' ? 'Vedi tutto' : 'Voir tout'
  const labelDernieres = langue === 'it' ? 'Ultime operazioni' : 'Dernieres operations'

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">{labelDernieres}</h3>
        <Link href="/transactions" className="text-sm hover:underline" style={{ color: '#009B4E' }}>
          {labelVoirTout}
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {transactions.slice(0, 6).map((tx) => (
          <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-base flex-shrink-0">
              {categorieEmoji[tx.categorie] || '💳'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{tx.libelle}</p>
              <p className="text-xs text-gray-400">{formatDate(tx.date)} · {tx.categorie}</p>
            </div>
            <div className={`flex items-center gap-1 font-semibold text-sm ${tx.type === 'credit' ? 'text-[#009B4E]' : 'text-gray-800'}`}>
              {tx.type === 'credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
              {tx.type === 'credit' ? '+' : '-'}{formatMontant(Math.abs(tx.montant))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}