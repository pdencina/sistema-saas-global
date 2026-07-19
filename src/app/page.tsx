'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  Layers,
  LockKeyhole,
  Package,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'

const FEATURES = [
  {
    icon: <ShoppingCart size={22} />,
    title: 'Punto de Venta',
    desc: 'POS táctil, rápido e intuitivo. Descuentos, promociones y múltiples medios de pago.',
  },
  {
    icon: <Package size={22} />,
    title: 'Inventario inteligente',
    desc: 'Control de stock en tiempo real, alertas automáticas y transferencias entre sucursales.',
  },
  {
    icon: <Users size={22} />,
    title: 'Multi-sucursal',
    desc: 'Gestiona todas tus ubicaciones desde un solo lugar. Cada equipo ve solo lo suyo.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Reportes y analytics',
    desc: 'Ventas, márgenes, productos top y tendencias. Datos para tomar decisiones.',
  },
  {
    icon: <LockKeyhole size={22} />,
    title: 'Permisos granulares',
    desc: '60+ permisos configurables. Controla exactamente qué puede hacer cada rol.',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'WhatsApp integrado',
    desc: 'Notifica pedidos listos, envía links de pago y boletas por WhatsApp automáticamente.',
  },
]

const BUSINESS_TYPES = [
  { emoji: '🔧', name: 'Ferreterías' },
  { emoji: '☕', name: 'Cafeterías' },
  { emoji: '👕', name: 'Tiendas de ropa' },
  { emoji: '🛒', name: 'Almacenes' },
  { emoji: '💊', name: 'Farmacias' },
  { emoji: '🍕', name: 'Restaurantes' },
  { emoji: '📚', name: 'Librerías' },
  { emoji: '🎮', name: 'Tiendas tech' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '19.990',
    period: '/mes',
    desc: 'Para negocios que inician',
    features: ['1 sucursal', '3 usuarios', 'POS completo', 'Inventario', 'Reportes básicos'],
    cta: 'Comenzar gratis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '49.990',
    period: '/mes',
    desc: 'Para negocios en crecimiento',
    features: ['5 sucursales', '15 usuarios', 'Todo Starter +', 'WhatsApp', 'Analytics avanzados', 'Pagos con tarjeta'],
    cta: 'Probar 14 días gratis',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Conversemos',
    period: '',
    desc: 'Para operaciones grandes',
    features: ['Sucursales ilimitadas', 'Usuarios ilimitados', 'Todo Pro +', 'IA e insights', 'API personalizada', 'Soporte dedicado'],
    cta: 'Contactar ventas',
    highlighted: false,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 font-black text-black text-sm">
              VF
            </div>
            <span className="text-lg font-black tracking-tight">VentaFlow</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#negocios" className="hover:text-white transition">Negocios</a>
            <a href="#planes" className="hover:text-white transition">Planes</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              Ingresar
            </Link>
            <Link
              href="/login"
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-amber-400"
            >
              Probar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_50%)]" />

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 text-center lg:pt-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-sm text-amber-400">
            <Sparkles size={14} />
            Plataforma todo-en-uno para tu negocio
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
            Tu punto de venta{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              inteligente
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Gestiona ventas, inventario y sucursales desde una sola plataforma.
            Diseñado para negocios reales en Latinoamérica.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-7 py-4 text-base font-bold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:bg-amber-400"
            >
              Comenzar gratis
              <ArrowRight size={18} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-7 py-4 text-base font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              Ver features
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/5 pt-10">
            <div>
              <p className="text-3xl font-black text-amber-400">60+</p>
              <p className="mt-1 text-sm text-zinc-500">Permisos configurables</p>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400">Multi</p>
              <p className="mt-1 text-sm text-zinc-500">Sucursales nativo</p>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400">Real-time</p>
              <p className="mt-1 text-sm text-zinc-500">Inventario en vivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Todo lo que necesitas
            </h2>
            <p className="mt-3 text-zinc-400">
              Herramientas profesionales sin la complejidad de software enterprise.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-amber-500/20 hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section id="negocios" className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Para cualquier tipo de negocio
          </h2>
          <p className="mt-3 text-zinc-400">
            La plataforma se adapta a tu rubro automáticamente.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {BUSINESS_TYPES.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-3 text-sm font-semibold text-zinc-300"
              >
                <span className="text-lg">{b.emoji}</span>
                {b.name}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
            <div className="flex items-start gap-3">
              <Globe className="mt-0.5 shrink-0 text-amber-400" size={20} />
              <div className="text-left">
                <p className="font-bold text-amber-300">Terminología inteligente</p>
                <p className="mt-1 text-sm text-zinc-400">
                  La UI se adapta: una ferretería ve "Sucursales" y "Vendedores",
                  una cafetería ve "Locales" y "Cajeros". Todo automático.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planes" className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Planes simples, sin letra chica
            </h2>
            <p className="mt-3 text-zinc-400">
              Comienza gratis. Escala cuando crezcas.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-7 ${
                  plan.highlighted
                    ? 'border-amber-500/40 bg-amber-500/5 shadow-lg shadow-amber-500/10'
                    : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-black">
                    Popular
                  </div>
                )}

                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{plan.desc}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-black">
                    {plan.price.startsWith('C') ? '' : '$'}{plan.price}
                  </span>
                  <span className="text-sm text-zinc-500">{plan.period}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 size={15} className="shrink-0 text-amber-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-xl py-3 text-sm font-bold transition ${
                    plan.highlighted
                      ? 'bg-amber-500 text-black hover:bg-amber-400'
                      : 'border border-white/10 text-zinc-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Empieza hoy, sin tarjeta de crédito
          </h2>
          <p className="mt-4 text-zinc-400">
            14 días gratis con todas las funcionalidades. Sin compromisos.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-8 py-4 text-base font-bold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] hover:bg-amber-400"
          >
            Crear mi cuenta
            <Zap size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-black text-black">
              VF
            </div>
            <span className="text-sm font-bold text-zinc-400">VentaFlow</span>
          </div>
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} VentaFlow. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
