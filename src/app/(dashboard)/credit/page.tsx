'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useCampusSelector } from '@/lib/hooks/use-campus-selector'
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Phone,
  DollarSign,
  User,
  Filter,
  Loader2,
  Receipt,
} from 'lucide-react'
import { toast } from 'sonner'

interface CreditOrder {
  id: string
  order_number: number
  total: number
  amount_paid: number
  balance_due: number
  payment_status: string
  credit_client_name: string | null
  credit_client_phone: string | null
  credit_due_date: string | null
  credit_notes: string | null
  created_at: string
  campus_id: string | null
}

type FilterStatus = 'all' | 'credit' | 'partial'

export default function CreditPage() {
  const supabase = createClient()
  const { selectedCampusId } = useCampusSelector()

  const [orders, setOrders] = useState<CreditOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [markingPaid, setMarkingPaid] = useState<string | null>(null)

  useEffect(() => {
    loadCreditOrders()
  }, [selectedCampusId])

  async function loadCreditOrders() {
    setLoading(true)

    let query = supabase
      .from('orders')
      .select('id, order_number, total, amount_paid, balance_due, payment_status, credit_client_name, credit_client_phone, credit_due_date, credit_notes, created_at, campus_id')
      .in('payment_status', ['credit', 'partial'])
      .order('created_at', { ascending: false })

    if (selectedCampusId) {
      query = query.eq('campus_id', selectedCampusId)
    }

    const { data, error } = await query

    if (error) {
      toast.error('Error cargando cuentas por cobrar')
      console.error(error)
    }

    setOrders(data ?? [])
    setLoading(false)
  }

  async function markAsPaid(orderId: string) {
    setMarkingPaid(orderId)

    const order = orders.find(o => o.id === orderId)
    if (!order) return

    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        amount_paid: order.total,
        balance_due: 0,
        paid_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (error) {
      toast.error('Error al registrar pago')
      setMarkingPaid(null)
      return
    }

    toast.success(`Orden #${order.order_number} marcada como pagada`)
    setOrders(prev => prev.filter(o => o.id !== orderId))
    setMarkingPaid(null)
  }

  // Filtrado
  const filtered = useMemo(() => {
    let result = orders

    if (filter !== 'all') {
      result = result.filter(o => o.payment_status === filter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(o =>
        (o.credit_client_name ?? '').toLowerCase().includes(q) ||
        String(o.order_number).includes(q) ||
        (o.credit_client_phone ?? '').includes(q)
      )
    }

    return result
  }, [orders, filter, search])

  // Totales
  const totalPendiente = filtered.reduce((sum, o) => sum + (o.balance_due ?? o.total), 0)
  const totalOrdenes = filtered.length

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n)

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  function getDaysAgo(d: string) {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Hoy'
    if (diff === 1) return 'Ayer'
    return `Hace ${diff} días`
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-white">Cuentas por cobrar</h1>
        <p className="mt-0.5 text-xs text-zinc-500">
          Seguimiento de ventas a crédito y pagos pendientes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-amber-400" />
            <p className="text-xs text-zinc-500">Total pendiente</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-amber-400">{fmt(totalPendiente)}</p>
        </div>

        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <Receipt size={14} className="text-blue-400" />
            <p className="text-xs text-zinc-500">Órdenes pendientes</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-white">{totalOrdenes}</p>
        </div>

        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-red-400" />
            <p className="text-xs text-zinc-500">Crédito total</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-red-400">
            {orders.filter(o => o.payment_status === 'credit').length}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre, teléfono u orden..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={13} className="text-zinc-500" />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as FilterStatus)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300 outline-none focus:border-amber-500"
          >
            <option value="all">Todos los pendientes</option>
            <option value="credit">Solo crédito (fiado)</option>
            <option value="partial">Solo abonos parciales</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-amber-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CheckCircle2 size={40} className="text-green-500/50" />
          <p className="mt-3 text-sm font-medium text-zinc-400">
            {orders.length === 0 ? 'No hay cuentas pendientes' : 'Sin resultados para este filtro'}
          </p>
          <p className="mt-1 text-xs text-zinc-600">
            Las ventas a crédito aparecerán aquí automáticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <div
              key={order.id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Info del cliente */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                  <User size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {order.credit_client_name || `Orden #${order.order_number}`}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Receipt size={11} />
                      #{order.order_number}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {getDaysAgo(order.created_at)}
                    </span>
                    {order.credit_client_phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={11} />
                        {order.credit_client_phone}
                      </span>
                    )}
                  </div>
                  {order.credit_notes && (
                    <p className="mt-1 text-xs text-zinc-600 italic">"{order.credit_notes}"</p>
                  )}
                </div>
              </div>

              {/* Monto y acción */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{fmt(order.balance_due ?? order.total)}</p>
                  <p className="text-[10px] text-zinc-500">
                    {order.payment_status === 'partial'
                      ? `Abonado: ${fmt(order.amount_paid ?? 0)}`
                      : 'Sin abono'}
                  </p>
                </div>

                <button
                  onClick={() => markAsPaid(order.id)}
                  disabled={markingPaid === order.id}
                  className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
                >
                  {markingPaid === order.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={12} />
                  )}
                  Pagado
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
