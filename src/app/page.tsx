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
  ChevronRight,
  ArrowUpRight,
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
    icon: <ShoppingCart size={20} />,
    title: 'Punto de Venta',
    desc: 'POS rápido y táctil. Descuentos, promociones, múltiples medios de pago. Tu equipo cobra en segundos.',
  },
  {
    icon: <Package size={20} />,
    title: 'Inventario en tiempo real',
    desc: 'Stock actualizado al instante. Alertas de quiebre, movimientos automáticos y transferencias entre locales.',
  },
  {
    icon: <Users size={20} />,
    title: 'Multi-sucursal nativo',
    desc: 'Gestiona todas tus ubicaciones desde un solo lugar. Cada equipo ve solo lo suyo, tú ves todo.',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Reportes y analytics',
    desc: 'Ventas, márgenes, productos top y tendencias. Datos claros para tomar decisiones rápidas.',
  },
  {
    icon: <LockKeyhole size={20} />,
    title: 'Permisos granulares',
    desc: '60+ permisos configurables por rol. Controla exactamente qué puede hacer cada persona.',
  },
  {
    icon: <Smartphone size={20} />,
    title: 'WhatsApp integrado',
    desc: 'Notifica pedidos listos, envía links de pago y boletas directo al WhatsApp de tu cliente.',
  },
]

