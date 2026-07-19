'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LockKeyhole, Mail, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      if (!data.session) {
        setError('No se pudo iniciar sesión')
        setLoading(false)
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, active, role')
        .eq('id', data.session.user.id)
        .maybeSingle()

      if (profileError || !profile) {
        await supabase.auth.signOut()
        setError('No se pudo validar tu perfil. Contacta a un administrador.')
        setLoading(false)
        return
      }

      if (profile.active === false) {
        await supabase.auth.signOut()
        setError('Tu acceso fue deshabilitado. Contacta a un administrador.')
        setLoading(false)
        return
      }

      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 100)
    } catch (err: any) {
      setError(err?.message ?? 'Error inesperado al iniciar sesión')
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-[380px]">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-[#6b7c99] transition hover:text-[#1a2b4a]"
        >
          <ArrowLeft size={12} />
          ventaflow.cl
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-[#e8edf3] bg-white p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="VentaFlow" className="mb-4 h-10 w-auto" />
            <h1 className="text-xl font-bold tracking-tight text-[#1a2b4a]">Bienvenido de vuelta</h1>
            <p className="mt-1 text-sm text-[#6b7c99]">Ingresa a tu cuenta de VentaFlow</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#6b7c99]">
                Email
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-[#e8edf3] bg-[#f8fafc] px-3.5 py-2.5 transition focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/10">
                <Mail size={15} className="text-[#a3b1c6]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@negocio.cl"
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-[#1a2b4a] placeholder-[#a3b1c6] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#6b7c99]">
                Contraseña
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-[#e8edf3] bg-[#f8fafc] px-3.5 py-2.5 transition focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]/10">
                <LockKeyhole size={15} className="text-[#a3b1c6]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleLogin()
                    }
                  }}
                  className="flex-1 bg-transparent text-sm text-[#1a2b4a] placeholder-[#a3b1c6] outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#14B8A6] py-3 text-sm font-semibold text-white shadow-md shadow-[#2563EB]/15 transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Verificando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </div>

          {/* Links */}
          <div className="mt-5">
            <Link
              href="/forgot-password"
              className="text-[11px] text-[#6b7c99] transition hover:text-[#2563EB]"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[11px] text-[#a3b1c6]">
          © {new Date().getFullYear()} VentaFlow · Gestiona. Vende. Crece.
        </p>
      </div>
    </main>
  )
}
