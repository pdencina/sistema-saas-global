'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  LockKeyhole,
  Package,
  ShoppingCart,
  Smartphone,
  Users,
  Zap,
  ChevronRight,
} from 'lucide-react'

const FEATURES = [
  {
    icon: <ShoppingCart size={20} />,
    title: 'POS que vuela',
    desc: 'Interfaz táctil diseñada para velocidad. Busca, cobra y cierra en segundos.',
  },
  {
    icon: <Package size={20} />,
    title: 'Inventario vivo',
    desc: 'Stock actualizado en tiempo real. Alertas, movimientos y transferencias automáticas.',
  },
  {
    icon: <Users size={20} />,
    title: 'Multi-local nativo',
    desc: 'N sucursales, una plataforma. Cada equipo ve solo lo que necesita.',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Datos que importan',
    desc: 'No más Excel. Dashboards en vivo con lo que necesitas para decidir.',
  },
  {
    icon: <LockKeyhole size={20} />,
    title: 'Control total',
    desc: '60+ permisos. Decide exactamente quién puede ver, vender o modificar.',
  },
  {
    icon: <Smartphone size={20} />,
    title: 'WhatsApp nativo',
    desc: 'Boletas, links de pago y notificaciones directo al celular de tu cliente.',
  },
]

const VERTICALS = [
  { name: 'Ferreterías', active: true },
  { name: 'Cafeterías', active: true },
  { name: 'Tiendas de ropa', active: true },
  { name: 'Almacenes', active: true },
  { name: 'Restaurantes', active: false },
  { name: 'Librerías', active: false },
  { name: 'Farmacias', active: false },
  { name: 'Bodegas', active: false },
]

