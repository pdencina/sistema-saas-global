'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.04] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#BEFF00]">
              <span className="text-xs font-black text-black">V</span>
            </div>
            <span className="text-sm font-bold">ventaflow</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-zinc-500 transition hover:text-white">
              Ingresar
            </Link>
            <Link
              href="/login"
              className="rounded-md bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-zinc-200"
            >
              Empezar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — una sola frase */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="max-w-2xl text-center text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-tight">
          Vende, controla inventario y gestiona tu negocio desde un solo lugar.
        </h1>

        <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-zinc-500">
          POS, stock, reportes y multi-sucursal. Todo conectado.
          <br />
          Sin contratos. Sin instalaciones.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-lg bg-[#BEFF00] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d4ff4d]"
          >
            Probar gratis
            <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2">
          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-zinc-700" />
        </div>
      </section>

      {/* Feature 1 — POS */}
      <section className="border-t border-white/[0.04] py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-lg">
            <p className="text-xs font-medium uppercase tracking-widest text-[#BEFF00]">Punto de venta</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Cobra en segundos.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Interfaz rápida, búsqueda inteligente, múltiples medios de pago.
              Diseñado para que tu equipo no pierda tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 2 — Inventario */}
      <section className="border-t border-white/[0.04] py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="ml-auto max-w-lg text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-[#BEFF00]">Inventario</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Stock en tiempo real.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Alertas automáticas, movimientos, transferencias entre sucursales.
              Siempre sabes qué tienes y dónde.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 3 — Multi */}
      <section className="border-t border-white/[0.04] py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-lg">
            <p className="text-xs font-medium uppercase tracking-widest text-[#BEFF00]">Multi-local</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              N sucursales, una vista.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Cada local opera de forma independiente. Tú ves todo desde arriba.
              Permisos por rol, datos aislados por sucursal.
            </p>
          </div>
        </div>
      </section>

      {/* Adaptable */}
      <section className="border-t border-white/[0.04] py-32">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Se adapta a tu negocio.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            Ferretería, cafetería, tienda de ropa, almacén — la plataforma
            ajusta terminología, categorías y flujos automáticamente.
          </p>

          <div className="mx-auto mt-12 flex max-w-md flex-wrap justify-center gap-2">
            {['Ferreterías', 'Cafeterías', 'Retail', 'Almacenes', 'Tiendas de ropa', 'Restaurantes'].map((v) => (
              <span
                key={v}
                className="rounded-full border border-white/[0.06] px-4 py-1.5 text-xs text-zinc-400"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — simple */}
      <section className="border-t border-white/[0.04] py-32">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Desde $19.990/mes.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm text-zinc-500">
            14 días gratis. Sin tarjeta de crédito. Cancela cuando quieras.
          </p>

          <Link
            href="/login"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#BEFF00] text-[8px] font-black text-black">V</div>
            <span className="text-[11px] text-zinc-600">ventaflow.cl</span>
          </div>
          <span className="text-[11px] text-zinc-700">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  )
}
