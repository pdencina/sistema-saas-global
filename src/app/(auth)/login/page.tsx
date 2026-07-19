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
    <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-[380px]">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-[#999] transition hover:text-[#111]"
        >
          <ArrowLeft size={12} />
          ventaflow.cl
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#111]">
              <span className="text-lg font-black text-white">V</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#111]">Bienvenido de vuelta</h1>
            <p className="mt-1 text-sm text-[#888]">Ingresa a tu cuenta de VentaFlow</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#999]">
                Email
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-black/[0.08] bg-[#fafafa] px-3.5 py-2.5 transition focus-within:border-[#111] focus-within:ring-1 focus-within:ring-[#111]/5">
                <Mail size={15} className="text-[#bbb]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@negocio.cl"
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-[#111] placeholder-[#ccc] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#999]">
                Contraseña
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-black/[0.08] bg-[#fafafa] px-3.5 py-2.5 transition focus-within:border-[#111] focus-within:ring-1 focus-within:ring-[#111]/5">
                <LockKeyhole size={15} className="text-[#bbb]" />
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
                  className="flex-1 bg-transparent text-sm text-[#111] placeholder-[#ccc] outline-none"
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
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#111] py-3 text-sm font-semibold text-white transition hover:bg-[#333] disabled:opacity-50"
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
              className="text-[11px] text-[#999] transition hover:text-[#111]"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[11px] text-[#ccc]">
          © {new Date().getFullYear()} VentaFlow
        </p>
      </div>
    </main>
  )
}
