'use client'
import { useState } from 'react'
import { Carte } from '@/types'
import { formatMontant } from '@/lib/utils'
import { Lock, Unlock } from 'lucide-react'
import { useLangueStore } from '@/store/useLangueStore'
import { t, Langue } from '@/lib/i18n'


function PuceEMV() {
  return (
    <svg viewBox="0 0 48 38" width="44" height="34">
      <defs>
        <linearGradient id="chipGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c84a"/>
          <stop offset="40%" stopColor="#f0d060"/>
          <stop offset="100%" stopColor="#c8a830"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="48" height="38" rx="4" fill="url(#chipGold)" stroke="#b8941a" strokeWidth="0.8"/>
      <rect x="3" y="4" width="13" height="10" rx="1.5" fill="#c8a830" stroke="#a07820" strokeWidth="0.5"/>
      <rect x="3" y="16" width="13" height="10" rx="1.5" fill="#c8a830" stroke="#a07820" strokeWidth="0.5"/>
      <rect x="3" y="28" width="13" height="7" rx="1.5" fill="#c8a830" stroke="#a07820" strokeWidth="0.5"/>
      <rect x="32" y="4" width="13" height="10" rx="1.5" fill="#c8a830" stroke="#a07820" strokeWidth="0.5"/>
      <rect x="32" y="16" width="13" height="10" rx="1.5" fill="#c8a830" stroke="#a07820" strokeWidth="0.5"/>
      <rect x="32" y="28" width="13" height="7" rx="1.5" fill="#c8a830" stroke="#a07820" strokeWidth="0.5"/>
      <rect x="17" y="0" width="14" height="38" fill="url(#chipGold)"/>
      <line x1="24" y1="0" x2="24" y2="38" stroke="#b8941a" strokeWidth="0.5"/>
      <rect x="14" y="8" width="20" height="16" rx="2" fill="#2a1a08" stroke="#8a6010" strokeWidth="0.5"/>
      <rect x="16" y="10" width="5" height="4" rx="0.5" fill="#3a2a10"/>
      <rect x="23" y="10" width="5" height="4" rx="0.5" fill="#3a2a10"/>
      <rect x="16" y="16" width="5" height="4" rx="0.5" fill="#3a2a10"/>
      <rect x="23" y="16" width="5" height="4" rx="0.5" fill="#3a2a10"/>
      <circle cx="24" cy="16" r="2" fill="#f0d060" opacity="0.7"/>
    </svg>
  )
}

function NFC() {
  return (
    <svg viewBox="0 0 28 32" width="22" height="26">
      <circle cx="4" cy="16" r="2.5" fill="rgba(255,255,255,0.85)"/>
      <path d="M10 8 A10 10 0 0 1 10 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 4 A16 16 0 0 1 15 28" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M20 1 A22 22 0 0 1 20 31" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function LogoBNP() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: '#009B4E' }}>
          <img src="https://images.icon-icons.com/2699/PNG/512/bnpparibas_logo_icon_168503.png" alt="BNP Paribas" className="w-15 h-9"/>
      </div>
      <div>
        <p className="text-white font-bold text-[10px] tracking-widest leading-tight">BNP PARIBAS</p>
      </div>
    </div>
  )
}

function LogoCB() {
  return (
    <div className="flex items-center justify-center rounded px-2 py-1"
      style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
      <span className="font-bold text-sm tracking-widest text-white" style={{ fontStyle: 'italic' }}>
        CB
      </span>
    </div>
  )
}

function TexturePois() {
  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="2.5" fill="rgba(255,255,255,0.12)"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    </svg>
  )
}

