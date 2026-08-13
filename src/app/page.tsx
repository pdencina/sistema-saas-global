'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  MessageCircle,
  Package,
  ShoppingCart,
  Smartphone,
  Users,
  ArrowUpRight,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Store,
  Layers,
  Receipt,
} from 'lucide-react'

// ─── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ from = 0, to, suffix = '', duration = 2 }: { from?: number; to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!isInView) return
    let start = from
    const increment = (to - from) / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, from, to, duration])

  return <span ref={ref}>{count.toLocaleString('es-CL')}{suffix}</span>
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: ShoppingCart,
    title: 'Punto de Venta',
    desc: 'Cobra rápido con cualquier medio de pago. Efectivo, tarjeta, transferencia o QR. Tu equipo vende sin fricciones.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Package,
    title: 'Inventario automático',
    desc: 'Cada venta descuenta stock al instante. Alertas cuando algo baja. Sin contar a mano nunca más.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'Reportes en tiempo real',
    desc: 'Ventas del día, semana, mes. Productos top. Ticket promedio. Todo sin tocar un Excel.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Users,
    title: 'Multi-sucursal',
    desc: 'Dos o veinte locales — un solo sistema. Cada equipo ve lo suyo, tú tienes la visión global.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Smartphone,
    title: 'WhatsApp nativo',
    desc: 'Avisa al cliente que su pedido está listo. Envía boletas y links de pago automáticamente.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Control total',
    desc: '60+ permisos configurables. El cajero solo cobra. El admin ve reportes. Tú decides quién hace qué.',
    color: 'from-rose-500 to-pink-500',
  },
]