const VERTICALS = [
  { name: 'Ferreterías', active: true },
  { name: 'Cafeterías', active: true },
  { name: 'Tiendas de ropa', active: true },
  { name: 'Almacenes', active: true },
  { name: 'Restaurantes', active: true },
  { name: 'Farmacias', active: true },
  { name: 'Librerías', active: true },
  { name: 'Bodegas', active: true },
]

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-4">
              {/* Logo V animada */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="VentaFlow" className="h-16 w-auto" />
              </motion.div>

              {/* Texto que aparece después */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
                className="text-sm font-semibold tracking-tight text-[#1a2b4a]"
              >
                VentaFlow
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                className="text-xs text-[#6b7c99]"
              >
                Gestiona. Vende. Crece.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    <main className="min-h-screen bg-white text-[#1a2b4a]">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-[#e8edf3] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="VentaFlow" className="h-8 w-auto" />
            <span className="text-sm font-bold tracking-tight text-[#1a2b4a]">VentaFlow</span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#6b7c99] md:flex">
            <a href="#producto" className="transition hover:text-[#1a2b4a]">Producto</a>
            <a href="#rubros" className="transition hover:text-[#1a2b4a]">Rubros</a>
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
              Hablemos
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-4 text-sm font-semibold tracking-wide text-[#14B8A6]"
          >
            Gestiona. Vende. Crece.
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[clamp(2.2rem,5.5vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-[#1a2b4a]"
          >
            Sistema de gestión comercial para{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
              PYMES
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#6b7c99]"
          >
            Punto de venta, inventario y operación multi-local en una sola plataforma.
            Sin curva de aprendizaje. Sin contratos. Implementación en minutos.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="#contacto"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:opacity-90"
            >
              Hablemos
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-[#6b7c99] transition hover:text-[#1a2b4a]"
            >
              Ya tengo cuenta
              <ArrowUpRight size={13} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12"
        >
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-[#d1dbe8]" />
        </motion.div>
      </section>

      {/* Features */}
      <section id="producto" className="border-t border-[#e8edf3] bg-[#f8fafc] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
              Producto
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-3xl">
              Todo lo que necesitas, nada que sobre.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 max-w-lg text-sm leading-relaxed text-[#6b7c99]">
              Herramientas profesionales diseñadas para negocios reales en Latinoamérica.
            </motion.p>
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
                className="rounded-2xl border border-[#e8edf3] bg-white p-6 transition hover:border-[#2563EB]/20 hover:shadow-lg hover:shadow-[#2563EB]/5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#14B8A6]/10 text-[#2563EB]">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-[#1a2b4a]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7c99]">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Verticals */}
      <section id="rubros" className="border-t border-[#e8edf3] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
              Rubros
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-3xl">
              Un sistema, cualquier negocio.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#6b7c99]">
              La plataforma se adapta automáticamente a tu rubro: terminología, categorías,
              flujos y permisos — todo configurado para que se sienta hecho a medida.
            </motion.p>
          </motion.div>

          {/* Grid de rubros */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {VERTICALS.map((v, i) => (
              <motion.div
                key={v.name}
                variants={fadeUp}
                custom={i * 0.3}
                className="group flex items-center justify-center rounded-2xl border border-[#e8edf3] bg-white px-5 py-4 text-center transition hover:border-[#2563EB]/20 hover:shadow-lg hover:shadow-[#2563EB]/5"
              >
                <span className="text-sm font-semibold text-[#1a2b4a]">{v.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Adaptación inteligente */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mx-auto mt-14 max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="overflow-hidden rounded-2xl border border-[#e8edf3] bg-gradient-to-br from-[#f8fafc] to-white"
            >
              <div className="border-b border-[#e8edf3] bg-white px-6 py-4">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-[#14B8A6]" />
                  <h3 className="text-sm font-bold text-[#1a2b4a]">Terminología inteligente</h3>
                </div>
                <p className="mt-1 text-xs text-[#6b7c99]">
                  La interfaz se adapta al lenguaje de tu industria automáticamente.
                </p>
              </div>
              <div className="divide-y divide-[#e8edf3]">
                {[
                  { rubro: 'Ferretería', terms: 'Sucursales · Vendedores · Clientes' },
                  { rubro: 'Cafetería', terms: 'Locales · Cajeros · Consumidores' },
                  { rubro: 'Tienda de ropa', terms: 'Tiendas · Asesores · Compradores' },
                ].map((item) => (
                  <div key={item.rubro} className="flex items-center justify-between px-6 py-3.5">
                    <span className="text-sm font-medium text-[#1a2b4a]">{item.rubro}</span>
                    <span className="rounded-full bg-[#f0f4f8] px-3 py-1 text-xs font-medium text-[#6b7c99]">
                      {item.terms}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planes" className="border-t border-[#e8edf3] bg-[#f8fafc] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            {/* Lado izquierdo */}
            <div>
              <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
                Planes
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#1a2b4a] sm:text-4xl">
                Una tarifa fija mensual,{' '}
                <span className="text-[#6b7c99]">a la medida de tu negocio.</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-md text-sm leading-relaxed text-[#6b7c99]">
                El precio depende de tu operación, tus canales y lo que necesitas gestionar.
                Después de la demo recibes una propuesta clara, con todo incluido.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="mt-8">
                <Link
                  href="#contacto"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:opacity-90"
                >
                  Quiero una demo
                  <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            {/* Lado derecho — lo que incluye */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="rounded-2xl border border-[#e8edf3] bg-white p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7c99]">
                Siempre incluido
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  'Punto de Venta completo con múltiples medios de pago',
                  'Inventario en tiempo real con alertas automáticas',
                  'Reportes de ventas, productos y rendimiento',
                  'Gestión multi-sucursal desde una sola vista',
                  'Usuarios ilimitados con permisos por rol',
                  'Notificaciones por email y voucher digital',
                  'WhatsApp integrado para clientes',
                  'Soporte e implementación incluidos',
                  'Sin contratos de permanencia',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#14B8A6]" />
                    <span className="text-sm leading-relaxed text-[#1a2b4a]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contacto" className="border-t border-[#e8edf3] py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6]">
            <MessageCircle size={24} className="text-white" />
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} className="text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-3xl">
            ¿Hablemos?
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-4 text-sm leading-relaxed text-[#6b7c99]">
            Agenda una demo personalizada de 15 minutos. Te mostramos cómo VentaFlow
            se adapta a tu negocio específico.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/56949616038?text=Hola%2C%20me%20interesa%20VentaFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:opacity-90"
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="VentaFlow" className="h-6 w-auto" />
            <span className="text-[11px] font-medium text-[#6b7c99]">ventaflow.cl</span>
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
