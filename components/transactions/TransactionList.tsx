'use client'
import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useLangueStore } from '@/store/useLangueStore'
import { t } from '@/lib/i18n'
import { formatMontant, formatDate } from '@/lib/utils'
import { ArrowDownLeft, ArrowUpRight, Search, Clock, X, ChevronRight } from 'lucide-react'
import { Transaction } from '@/types'

const categorieEmoji: Record<string, string> = {
  Salaire: '💼', Courses: '🛒', Loisirs: '🎬', Transport: '🚆',
  Factures: '⚡', Virement: '↔️', Shopping: '🛍️', Sante: '💊', Logement: '🏠',
}

function ModalDetails({
  transaction,
  enCours,
  tempsRestant,
  onClose,
  langue,
}: {
  transaction: Transaction
  enCours: boolean
  tempsRestant: string
  onClose: () => void
  langue: 'it' | 'fr'
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            {t('details_virement', langue)}
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Montant */}
        <div className="text-center py-4 bg-gray-50 rounded-xl">
          <p className={`text-3xl font-bold ${transaction.type === 'credit' ? 'text-[#009B4E]' : enCours ? 'text-amber-600' : 'text-gray-900'}`}>
            {transaction.type === 'credit' ? '+' : '-'}{formatMontant(Math.abs(transaction.montant))}
          </p>
          {enCours && (
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Clock size={13} className="text-amber-500" />
              <span className="text-xs text-amber-600 font-medium">{tempsRestant}</span>
            </div>
          )}
        </div>

        {/* Détails */}
        <div className="space-y-3">
          {[
            { label: t('beneficiaire', langue), value: transaction.libelle },
            { label: t('date', langue), value: formatDate(transaction.date) },
            { label: t('reference', langue), value: transaction.id },
            {
              label: t('statut', langue),
              value: enCours ? t('en_cours', langue) : t('effectue', langue),
              colored: true,
              enCours,
            },
            { label: 'Categorie', value: `${categorieEmoji[transaction.categorie] || '💳'} ${transaction.categorie}` },
          ].map(({ label, value, colored, enCours: ec }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className={`text-sm font-medium ${colored ? ec ? 'text-amber-600' : 'text-[#009B4E]' : 'text-gray-900'} text-right max-w-[55%] truncate`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl text-white font-medium"
          style={{ background: '#009B4E' }}
        >
          {t('fermer', langue)}
        </button>
      </div>
    </div>
  )
}

export default function TransactionList() {
  const { transactions, virementsEnCours } = useAuthStore()
  const { langue } = useLangueStore()
  const [search, setSearch] = useState('')
  const [filtre, setFiltre] = useState<'tous' | 'debit' | 'credit'>('tous')
  const [selected, setSelected] = useState<Transaction | null>(null)

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.libelle.toLowerCase().includes(search.toLowerCase())
    const matchFiltre = filtre === 'tous' || tx.type === filtre
    return matchSearch && matchFiltre
  })

  function isEnCours(id: string): boolean {
    const v = virementsEnCours.find((v) => v.id === id)
    return !!v && Date.now() < v.dateCreditPrevue
  }

  function getTempsRestant(id: string): string {
    const v = virementsEnCours.find((v) => v.id === id)
    if (!v) return ''
    const restant = v.dateCreditPrevue - Date.now()
    if (restant <= 0) return langue === 'it' ? 'Accreditato' : 'Credite'
    const h = Math.floor(restant / (1000 * 60 * 60))
    const m = Math.floor((restant % (1000 * 60 * 60)) / (1000 * 60))
    return langue === 'it' ? `Accredito tra ${h}h ${m}m` : `Credit dans ${h}h ${m}m`
  }

  return (
    <div className="space-y-4">
      {/* Recherche + filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder={t('rechercher', langue)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#009B4E] focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {(['tous', 'debit', 'credit'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: filtre === f ? '#009B4E' : 'white',
                color: filtre === f ? 'white' : '#4b5563',
                border: filtre === f ? 'none' : '1px solid #e5e7eb',
              }}
            >
              {f === 'tous' ? t('tous', langue) : f === 'debit' ? t('debits', langue) : t('credits', langue)}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">
              {t('aucune_operation', langue)}
            </p>
          ) : (
            filtered.map((tx) => {
              const enCours = isEnCours(tx.id)
              const tempsRestant = enCours ? getTempsRestant(tx.id) : ''

              return (
                <button
                  key={tx.id}
                  onClick={() => setSelected(tx)}
                  className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left ${enCours ? 'bg-amber-50/40' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-base flex-shrink-0">
                    {categorieEmoji[tx.categorie] || '💳'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900 truncate">{tx.libelle}</p>
                      {enCours && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                          <Clock size={10} />
                          {t('en_cours', langue).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatDate(tx.date)} · {tx.categorie}
                      {enCours && (
                        <span className="ml-2 text-amber-600 font-medium">{tempsRestant}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`flex items-center gap-1 font-semibold text-sm ${tx.type === 'credit' ? 'text-[#009B4E]' : enCours ? 'text-amber-700' : 'text-gray-800'}`}>
                      {tx.type === 'credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                      {tx.type === 'credit' ? '+' : '-'}{formatMontant(Math.abs(tx.montant))}
                    </span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Modal détails */}
      {selected && (
        <ModalDetails
          transaction={selected}
          enCours={isEnCours(selected.id)}
          tempsRestant={getTempsRestant(selected.id)}
          onClose={() => setSelected(null)}
          langue={langue}
        />
      )}
    </div>
  )
}