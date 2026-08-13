'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  LockKeyhole,
  MessageCircle,
  Package,
  ShoppingCart,
  Smartphone,
  Users,
  ArrowUpRight,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Store,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

const FEATURES = [
  {
    icon: <ShoppingCart size={22} />,
    title: 'Punto de Venta',
    desc: 'Cobra rápido con cualquier medio de pago. Efectivo, tarjeta, transferencia o QR.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: <Package size={22} />,
    title: 'Inventario automático',
    desc: 'El stock se actualiza solo con cada venta. Alertas cuando algo se está acabando.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Reportes claros',
    desc: 'Ventas del día, semana, mes. Productos top, ticket promedio. Sin Excel.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500',
  },
  {
    icon: <Users size={22} />,
    title: 'Multi-sucursal',
    desc: 'Dos o veinte locales — un solo sistema. Cada equipo ve lo suyo, tú ves todo.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'WhatsApp integrado',
    desc: 'Avisa al cliente que su pedido está listo. Envía boletas y links de pago automático.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-500',
  },
  {
    icon: <Shield size={22} />,
    title: 'Permisos por rol',
    desc: 'El cajero solo cobra. El admin ve reportes. Tú controlas todo. Simple.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-500',
  },
]

const TESTIMONIALS = [
  { name: 'Carrito de hamburguesas', quote: 'Antes anotaba todo en un cuaderno. Ahora sé exactamente cuánto vendí y qué me falta.', role: 'Food truck' },
  { name: 'Ferretería de barrio', quote: 'Mis 3 vendedores cobran desde el celular. Yo veo las ventas desde mi casa.', role: 'Retail' },
  { name: 'Tienda de ropa', quote: 'Control de tallas, colores y stock por sucursal. Antes era un caos.', role: 'Moda' },
]

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)

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
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2.5">
              <svg width="40" height="40" viewBox="0 0 120 120">
                <path
                  className="animate-[vf-draw_1.1s_ease_forwards]"
                  style={{ stroke: '#1e3a5f', strokeWidth: 4, fill: '#1e3a5f', fillOpacity: 0, strokeDasharray: 400, strokeDashoffset: 400 }}
                  d="M14 20 L60 100 L106 20 L86 20 L60 66 L34 20 Z"
                />
                <path
                  className="animate-[vf-draw_0.6s_ease_forwards_0.7s]"
                  style={{ stroke: '#2fbfa0', strokeWidth: 4, fill: '#2fbfa0', fillOpacity: 0, strokeDasharray: 160, strokeDashoffset: 160 }}
                  d="M60 66 L94 22 L94 40 L110 40 Z"
                />
              </svg>
              <span className="text-xl font-extrabold tracking-tight" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 1.5s' }}>
                <span style={{ color: '#1e3a5f' }}>Venta</span>
                <span style={{ color: '#2fbfa0' }}>Flow</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-white text-[#1a2b4a]">
        {/* Nav */}
        <header className="fixed top-0 z-50 w-full border-b border-[#e8edf3] bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ventaflow-logo-dark.png" alt="VentaFlow" className="h-9 w-auto" />
            </Link>

            <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#6b7c99] md:flex">
              <a href="#producto" className="transition hover:text-[#1a2b4a]">Producto</a>
              <a href="#negocios" className="transition hover:text-[#1a2b4a]">Negocios</a>
              <a href="#planes" className="transition hover:text-[#1a2b4a]">Planes</a>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-xs font-medium text-[#6b7c99] transition hover:text-[#1a2b4a]">
                Ingresar
              </Link>
              <Link
                href="#contacto"
                className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
              >
                Solicitar demo
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#2563EB]/5 to-[#14B8A6]/5 blur-3xl" />
            <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-[#14B8A6]/5 to-[#2563EB]/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-5">
            <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
              <motion.div variants={fadeUp} custom={0} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/5 px-4 py-1.5">
                <Zap size={13} className="text-[#14B8A6]" />
                <span className="text-xs font-medium text-[#14B8A6]">Tu negocio digitalizado en minutos</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              >
                El sistema que hace{' '}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
                  crecer
                </span>{' '}
                tu negocio
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#6b7c99] sm:text-lg"
              >
                Da igual si tienes un carrito de comida, un almacén, una ferretería o una cadena de tiendas.
                VentaFlow se adapta a ti.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              >
                <Link
                  href="#contacto"
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:shadow-xl hover:shadow-[#2563EB]/30"
                >
                  Quiero una demo gratis
                  <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/store/soundwave"
                  className="flex items-center gap-2 rounded-xl border border-[#e8edf3] bg-white px-7 py-3.5 text-sm font-semibold text-[#1a2b4a] transition hover:border-[#2563EB]/30 hover:shadow-md"
                >
                  <Store size={15} />
                  Ver tienda demo
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-[#a3b1c6]"
              >
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#14B8A6]" />Sin contratos</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#14B8A6]" />Implementación en el día</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#14B8A6]" />Soporte incluido</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Negocios que usan VentaFlow */}
        <section id="negocios" className="border-t border-[#e8edf3] bg-gradient-to-b from-[#f8fafc] to-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center"
            >
              <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
                Para todo tipo de negocio
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Desde un carrito hasta una cadena de tiendas
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { name: 'Hamburguesas', sub: 'Food trucks y carritos' },
                { name: 'Almacenes', sub: 'Negocio de barrio' },
                { name: 'Ferreterías', sub: 'Multi-sucursal' },
                { name: 'Cafeterías', sub: 'Barra y delivery' },
                { name: 'Tiendas de ropa', sub: 'Tallas y colores' },
                { name: 'Restaurantes', sub: 'Cocina y salón' },
                { name: 'Farmacias', sub: 'Stock crítico' },
                { name: 'Minimarkets', sub: 'Alto volumen' },
              ].map((v, i) => (
                <motion.div
                  key={v.name}
                  variants={fadeUp}
                  custom={i * 0.3}
                  className="group rounded-2xl border border-[#e8edf3] bg-white p-4 text-center transition hover:border-[#2563EB]/20 hover:shadow-lg hover:shadow-[#2563EB]/5"
                >
                  <p className="text-sm font-semibold text-[#1a2b4a]">{v.name}</p>
                  <p className="mt-0.5 text-[11px] text-[#a3b1c6]">{v.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section id="producto" className="border-t border-[#e8edf3] py-24">
          <div className="mx-auto max-w-6xl px-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
                Producto
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 max-w-lg text-2xl font-bold tracking-tight sm:text-3xl">
                Todo lo que necesitas para vender más y preocuparte menos
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  custom={i}
                  className="group rounded-2xl border border-[#e8edf3] bg-white p-6 transition hover:border-[#2563EB]/20 hover:shadow-xl hover:shadow-[#2563EB]/5"
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} ${f.iconColor}`}>
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#1a2b4a]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7c99]">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Social proof / Testimonials */}
        <section className="border-t border-[#e8edf3] bg-[#f8fafc] py-20">
          <div className="mx-auto max-w-6xl px-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center"
            >
              <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
                Casos de uso
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Negocios reales, resultados reales
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mt-12 grid gap-5 sm:grid-cols-3"
            >
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl border border-[#e8edf3] bg-white p-6"
                >
                  <p className="text-sm italic leading-relaxed text-[#6b7c99]">"{t.quote}"</p>
                  <div className="mt-4 border-t border-[#e8edf3] pt-4">
                    <p className="text-sm font-semibold text-[#1a2b4a]">{t.name}</p>
                    <p className="text-xs text-[#a3b1c6]">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing — tarifa a medida */}
        <section id="planes" className="border-t border-[#e8edf3] py-24">
          <div className="mx-auto max-w-6xl px-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid items-center gap-14 lg:grid-cols-2"
            >
              <div>
                <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
                  Planes
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Tu tarifa se define{' '}
                  <span className="text-[#6b7c99]">en tu propuesta.</span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-md text-sm leading-relaxed text-[#6b7c99]">
                  Cada operación es distinta. Tu tarifa depende de tu volumen, sucursales y lo que necesitas.
                  Después de la demo recibes una propuesta clara con todo incluido.
                </motion.p>
                <motion.div variants={fadeUp} custom={3} className="mt-8">
                  <Link
                    href="#contacto"
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:shadow-xl"
                  >
                    Quiero una demo
                    <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                custom={2}
                className="rounded-2xl border border-[#e8edf3] bg-white p-8 shadow-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#14B8A6]">
                  Siempre incluido
                </p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    'POS completo con todos los medios de pago',
                    'Inventario en tiempo real con alertas',
                    'Reportes de ventas y rendimiento',
                    'Multi-sucursal desde una sola cuenta',
                    'Usuarios y roles con permisos granulares',
                    'Notificaciones y voucher por email',
                    'WhatsApp integrado para tus clientes',
                    'Tienda online con catálogo público',
                    'Soporte e implementación incluidos',
                    'Sin contratos — cancela cuando quieras',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#14B8A6]" />
                      <span className="text-sm text-[#1a2b4a]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Contacto */}
        <section id="contacto" className="border-t border-[#e8edf3] bg-gradient-to-b from-[#f8fafc] to-white py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-2xl px-5 text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] shadow-lg shadow-[#2563EB]/20">
              <MessageCircle size={24} className="text-white" />
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1} className="text-2xl font-bold tracking-tight sm:text-3xl">
              ¿Conversamos?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-sm leading-relaxed text-[#6b7c99]">
              Te mostramos cómo VentaFlow se adapta a tu negocio en 15 minutos.
              Sin compromisos, sin letra chica.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://wa.me/56949616038?text=Hola%2C%20me%20interesa%20una%20demo%20de%20VentaFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:shadow-xl"
              >
                Escribir por WhatsApp
                <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="mailto:hola@ventaflow.cl"
                className="text-sm font-medium text-[#6b7c99] transition hover:text-[#1a2b4a]"
              >
                hola@ventaflow.cl
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e8edf3] py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ventaflow-logo-dark.png" alt="VentaFlow" className="h-6 w-auto" />
            </div>
            <p className="text-[11px] text-[#a3b1c6]">
              © {new Date().getFullYear()} VentaFlow · Sistema de gestión comercial para PYMES
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