const STEPS = [
  { number: '01', title: 'Creamos tu cuenta', desc: 'En 5 minutos tienes acceso a tu panel de gestión.' },
  { number: '02', title: 'Cargamos tus productos', desc: 'Importamos tu catálogo o lo creamos juntos.' },
  { number: '03', title: 'Empiezas a vender', desc: 'Tu equipo cobra desde el día uno. Sin capacitación larga.' },
]

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Splash */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2.5">
              <svg width="38" height="38" viewBox="0 0 120 120">
                <path className="vf-path" d="M14 20 L60 100 L106 20 L86 20 L60 66 L34 20 Z"/>
                <path className="vf-arrow" d="M60 66 L94 22 L94 40 L110 40 Z"/>
              </svg>
              <span className="vf-word text-xl font-extrabold" style={{ letterSpacing: '-0.02em' }}>
                <span style={{ color: '#1e3a5f' }}>Venta</span>
                <span style={{ color: '#2fbfa0' }}>Flow</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-white text-[#0f172a] overflow-x-hidden">
        {/* Nav */}
        <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-slate-100">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
            <Link href="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 120 120">
                <path style={{ fill: '#1e3a5f' }} d="M14 20 L60 100 L106 20 L86 20 L60 66 L34 20 Z"/>
                <path style={{ fill: '#2fbfa0' }} d="M60 66 L94 22 L94 40 L110 40 Z"/>
              </svg>
              <span className="text-base font-extrabold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                <span style={{ color: '#1e3a5f' }}>Venta</span><span style={{ color: '#2fbfa0' }}>Flow</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-8 text-[13px] font-medium text-slate-500 md:flex">
              <a href="#producto" className="transition hover:text-slate-900">Producto</a>
              <a href="#negocios" className="transition hover:text-slate-900">Negocios</a>
              <a href="#como-funciona" className="transition hover:text-slate-900">Cómo funciona</a>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-[13px] font-medium text-slate-500 transition hover:text-slate-900">
                Ingresar
              </Link>
              <a
                href="#contacto"
                className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-5 py-2 text-[13px] font-semibold text-white shadow-md shadow-blue-500/20 transition hover:shadow-lg hover:shadow-blue-500/30"
              >
                Solicitar demo
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section ref={heroRef} className="relative min-h-[100vh] flex items-center pt-20">
          {/* Background grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f910_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f910_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05),transparent_50%)]" />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative mx-auto max-w-6xl px-5 w-full">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 mb-8"
              >
                <Zap size={13} className="text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">Digitaliza tu negocio hoy</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              >
                Vende más,{' '}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
                  controla todo.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-500"
              >
                Punto de venta, inventario y gestión multi-local para negocios que quieren crecer.
                De un carrito de comida a una cadena de tiendas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              >
                <a
                  href="#contacto"
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02]"
                >
                  Quiero una demo gratis
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#producto"
                  className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                  Ver cómo funciona →
                </a>
              </motion.div>
            </div>

            {/* Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-16 max-w-4xl"
            >
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-2 shadow-2xl shadow-slate-200/50">
                <div className="rounded-xl bg-[#0f1216] p-4 sm:p-6">
                  {/* Fake dashboard UI */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-[10px] text-zinc-500">ventaflow.cl/dashboard</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-[9px] text-zinc-500">Ventas hoy</p>
                      <p className="text-sm font-bold text-white">$847.500</p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-[9px] text-zinc-500">Órdenes</p>
                      <p className="text-sm font-bold text-white">34</p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-[9px] text-zinc-500">Ticket promedio</p>
                      <p className="text-sm font-bold text-white">$24.926</p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-[9px] text-zinc-500">Productos activos</p>
                      <p className="text-sm font-bold text-white">128</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div className="col-span-2 rounded-lg bg-zinc-800/50 p-3 h-24">
                      <p className="text-[9px] text-zinc-500 mb-2">Ventas última semana</p>
                      <div className="flex items-end gap-1 h-12">
                        {[35, 52, 48, 70, 62, 85, 78].map((h, i) => (
                          <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-600 to-cyan-400" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-[9px] text-zinc-500 mb-2">Top producto</p>
                      <p className="text-xs font-medium text-white">Combo Clásico</p>
                      <p className="text-[10px] text-emerald-400 mt-1">+23% esta semana</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats bar */}
        <section className="border-y border-slate-100 bg-slate-50/50 py-12">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
              <div>
                <p className="text-3xl font-extrabold text-slate-900"><Counter to={60} suffix="+" /></p>
                <p className="mt-1 text-xs text-slate-500">Permisos configurables</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900"><Counter to={5} suffix=" min" /></p>
                <p className="mt-1 text-xs text-slate-500">Implementación</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900"><Counter to={8} suffix="+" /></p>
                <p className="mt-1 text-xs text-slate-500">Tipos de negocio</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900"><Counter to={99} suffix="%" duration={2.5} /></p>
                <p className="mt-1 text-xs text-slate-500">Uptime garantizado</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="producto" className="py-24">
          <div className="mx-auto max-w-6xl px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <p className="text-sm font-semibold text-[#14B8A6]">Producto</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Todo lo que necesitas para vender más y gestionar menos
              </h2>
              <p className="mt-4 text-base text-slate-500">
                Cada módulo está diseñado para que tu equipo pierda menos tiempo en el sistema y más tiempo atendiendo clientes.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/80 hover:-translate-y-1"
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg shadow-slate-200/50`}>
                    <f.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Negocios */}
        <section id="negocios" className="border-t border-slate-100 bg-gradient-to-b from-slate-50 to-white py-24">
          <div className="mx-auto max-w-6xl px-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-[#14B8A6]">Negocios</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Desde un carrito hasta una cadena de locales
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-slate-500">
                La plataforma se adapta a tu rubro automáticamente. Terminología, categorías y flujos — todo personalizado.
              </p>
            </motion.div>

            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { name: 'Food trucks', sub: 'Hamburguesas, completos' },
                { name: 'Almacenes', sub: 'Negocio de barrio' },
                { name: 'Ferreterías', sub: 'Multi-sucursal' },
                { name: 'Cafeterías', sub: 'Barra y delivery' },
                { name: 'Ropa y moda', sub: 'Tallas y colores' },
                { name: 'Restaurantes', sub: 'Cocina y salón' },
                { name: 'Minimarkets', sub: 'Alto volumen' },
                { name: 'Y más...', sub: 'Se adapta a ti' },
              ].map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 text-center transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-0.5"
                >
                  <p className="text-sm font-bold text-slate-800">{v.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{v.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="py-24">
          <div className="mx-auto max-w-6xl px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-sm font-semibold text-[#14B8A6]">Implementación</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Funcionando en el mismo día
              </h2>
            </motion.div>

            <div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                    <span className="text-lg font-extrabold bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-slate-100 bg-slate-50/50 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm font-semibold text-[#14B8A6]">Planes</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Tu tarifa se define en tu propuesta.
                </h2>
                <p className="mt-4 max-w-md text-base text-slate-500">
                  Cada negocio es distinto. Después de la demo recibes una propuesta clara con todo incluido. Sin sorpresas.
                </p>
                <a
                  href="#contacto"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:shadow-2xl hover:scale-[1.02]"
                >
                  Solicitar propuesta
                  <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#14B8A6]">Siempre incluido</p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    'POS con todos los medios de pago',
                    'Inventario en tiempo real',
                    'Reportes y analytics',
                    'Multi-sucursal nativo',
                    'Usuarios con permisos por rol',
                    'WhatsApp para notificaciones',
                    'Catálogo online público',
                    'Soporte + implementación',
                    'Sin contratos de permanencia',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="shrink-0 text-[#14B8A6]" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto" className="py-24">
          <div className="mx-auto max-w-2xl px-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] shadow-xl shadow-blue-500/20">
                <MessageCircle size={28} className="text-white" />
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                ¿Conversamos?
              </h2>
              <p className="mt-4 text-base text-slate-500">
                Te mostramos cómo VentaFlow se adapta a tu negocio en 15 minutos. Sin compromisos.
              </p>

              <a
                href="https://wa.me/56949616038?text=Hola%2C%20me%20interesa%20una%20demo%20de%20VentaFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition hover:shadow-2xl hover:scale-[1.02]"
              >
                Escribir por WhatsApp
                <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-100 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row">
            <div className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 120 120">
                <path style={{ fill: '#1e3a5f' }} d="M14 20 L60 100 L106 20 L86 20 L60 66 L34 20 Z"/>
                <path style={{ fill: '#2fbfa0' }} d="M60 66 L94 22 L94 40 L110 40 Z"/>
              </svg>
              <span className="text-xs font-extrabold" style={{ letterSpacing: '-0.02em' }}>
                <span style={{ color: '#1e3a5f' }}>Venta</span><span style={{ color: '#2fbfa0' }}>Flow</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} VentaFlow · ventaflow.cl
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
