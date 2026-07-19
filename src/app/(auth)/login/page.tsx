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
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[500px] rounded-full bg-[#BEFF00]/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[360px]">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 transition hover:text-zinc-300"
        >
          <ArrowLeft size={12} />
          ventaflow.cl
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 backdrop-blur">
          {/* Logo */}
          <div className="mb-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#BEFF00]">
              <span className="text-lg font-black text-black">V</span>
            </div>
            <h1 className="text-xl font-black tracking-tight">Bienvenido de vuelta</h1>
            <p className="mt-1 text-sm text-zinc-500">Ingresa a tu cuenta de VentaFlow</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Email
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 transition focus-within:border-[#BEFF00]/40">
                <Mail size={15} className="text-zinc-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@negocio.cl"
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Contraseña
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 transition focus-within:border-[#BEFF00]/40">
                <LockKeyhole size={15} className="text-zinc-600" />
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
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-700 outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/10 bg-red-500/[0.04] px-3 py-2.5 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#BEFF00] py-3 text-sm font-bold text-black transition hover:bg-[#d4ff4d] disabled:opacity-50"
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
          <div className="mt-5 flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-[11px] text-zinc-600 transition hover:text-[#BEFF00]"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[11px] text-zinc-700">
          © {new Date().getFullYear()} VentaFlow
        </p>
      </div>
    </main>
  )
}
