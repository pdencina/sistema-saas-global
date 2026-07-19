'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
  Zap,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
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
    name: 'Starter',
    price: '19.990',
    desc: 'Para negocios que inician',
    features: ['1 local', '3 usuarios', 'POS completo', 'Inventario', 'Reportes básicos'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '49.990',
    desc: 'Para negocios en crecimiento',
    features: ['5 locales', '15 usuarios', 'WhatsApp', 'Analytics avanzados', 'Pagos con tarjeta', 'Transferencias'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'A medida',
    desc: 'Operaciones sin límites',
    features: ['Locales ilimitados', 'Usuarios ilimitados', 'IA + Forecast', 'API dedicada', 'Soporte prioritario'],
    highlighted: false,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111]">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-black/[0.04] bg-[#fafafa]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#111]">
              <span className="text-xs font-black text-white">V</span>
            </div>
            <span className="text-sm font-bold tracking-tight">ventaflow</span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] text-[#666] md:flex">
            <a href="#producto" className="transition hover:text-[#111]">Producto</a>
            <a href="#rubros" className="transition hover:text-[#111]">Rubros</a>
            <a href="#planes" className="transition hover:text-[#111]">Planes</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs text-[#666] transition hover:text-[#111]">
              Ingresar
            </Link>
            <Link
              href="#contacto"
              className="rounded-lg bg-[#111] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#333]"
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
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-[clamp(2.2rem,5.5vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-[#111]"
          >
            El sistema de gestión que tu negocio necesita.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#666]"
          >
            Punto de venta, inventario y operación multi-local en una sola plataforma.
            Sin curva de aprendizaje. Sin contratos. Implementación en minutos.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="#contacto"
              className="group flex items-center gap-2 rounded-xl bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333]"
            >
              Hablemos
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-[#666] transition hover:text-[#111]"
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
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-[#ddd]" />
        </motion.div>
      </section>

      {/* Features */}
      <section id="producto" className="border-t border-black/[0.04] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#999]">
              Producto
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Todo lo que necesitas, nada que sobre.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 max-w-lg text-sm leading-relaxed text-[#666]">
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
                className="rounded-2xl border border-black/[0.04] bg-white p-6 transition hover:shadow-lg hover:shadow-black/[0.03]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f5] text-[#444]">
                  {f.icon}
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#666]">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Verticals */}
      <section id="rubros" className="border-t border-black/[0.04] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            <div>
              <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#999]">
                Rubros
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Un sistema, cualquier negocio.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-4 max-w-md text-sm leading-relaxed text-[#666]">
                La terminología, categorías y flujos se adaptan automáticamente a tu rubro.
                No es un sistema genérico — se siente hecho para ti.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="mt-8 rounded-xl border border-black/[0.04] bg-white p-5">
                <p className="mb-3 text-xs font-semibold text-[#999]">Ejemplo de adaptación:</p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#999]">Ferretería</span>
                    <span className="font-medium text-[#111]">"Sucursales" · "Vendedores"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#999]">Cafetería</span>
                    <span className="font-medium text-[#111]">"Locales" · "Cajeros"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#999]">Tienda de ropa</span>
                    <span className="font-medium text-[#111]">"Tiendas" · "Asesores"</span>
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
                  className="rounded-xl border border-black/[0.04] bg-white px-5 py-4 text-sm font-medium text-[#333] transition hover:border-[#111]/10 hover:shadow-sm"
                >
                  {v}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planes" className="border-t border-black/[0.04] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-widest text-[#999]">
              Planes
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Precio justo, sin letra chica.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 text-sm text-[#666]">
              14 días gratis en cualquier plan. Sin tarjeta. Cancela cuando quieras.
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
                    ? 'border-[#111] bg-[#111] text-white'
                    : 'border-black/[0.04] bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-5 rounded-full bg-[#BEFF00] px-3 py-0.5 text-[11px] font-bold text-black">
                    Popular
                  </div>
                )}

                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className={`mt-1 text-xs ${plan.highlighted ? 'text-zinc-400' : 'text-[#999]'}`}>
                  {plan.desc}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  {plan.price !== 'A medida' ? (
                    <>
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className={`text-xs ${plan.highlighted ? 'text-zinc-400' : 'text-[#999]'}`}>/mes</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{plan.price}</span>
                  )}
                </div>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlighted ? 'text-zinc-300' : 'text-[#666]'}`}>
                      <CheckCircle2 size={14} className={`shrink-0 ${plan.highlighted ? 'text-[#BEFF00]' : 'text-[#111]'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contacto"
                  className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? 'bg-[#BEFF00] text-black hover:bg-[#d4ff4d]'
                      : 'bg-[#f5f5f5] text-[#111] hover:bg-[#eee]'
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
      <section id="contacto" className="border-t border-black/[0.04] py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111]">
            <MessageCircle size={24} className="text-[#BEFF00]" />
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} className="text-2xl font-bold tracking-tight sm:text-3xl">
            ¿Hablemos?
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-4 text-sm leading-relaxed text-[#666]">
            Agenda una demo personalizada de 15 minutos. Te mostramos cómo VentaFlow
            se adapta a tu negocio específico.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/56949616038?text=Hola%2C%20me%20interesa%20VentaFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333]"
            >
              Escribir por WhatsApp
              <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:hola@ventaflow.cl"
              className="text-sm font-medium text-[#666] transition hover:text-[#111]"
            >
              hola@ventaflow.cl
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#111] text-[8px] font-black text-white">V</div>
            <span className="text-[11px] text-[#999]">ventaflow.cl</span>
          </div>
          <span className="text-[11px] text-[#ccc]">© {new Date().getFullYear()} VentaFlow</span>
        </div>
      </footer>
    </main>
  )
}
