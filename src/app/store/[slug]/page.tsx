'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import {
  Search,
  ShoppingBag,
  MessageCircle,
  Package,
  Filter,
  Loader2,
  MapPin,
  Star,
  CreditCard,
} from 'lucide-react'

interface StoreInfo {
  id: string
  name: string
  business_name: string | null
  store_description: string | null
  store_whatsapp: string | null
  store_banner_url: string | null
  city: string | null
}

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category_name: string | null
  stock: number
  sku: string | null
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n)

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' as const },
  }),
}

export default function StorePage() {
  const params = useParams()
  const slug = params.slug as string

  const [store, setStore] = useState<StoreInfo | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    loadStore()
  }, [slug])

  async function loadStore() {
    setLoading(true)
    const supabase = createClient()

    // Obtener campus por slug
    const { data: campus, error: campusErr } = await supabase
      .from('campus')
      .select('id, name, business_name, store_description, store_whatsapp, store_banner_url, city')
      .eq('slug', slug)
      .eq('store_enabled', true)
      .maybeSingle()

    if (campusErr || !campus) {
      setError('Tienda no encontrada')
      setLoading(false)
      return
    }

    setStore(campus)

    // Obtener productos con stock
    const { data: prods } = await supabase
      .from('products_with_stock')
      .select('id, name, description, price, image_url, category_name, stock, sku')
      .eq('campus_id', campus.id)
      .eq('active', true)
      .gt('stock', 0)
      .order('name')

    const productList = prods ?? []
    setProducts(productList)

    // Extraer categorías únicas
    const cats = Array.from(new Set(productList.map(p => p.category_name).filter(Boolean))) as string[]
    setCategories(cats.sort())

    setLoading(false)
  }

  // Filtrado
  const filtered = useMemo(() => {
    let result = products

    if (selectedCategory) {
      result = result.filter(p => p.category_name === selectedCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        (p.sku ?? '').toLowerCase().includes(q)
      )
    }

    return result
  }, [products, selectedCategory, search])

  function buildWhatsAppLink(product: Product) {
    const msg = encodeURIComponent(`Hola, me interesa el producto: ${product.name} (${fmt(product.price)}). ¿Tienen stock disponible?`)
    return `https://wa.me/?text=${msg}`
  }

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 size={32} className="animate-spin text-[#2563EB]" />
      </div>
    )
  }

  // Error
  if (error || !store) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <Package size={48} className="text-zinc-300" />
        <h1 className="mt-4 text-xl font-bold text-zinc-800">Tienda no encontrada</h1>
        <p className="mt-2 text-sm text-zinc-500">La URL que ingresaste no corresponde a ninguna tienda activa.</p>
      </div>
    )
  }

  const storeName = store.business_name ?? store.name

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e8edf3] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6]">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a2b4a]">{storeName}</p>
              {store.city && (
                <p className="flex items-center gap-1 text-[11px] text-[#6b7c99]">
                  <MapPin size={9} />{store.city}
                </p>
              )}
            </div>
          </div>

          {store.store_whatsapp && (
            <a
              href={`https://wa.me/?text=${encodeURIComponent('Hola, quiero hacer una consulta.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#20bd5a]"
            >
              <MessageCircle size={13} />
              Consultar
            </a>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#e8edf3] bg-gradient-to-br from-white to-[#f0f7ff] py-12">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-[#1a2b4a] sm:text-4xl"
          >
            {storeName}
          </motion.h1>
          {store.store_description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6b7c99]"
            >
              {store.store_description}
            </motion.p>
          )}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xs text-[#a3b1c6]"
          >
            {products.length} productos disponibles
          </motion.p>
        </div>
      </section>

      {/* Filtros */}
      <section className="border-b border-[#e8edf3] bg-white py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3b1c6]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-lg border border-[#e8edf3] bg-[#fafafa] py-2.5 pl-9 pr-4 text-sm text-[#1a2b4a] placeholder-[#a3b1c6] outline-none transition focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10"
            />
          </div>

          {/* Categorías */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                !selectedCategory
                  ? 'bg-[#1a2b4a] text-white'
                  : 'bg-[#f0f4f8] text-[#6b7c99] hover:bg-[#e4eaf1]'
              }`}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#1a2b4a] text-white'
                    : 'bg-[#f0f4f8] text-[#6b7c99] hover:bg-[#e4eaf1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de productos */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search size={40} className="text-[#d1dbe8]" />
              <p className="mt-3 text-sm font-medium text-[#6b7c99]">No se encontraron productos</p>
              <p className="mt-1 text-xs text-[#a3b1c6]">Prueba con otro término o categoría.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  custom={i}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8edf3] bg-white transition hover:border-[#2563EB]/20 hover:shadow-lg hover:shadow-[#2563EB]/5"
                >
                  {/* Imagen */}
                  <div className="relative aspect-square bg-[#f8fafc] p-4">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full rounded-xl object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f4f8] to-[#e8edf3]">
                        <Package size={32} className="text-[#c8d4e0]" />
                      </div>
                    )}

                    {/* Badge stock */}
                    {product.stock <= 5 && (
                      <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        Últimas unidades
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col p-4">
                    {product.category_name && (
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#14B8A6]">
                        {product.category_name}
                      </p>
                    )}
                    <h3 className="text-sm font-semibold leading-snug text-[#1a2b4a] line-clamp-2">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mt-1 text-xs leading-relaxed text-[#6b7c99] line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-auto pt-3">
                      <p className="text-lg font-bold text-[#1a2b4a]">{fmt(product.price)}</p>

                      <div className="mt-2 flex gap-2">
                        <a
                          href={buildWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] py-2 text-xs font-semibold text-white transition hover:bg-[#20bd5a]"
                        >
                          <MessageCircle size={12} />
                          WhatsApp
                        </a>
                        <button
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] py-2 text-xs font-semibold text-white transition hover:bg-[#1d4ed8]"
                          onClick={() => {
                            window.alert('Integración WebPay en proceso. Por ahora, compra por WhatsApp.')
                          }}
                        >
                          <CreditCard size={12} />
                          WebPay
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8edf3] py-8">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-xs text-[#a3b1c6]">
            {storeName} · Tienda potenciada por VentaFlow
          </p>
          <p className="mt-1 text-[10px] text-[#d1dbe8]">
            ventaflow.cl
          </p>
        </div>
      </footer>
    </main>
  )
}
