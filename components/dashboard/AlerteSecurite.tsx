'use client'
import { useState } from 'react'
import { ShieldAlert, X } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useLangueStore } from '@/store/useLangueStore'
import { formatMontant } from '@/lib/utils'
import { verifierCodeSecurite } from '@/lib/auth'

export default function AlerteSecurite() {
  const { alerteSecurite, setAlerteSecurite } = useAuthStore()
  const { langue } = useLangueStore()
  const [showForm, setShowForm] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!alerteSecurite?.active) return null

  const textes = {
    titre: langue === 'it' ? 'Controllo di sicurezza automatico' : 'Controle de securite automatique',
    desc: langue === 'it'
      ? `Un\'operazione di ${formatMontant(alerteSecurite.montant)} verso ${alerteSecurite.beneficiaire} ha attivato una verifica. Conferma la tua identita.`
      : `Une operation de ${formatMontant(alerteSecurite.montant)} vers ${alerteSecurite.beneficiaire} a declenche une verification.`,
    confirmer: langue === 'it' ? 'Conferma identita' : 'Confirmer mon identite',
    ignorer: langue === 'it' ? 'Ignora' : 'Ignorer',
    placeholder: langue === 'it' ? 'Codice di conferma' : 'Code de confirmation',
    erreur: langue === 'it' ? 'Codice non valido' : 'Code de confirmation invalide',
    valider: langue === 'it' ? (loading ? 'Verifica...' : 'Valida') : (loading ? 'Verification...' : 'Valider'),
  }

  async function handleValider(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    if (verifierCodeSecurite(code)) {
      setAlerteSecurite(null)
    } else {
      setError(textes.erreur)
    }
    setLoading(false)
  }

  return (
    <div className="rounded-xl p-4 space-y-3"
      style={{ background: '#fff8e1', border: '1px solid #f59e0b' }}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#fef3c7' }}>
          <ShieldAlert size={18} style={{ color: '#d97706' }} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: '#92400e' }}>{textes.titre}</p>
          <p className="text-xs mt-0.5" style={{ color: '#b45309' }}>{textes.desc}</p>
        </div>
      </div>

      {!showForm ? (
        <div className="flex gap-2 ml-12">
          <button onClick={() => setShowForm(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
            style={{ background: '#d97706' }}>
            {textes.confirmer}
          </button>
          <button onClick={() => setAlerteSecurite(null)}
            className="text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1"
            style={{ borderColor: '#d97706', color: '#d97706' }}>
            <X size={12} /> {textes.ignorer}
          </button>
        </div>
      ) : (
        <form onSubmit={handleValider} className="ml-12 space-y-2">
          <input
            type="text" inputMode="numeric" maxLength={6}
            placeholder={textes.placeholder}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="w-full border rounded-lg px-3 py-2 text-sm text-center font-mono tracking-widest focus:outline-none"
            style={{ borderColor: '#d97706' }}
          />
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          <button type="submit" disabled={code.length !== 6 || loading}
            className="w-full text-xs font-semibold py-2 rounded-lg text-white disabled:opacity-50"
            style={{ background: '#d97706' }}>
            {textes.valider}
          </button>
        </form>
      )}
    </div>
  )
}