const PLANS = [
  {
    name: 'Starter',
    price: '19.990',
    desc: '1 local · 3 usuarios',
    features: ['POS completo', 'Inventario', 'Reportes básicos', 'Soporte email'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '49.990',
    desc: '5 locales · 15 usuarios',
    features: ['Todo Starter +', 'WhatsApp', 'Analytics', 'Pagos con tarjeta', 'Multi-local', 'Transferencias'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'A medida',
    desc: 'Sin límites',
    features: ['Todo Pro +', 'IA + Forecast', 'API dedicada', 'Onboarding personalizado', 'SLA garantizado'],
    highlighted: false,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white selection:bg-[#BEFF00]/20 selection:text-[#BEFF00]">


      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#09090b]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#BEFF00] transition group-hover:scale-105">
              <span className="text-sm font-black text-black">V</span>
            </div>
            <span className="text-base font-bold tracking-tight">ventaflow</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-zinc-500 md:flex">
            <a href="#producto" className="transition hover:text-white">Producto</a>
            <a href="#rubros" className="transition hover:text-white">Rubros</a>
            <a href="#planes" className="transition hover:text-white">Planes</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[13px] font-medium text-zinc-400 transition hover:text-white"
            >
              Ingresar
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-[#BEFF00] px-4 py-2 text-[13px] font-bold text-black transition hover:bg-[#d4ff4d]"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pb-32 pt-24 lg:pt-36">
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[800px] rounded-full bg-[#BEFF00]/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.95] tracking-tight">
              El sistema que tu
              <br />
              <span className="bg-gradient-to-r from-[#BEFF00] to-[#7FFF00] bg-clip-text text-transparent">
                negocio merece.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
              Punto de venta, inventario y gestión multi-local en una sola herramienta.
              Sin curva de aprendizaje. Sin contratos.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="group flex items-center gap-2 rounded-xl bg-[#BEFF00] px-7 py-3.5 text-sm font-bold text-black transition hover:bg-[#d4ff4d] hover:shadow-[0_0_40px_rgba(190,255,0,0.15)]"
              >
                Probar 14 días gratis
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </Link>
              <a
              href="#producto"
              className="text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              Conocer más
            </a>
            </div>
          </div>


        </div>
      </section>

      {/* Features */}
      <section id="producto" className="relative py-28">
        <div className="absolute inset-0 border-t border-white/[0.04]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#BEFF00]">Producto</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Menos clicks, más ventas.
            </h2>
            <p className="mt-3 max-w-lg text-zinc-500">
              Cada feature está diseñada para que tu equipo pierda menos tiempo en el sistema y más tiempo atendiendo.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 transition hover:border-[#BEFF00]/20 hover:bg-[#BEFF00]/[0.02]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition group-hover:border-[#BEFF00]/30 group-hover:text-[#BEFF00]">
                  {f.icon}
                </div>
                <h3 className="font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section id="rubros" className="relative py-28">
        <div className="absolute inset-0 border-t border-white/[0.04]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#BEFF00]">Rubros</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Un sistema,
                <br />cualquier negocio.
              </h2>
              <p className="mt-4 max-w-md text-zinc-500">
                La terminología, categorías y flujos se adaptan automáticamente a tu rubro.
                No es genérico — es específico para ti.
              </p>

              <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-3 text-xs font-semibold text-zinc-400">Ejemplo de adaptación:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Ferretería →</span>
                    <span className="font-medium">"Sucursales" · "Vendedores"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Cafetería →</span>
                    <span className="font-medium">"Locales" · "Cajeros"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Tienda de ropa →</span>
                    <span className="font-medium">"Tiendas" · "Asesores"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {VERTICALS.map((v) => (
                <div
                  key={v.name}
                  className={`rounded-xl border px-5 py-4 text-sm font-semibold ${
                    v.active
                      ? 'border-[#BEFF00]/20 bg-[#BEFF00]/[0.03] text-white'
                      : 'border-white/[0.04] bg-white/[0.01] text-zinc-500'
                  }`}
                >
                  {v.name}
                  {v.active && (
                    <p className="mt-1 text-xs font-normal text-[#BEFF00]/60">Demo disponible</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planes" className="relative py-28">
        <div className="absolute inset-0 border-t border-white/[0.04]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#BEFF00]">Planes</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Precio justo, sin sorpresas.
            </h2>
            <p className="mt-3 text-zinc-500">
              14 días gratis en cualquier plan. Sin tarjeta. Cancela cuando quieras.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-7 ${
                  plan.highlighted
                    ? 'border-[#BEFF00]/30 bg-[#BEFF00]/[0.03]'
                    : 'border-white/[0.04] bg-white/[0.01]'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-5 rounded-full bg-[#BEFF00] px-3 py-0.5 text-[11px] font-bold text-black">
                    Recomendado
                  </div>
                )}

                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="mt-1 text-xs text-zinc-500">{plan.desc}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  {plan.price !== 'A medida' ? (
                    <>
                      <span className="text-3xl font-black">${plan.price}</span>
                      <span className="text-xs text-zinc-500">/mes</span>
                    </>
                  ) : (
                    <span className="text-2xl font-black">{plan.price}</span>
                  )}
                </div>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                      <CheckCircle2 size={14} className="shrink-0 text-[#BEFF00]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-lg py-2.5 text-sm font-bold transition ${
                    plan.highlighted
                      ? 'bg-[#BEFF00] text-black hover:bg-[#d4ff4d]'
                      : 'border border-white/[0.08] text-zinc-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  Comenzar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28">
        <div className="absolute inset-0 border-t border-white/[0.04]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,255,0,0.03),transparent_50%)]" />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            ¿Listo para simplificar
            <br />tu operación?
          </h2>
          <p className="mt-4 text-zinc-500">
            En 5 minutos tienes todo configurado. Sin instalaciones, sin esperas.
          </p>
          <Link
            href="/login"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#BEFF00] px-8 py-4 text-sm font-bold text-black transition hover:bg-[#d4ff4d] hover:shadow-[0_0_60px_rgba(190,255,0,0.12)]"
          >
            Crear mi cuenta gratis
            <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#BEFF00] text-[10px] font-black text-black">
              V
            </div>
            <span className="text-xs font-semibold text-zinc-500">ventaflow.cl</span>
          </div>
          <p className="text-[11px] text-zinc-700">
            © {new Date().getFullYear()} VentaFlow. Santiago, Chile.
          </p>
        </div>
      </footer>
    </main>
  )
}
