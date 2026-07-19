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
  'Ferreterías',
  'Cafeterías',
  'Tiendas de ropa',
  'Almacenes',
  'Restaurantes',
  'Farmacias',
  'Librerías',
  'Bodegas',
]

const PLANS = [
  {
    name: 'Esencial',
    price: '39.990',
    desc: 'Todo lo que necesitas para operar',
    features: [
      '1 local',
      '5 usuarios',
      'POS completo',
      'Inventario en tiempo real',
      'Reportes de ventas',
      'Notificaciones por email',
      'Voucher digital por email',
      'Categorías y productos ilimitados',
    ],
    highlighted: false,
  },
  {
    name: 'Crecimiento',
    price: '79.990',
    desc: 'Para negocios que escalan',
    features: [
      '5 locales',
      '15 usuarios',
      'Todo Esencial +',
      'WhatsApp automático',
      'Pagos con tarjeta (SumUp)',
      'Transferencias entre locales',
      'Analytics avanzados',
      'Promociones y descuentos',
      'Sesiones de caja',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'A medida',
    desc: 'Operaciones sin límites',
    features: [
      'Locales ilimitados',
      'Usuarios ilimitados',
      'Todo Crecimiento +',
      'IA + Forecast de demanda',
      'API dedicada',
      'Onboarding personalizado',
      'Soporte prioritario',
      'SLA garantizado',
    ],
    highlighted: false,
  },
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
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            <div>
              <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
                Rubros
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-3xl">
                Un sistema, cualquier negocio.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-4 max-w-md text-sm leading-relaxed text-[#6b7c99]">
                La terminología, categorías y flujos se adaptan automáticamente a tu rubro.
                No es un sistema genérico — se siente hecho para ti.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="mt-8 rounded-xl border border-[#e8edf3] bg-[#f8fafc] p-5">
                <p className="mb-3 text-xs font-semibold text-[#6b7c99]">Ejemplo de adaptación:</p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7c99]">Ferretería</span>
                    <span className="font-medium text-[#1a2b4a]">"Sucursales" · "Vendedores"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7c99]">Cafetería</span>
                    <span className="font-medium text-[#1a2b4a]">"Locales" · "Cajeros"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7c99]">Tienda de ropa</span>
                    <span className="font-medium text-[#1a2b4a]">"Tiendas" · "Asesores"</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-2 gap-3"
            >
              {VERTICALS.map((v, i) => (
                <motion.div
                  key={v}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className="rounded-xl border border-[#e8edf3] bg-white px-5 py-4 text-sm font-medium text-[#1a2b4a] transition hover:border-[#14B8A6]/30 hover:shadow-sm"
                >
                  {v}
                </motion.div>
              ))}
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
            className="text-center"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#14B8A6]">
              Planes
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-3xl">
              Precio justo, sin letra chica.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 text-sm text-[#6b7c99]">
              Planes claros desde el primer día. Sin costos ocultos.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-3"
          >
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={i}
                className={`relative rounded-2xl border p-7 ${
                  plan.highlighted
                    ? 'border-[#2563EB]/30 bg-gradient-to-b from-[#1a2b4a] to-[#0f1a2e] text-white shadow-xl shadow-[#2563EB]/10'
                    : 'border-[#e8edf3] bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-3 py-0.5 text-[11px] font-bold text-white">
                    Popular
                  </div>
                )}

                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className={`mt-1 text-xs ${plan.highlighted ? 'text-blue-200' : 'text-[#6b7c99]'}`}>
                  {plan.desc}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  {plan.price !== 'A medida' ? (
                    <>
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className={`text-xs ${plan.highlighted ? 'text-blue-200' : 'text-[#6b7c99]'}`}>/mes</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{plan.price}</span>
                  )}
                </div>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-[#6b7c99]'}`}>
                      <CheckCircle2 size={14} className={`shrink-0 ${plan.highlighted ? 'text-[#14B8A6]' : 'text-[#2563EB]'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contacto"
                  className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white hover:opacity-90'
                      : 'bg-[#f0f4f8] text-[#1a2b4a] hover:bg-[#e4eaf1]'
                  }`}
                >
                  Contáctanos
                </Link>
              </motion.div>
            ))}
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