function CarteVerte({ carte, bloquee, langue }: { carte: Carte; bloquee: boolean; langue: Langue }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden select-none"
      style={{
        height: '215px',
        background: bloquee
          ? 'linear-gradient(135deg, #6b7280, #9ca3af)'
          : 'linear-gradient(145deg, #006635 0%, #009B4E 40%, #00b359 65%, #007a3d 100%)',
        boxShadow: bloquee
          ? '0 8px 24px rgba(0,0,0,0.2)'
          : '0 8px 32px rgba(0,100,50,0.45)',
      }}
    >
      <TexturePois />

      {/* Reflet haut */}
      <div className="absolute top-0 left-0 right-0 h-1/3 opacity-10"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)' }}/>

      {/* Logo BNP haut gauche */}
      <div className="absolute top-4 left-4">
        <LogoBNP />
      </div>

      {/* CB haut droite */}
      <div className="absolute top-4 right-4">
        <LogoCB />
      </div>

      {/* Puce + NFC */}
      <div className="absolute top-[62px] left-4 flex items-center gap-3">
        <PuceEMV />
        <NFC />
      </div>

      {/* Numéro carte */}
      <div className="absolute bottom-[58px] left-4">
        <p className="text-white font-mono text-sm tracking-[0.2em] font-semibold"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          {carte.numero}
        </p>
      </div>

      {/* Infos bas */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <p className="text-green-200 text-[9px] uppercase tracking-wider mb-0.5">
            {t('credit', langue)} · {t('expire', langue)} {carte.expiration}
          </p>
          <p className="text-white text-xs font-semibold tracking-widest">
            {carte.titulaire}
          </p>
        </div>
        <span className="text-white font-bold text-2xl italic"
          style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          VISA
        </span>
      </div>

      {bloquee && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl backdrop-blur-sm">
          <div className="text-center">
            <Lock size={28} className="text-white mx-auto mb-1"/>
            <span className="text-white font-bold text-sm tracking-widest">{t('carte_bloquee', langue)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function CarteGrise({ carte, bloquee, langue }: { carte: Carte; bloquee: boolean; langue: Langue }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden select-none"
      style={{
        height: '215px',
        background: bloquee
          ? 'linear-gradient(135deg, #6b7280, #9ca3af)'
          : 'linear-gradient(145deg, #2d3748 0%, #4a5568 40%, #5a6a7a 65%, #374151 100%)',
        boxShadow: bloquee
          ? '0 8px 24px rgba(0,0,0,0.2)'
          : '0 8px 32px rgba(50,60,80,0.5)',
      }}
    >
      <TexturePois />

      <div className="absolute top-0 left-0 right-0 h-1/3 opacity-10"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)' }}/>

      <div className="absolute top-4 left-4">
        <LogoBNP />
      </div>

      <div className="absolute top-4 right-4">
        <LogoCB />
      </div>

      <div className="absolute top-[62px] left-4 flex items-center gap-3">
        <PuceEMV />
        <NFC />
      </div>

      <div className="absolute bottom-[58px] left-4">
        <p className="text-white font-mono text-sm tracking-[0.2em] font-semibold"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          {carte.numero}
        </p>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <p className="text-gray-300 text-[9px] uppercase tracking-wider mb-0.5">
            {t('credit', langue)} · {t('expire', langue)} {carte.expiration}
          </p>
          <p className="text-white text-xs font-semibold tracking-widest">
            {carte.titulaire}
          </p>
        </div>
        <span className="text-white font-bold text-2xl italic"
          style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          VISA
        </span>
      </div>

      {bloquee && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl backdrop-blur-sm">
          <div className="text-center">
            <Lock size={28} className="text-white mx-auto mb-1"/>
            <span className="text-white font-bold text-sm tracking-widest">{t('carte_bloquee', langue)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CarteVisuelle({ carte }: { carte: Carte }) {
  const [bloquee, setBloquee] = useState(carte.statut === 'bloquee')
  const { langue } = useLangueStore()
  const pct = Math.round((carte.depensesMois / carte.plafond) * 100)
  const isSeconde = carte.type === 'mastercard'

  

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-5">

      {isSeconde ? (
        <CarteGrise carte={carte} bloquee={bloquee} langue={langue} />
      ) : (
        <CarteVerte carte={carte} bloquee={bloquee} langue={langue} />
      )}

      {/* Plafond */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>{langue === 'it' ? 'Spese questo mese' : 'Depenses ce mois'}</span>
          <span>{formatMontant(carte.depensesMois)} / {formatMontant(carte.plafond)}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${Math.min(pct, 100)}%`,
              background: pct > 80
                ? '#ef4444'
                : isSeconde
                  ? 'linear-gradient(90deg, #4a5568, #5a6a7a)'
                  : 'linear-gradient(90deg, #006635, #009B4E)',
            }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {pct}% {langue === 'it' ? 'del limite usato' : 'du plafond utilise'}
        </p>
      </div>

      {/* Bouton */}
      <button
        onClick={() => setBloquee(!bloquee)}
        className="w-full flex items-center justify-center gap-2 font-medium py-2.5 rounded-xl transition-colors text-sm text-white"
        style={{
          background: bloquee
            ? '#009B4E'
            : '#ef4444',
        }}
      >
        {bloquee
          ? <><Unlock size={16}/> {t('debloquer', langue)}</>
          : <><Lock size={16}/> {t('bloquer', langue)}</>
        }
      </button>
    </div>
  )
}