'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LockKeyhole, Mail, ArrowLeft } from 'lucide-react'
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
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.04),transparent_50%)]" />

      <div className="relative w-full max-w-sm">
        {/* Back to home */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 shadow-2xl backdrop-blur">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-xl font-black text-black shadow-lg shadow-amber-500/20">
              VF
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">VentaFlow</h1>
            <p className="mt-1 text-sm text-zinc-500">Ingresa a tu cuenta</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-400">
                Correo electrónico
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-amber-500/50">
                <Mail size={16} className="text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@negocio.cl"
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-400">
                Contraseña
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-amber-500/50">
                <LockKeyhole size={16} className="text-zinc-500" />
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
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-600 outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </div>

          {/* Forgot password */}
          <div className="mt-5 text-center">
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-500 transition hover:text-amber-400"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} VentaFlow · ventaflow.cl
        </p>
      </div>
    </main>
  )
}
