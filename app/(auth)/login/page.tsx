'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { verifierCredentials, verifier2FA, MOCK_CREDENTIALS } from '@/lib/auth'
import { mockUser } from '@/lib/data'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const { step, setStep, login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code2fa, setCode2fa] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 800))
    if (verifierCredentials(email, password)) {
      setStep('2fa')
    } else {
      setError('Email ou mot de passe incorrect')
    }
    setLoading(false)
  }

  async function handle2FA(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 600))
    if (verifier2FA(code2fa)) {
      login(mockUser)
      document.cookie = 'bnp-auth=true; path=/; max-age=86400'
      router.push('/dashboard')
    } else {
      setError('Code de vérification incorrect')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#009B4E] rounded-2xl mb-4">
          <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2yj9HjruLJALs2Ph8SXzD7l8pzycG0_ToAg&s" alt="BPN_Logo" /></span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">BNP Paribas</h1>
        <p className="text-sm text-gray-500 mt-1">Banque en ligne sécurisée</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {step === 'login' ? (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Connexion à votre espace</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Adresse e-mail"
                type="email"
                placeholder="exemple@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />
              <Input
                label="Mot de passe"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-xs text-[#009B4E] hover:underline -mt-2 block"
              >
                {showPass ? 'Masquer' : 'Afficher'} le mot de passe
              </button>
              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Se connecter
              </Button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-4">
              
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <Shield size={20} className="text-[#009B4E]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Vérification en 2 étapes</h2>
                <p className="text-xs text-gray-500">Code envoyé par SMS au +33 6 •• •• •• 42</p>
              </div>
            </div>
            <form onSubmit={handle2FA} className="space-y-4">
              <Input
                label="Code de vérification (6 chiffres)"
                type="text"
                placeholder="•• •• ••"
                maxLength={6}
                value={code2fa}
                onChange={(e) => setCode2fa(e.target.value)}
                icon={<Shield size={16} />}
                required
              />
              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Valider le code
              </Button>
              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                ← Retour
              </button>
            </form>
            
          </>
        )}
      </div>
    </div>
  )
}