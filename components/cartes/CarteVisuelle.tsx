'use client'
import { useState } from 'react'
import { Carte } from '@/types'
import { formatMontant } from '@/lib/utils'
import { Lock, Unlock } from 'lucide-react'
import Button from '@/components/ui/Button'

function LogoBNP() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-8 h-8 bg-[#009B4E] rounded flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="white">
          <path d="M6 8 L14 16 L6 24 M10 8 L18 16 L10 24 M14 8 L22 16 L14 24" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <div className="leading-tight">
        <p className="text-white font-bold text-xs tracking-wide">BNP PARIBAS</p>
        <div className="w-full h-px bg-white/60 my-0.5" />
        <p className="text-white/80 text-[9px] tracking-widest font-medium">FORTIS</p>
      </div>
    </div>
  )
}

function LogoMaestro() {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex">
        <div className="w-7 h-7 rounded-full bg-red-500 opacity-90" />
        <div className="w-7 h-7 rounded-full bg-blue-500 opacity-90 -ml-3" />
      </div>
      <p className="text-white/70 text-[8px] tracking-wider">maestro.</p>
    </div>
  )
}

function LogoBancontact() {
  return (
    <div className="bg-white rounded px-1.5 py-1 flex items-center gap-1">
      <div className="w-5 h-3 relative">
        <div className="absolute inset-0 bg-[#005498] rounded-sm" />
        <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#FFCC00] rounded-r-sm" />
        <div className="absolute left-1 top-0.5 bottom-0.5 w-1.5 bg-white rounded-sm" style={{clipPath: 'polygon(0 0, 100% 50%, 0 100%)'}} />
      </div>
      <span className="text-[7px] font-bold text-gray-700">Bancontact</span>
    </div>
  )
}

function PuceChip() {
  return (
    <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md border border-yellow-500/40 grid grid-cols-3 grid-rows-3 gap-px p-0.5">
      {Array.from({length: 9}).map((_, i) => (
        <div key={i} className={`rounded-sm ${i === 4 ? 'bg-yellow-300' : 'bg-yellow-500/60'}`} />
      ))}
    </div>
  )
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/80" fill="none">
      <path d="M5 12.5c1.9-1.9 4.5-3 7-3s5.1 1.1 7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8.5 16c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="19" r="1" fill="currentColor"/>
    </svg>
  )
}

export default function CarteVisuelle({ carte }: { carte: Carte }) {
  const [bloquee, setBloquee] = useState(carte.statut === 'bloquee')
  const pct = Math.round((carte.depensesMois / carte.plafond) * 100)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-5">

      {/* ── Carte visuelle style BNP Paribas Fortis ── */}
      <div
        className="relative rounded-2xl overflow-hidden select-none"
        style={{
          background: bloquee
            ? 'linear-gradient(135deg, #6b7280, #9ca3af)'
            : 'linear-gradient(135deg, #4a5568 0%, #5a6a7a 40%, #4a5c6a 100%)',
          height: '200px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Reflet subtil */}
        <div className="absolute inset-0 opacity-10"
          style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)'}} />

        {/* Ligne décorative */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009B4E] via-[#00c060] to-[#009B4E]" />

        {/* Header : Logo BNP + Maestro */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <LogoBNP />
          <LogoMaestro />
        </div>

        {/* Puce + Sans contact */}
        <div className="absolute top-16 left-4 flex items-center gap-3">
          <PuceChip />
          <div className="flex items-center gap-1">
            <span className="text-white/80 text-xs font-medium">Debit</span>
            <WifiIcon />
          </div>
        </div>

        {/* Bancontact */}
        <div className="absolute top-16 right-4">
          <LogoBancontact />
        </div>

        {/* Nom titulaire */}
        <div className="absolute bottom-10 left-4 right-4">
          <p className="text-white font-semibold text-sm tracking-wide">
            {carte.titulaire}
          </p>
        </div>

        {/* Infos bas de carte */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-[9px] w-10">card</span>
              <span className="text-white/80 font-mono text-[10px]">{carte.numero}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-[9px] w-10">account</span>
              <span className="text-white/80 font-mono text-[10px]">FR76 **** **** {carte.numero.slice(-4)}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[8px]">expires end</p>
            <p className="text-white font-mono text-xs">{carte.expiration}</p>
          </div>
        </div>

        {/* Overlay bloquée */}
        {bloquee && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl backdrop-blur-sm">
            <div className="text-center">
              <Lock size={28} className="text-white mx-auto mb-1" />
              <span className="text-white font-bold text-sm">CARTE BLOQUÉE</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Plafond ── */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Dépenses ce mois</span>
          <span>{formatMontant(carte.depensesMois)} / {formatMontant(carte.plafond)}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${pct > 80 ? 'bg-red-500' : 'bg-[#009B4E]'}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{pct}% du plafond utilisé</p>
      </div>

      {/* ── Bouton ── */}
      <Button
        variant={bloquee ? 'primary' : 'danger'}
        className="w-full"
        onClick={() => setBloquee(!bloquee)}
      >
        {bloquee
          ? <><Unlock size={16} className="mr-2" />Débloquer la carte</>
          : <><Lock size={16} className="mr-2" />Bloquer la carte</>
        }
      </Button>
    </div>
  )
}