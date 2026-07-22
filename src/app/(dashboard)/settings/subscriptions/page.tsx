'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import {
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Loader2,
  X,
  Receipt,
  Calendar,
  Phone,
  Mail,
  CreditCard,
} from 'lucide-react'

interface Subscription {
  id: string
  campus_id: string
  plan: string
  status: string
  amount: number
  billing_cycle: string
  current_period_start: string
  current_period_end: string
  last_paid_at: string | null
  next_due_date: string
  days_overdue: number
  client_name: string | null
  client_email: string | null
  client_phone: string | null
  payment_reference: string | null
  notes: string | null
  created_at: string
  campus?: { name: string } | null
}

const PLAN_CONFIG: Record<string, { label: string; amount: number; color: string }> = {
  esencial: { label: 'Esencial', amount: 39990, color: 'text-blue-400' },
  crecimiento: { label: 'Crecimiento', amount: 79990, color: 'text-purple-400' },
  enterprise: { label: 'Enterprise', amount: 0, color: 'text-amber-400' },
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Al día', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  past_due: { label: 'Vencido', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  trial: { label: 'Prueba', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  cancelled: { label: 'Cancelado', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20' },
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n)

export default function SubscriptionsPage() {
  const supabase = createClient()

  const [subs, setSubs] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [markingPaid, setMarkingPaid] = useState<string | null>(null)

  // Form nueva suscripción
  const [campuses, setCampuses] = useState<{ id: string; name: string }[]>([])
  const [newCampusId, setNewCampusId] = useState('')
  const [newPlan, setNewPlan] = useState('esencial')
  const [newAmount, setNewAmount] = useState(39990)
  const [newClientName, setNewClientName] = useState('')
  const [newClientEmail, setNewClientEmail] = useState('')
  const [newClientPhone, setNewClientPhone] = useState('')
  const [newNotes, setNewNotes] = useState('')

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    const [{ data: subsData }, { data: campusData }] = await Promise.all([
      supabase
        .from('subscriptions')
        .select('*, campus:campus_id(name)')
        .order('next_due_date', { ascending: true }),
      supabase.from('campus').select('id, name').eq('active', true).order('name'),
    ])
    setSubs(subsData ?? [])
    setCampuses(campusData ?? [])
    setLoading(false)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newCampusId) { toast.error('Selecciona una sucursal'); return }
    setSaving(true)

    const { error } = await supabase.from('subscriptions').insert({
      campus_id: newCampusId,
      plan: newPlan,
      amount: newAmount,
      client_name: newClientName.trim() || null,
      client_email: newClientEmail.trim() || null,
      client_phone: newClientPhone.trim() || null,
      notes: newNotes.trim() || null,
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      next_due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })

    setSaving(false)
    if (error) { toast.error(error.message); return }

    toast.success('Suscripción creada')
    setShowNew(false)
    setNewCampusId(''); setNewPlan('esencial'); setNewAmount(39990)
    setNewClientName(''); setNewClientEmail(''); setNewClientPhone(''); setNewNotes('')
    loadAll()
  }

  async function markAsPaid(sub: Subscription) {
    setMarkingPaid(sub.id)

    const now = new Date()
    const nextDue = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    // Registrar pago
    await supabase.from('subscription_payments').insert({
      subscription_id: sub.id,
      amount: sub.amount,
      payment_method: 'transferencia',
      paid_at: now.toISOString(),
      period_start: sub.current_period_start,
      period_end: sub.current_period_end,
    })

    // Actualizar suscripción
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        last_paid_at: now.toISOString(),
        current_period_start: now.toISOString(),
        current_period_end: nextDue.toISOString(),
        next_due_date: nextDue.toISOString(),
        days_overdue: 0,
      })
      .eq('id', sub.id)

    if (error) {
      toast.error('Error al registrar pago')
    } else {
      toast.success(`Pago registrado — ${sub.client_name ?? 'Cliente'}`)
    }

    setMarkingPaid(null)
    loadAll()
  }

  // Stats
  const totalMRR = subs.filter(s => s.status === 'active' || s.status === 'past_due').reduce((sum, s) => sum + s.amount, 0)
  const activeCount = subs.filter(s => s.status === 'active').length
  const overdueCount = subs.filter(s => s.status === 'past_due').length

  function getDaysUntilDue(dateStr: string) {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return diff
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 size={24} className="animate-spin text-amber-500" />
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-semibold text-white">Suscripciones</h1>
          <p className="mt-0.5 text-xs text-zinc-500">Gestión de pagos mensuales de clientes.</p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-400"
        >
          <Plus size={15} />Nueva suscripción
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-green-400" />
            <p className="text-xs text-zinc-500">MRR</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-green-400">{fmt(totalMRR)}</p>
        </div>
        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-blue-400" />
            <p className="text-xs text-zinc-500">Clientes activos</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-white">{activeCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-red-400" />
            <p className="text-xs text-zinc-500">Pagos vencidos</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-red-400">{overdueCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <Receipt size={14} className="text-zinc-400" />
            <p className="text-xs text-zinc-500">Total suscripciones</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-white">{subs.length}</p>
        </div>
      </div>

      {/* Form nueva suscripción */}
      {showNew && (
        <form onSubmit={handleCreate} className="rounded-xl border border-amber-500/20 bg-zinc-800/30 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Nueva suscripción</p>
            <button type="button" onClick={() => setShowNew(false)} className="text-zinc-500 hover:text-white">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Sucursal *</label>
              <select value={newCampusId} onChange={e => setNewCampusId(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-300 outline-none focus:border-amber-500">
                <option value="">Seleccionar...</option>
                {campuses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Plan</label>
              <select value={newPlan} onChange={e => { setNewPlan(e.target.value); setNewAmount(PLAN_CONFIG[e.target.value]?.amount ?? 39990) }}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-300 outline-none focus:border-amber-500">
                <option value="esencial">Esencial — $39.990/mes</option>
                <option value="crecimiento">Crecimiento — $79.990/mes</option>
                <option value="enterprise">Enterprise — A medida</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Monto mensual</label>
              <input type="number" value={newAmount} onChange={e => setNewAmount(Number(e.target.value))}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Nombre contacto</label>
              <input type="text" value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder="Andrea López"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Email</label>
              <input type="email" value={newClientEmail} onChange={e => setNewClientEmail(e.target.value)} placeholder="andrea@empresa.cl"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Teléfono</label>
              <input type="tel" value={newClientPhone} onChange={e => setNewClientPhone(e.target.value)} placeholder="+56912345678"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Notas</label>
            <input type="text" value={newNotes} onChange={e => setNewNotes(e.target.value)} placeholder="Condiciones especiales, descuento, etc."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-amber-500" />
          </div>

          <button type="submit" disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-amber-400 disabled:opacity-50">
            {saving && <Loader2 size={13} className="animate-spin" />}
            Crear suscripción
          </button>
        </form>
      )}

      {/* Lista de suscripciones */}
      {subs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CreditCard size={40} className="text-zinc-700" />
          <p className="mt-3 text-sm text-zinc-400">No hay suscripciones registradas</p>
          <p className="mt-1 text-xs text-zinc-600">Crea una suscripción para cada cliente.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subs.map(sub => {
            const plan = PLAN_CONFIG[sub.plan] ?? PLAN_CONFIG.esencial
            const statusCfg = STATUS_CONFIG[sub.status] ?? STATUS_CONFIG.active
            const daysUntil = getDaysUntilDue(sub.next_due_date)
            const isOverdue = daysUntil < 0
            const campusName = Array.isArray(sub.campus) ? sub.campus[0]?.name : sub.campus?.name

            return (
              <div key={sub.id} className="rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold text-white">
                        {sub.client_name ?? campusName ?? 'Sin nombre'}
                      </p>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusCfg.bg} ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                      <span className={`text-xs font-medium ${plan.color}`}>
                        {plan.label}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      {campusName && (
                        <span>Sucursal: {campusName}</span>
                      )}
                      {sub.client_email && (
                        <span className="flex items-center gap-1"><Mail size={10} />{sub.client_email}</span>
                      )}
                      {sub.client_phone && (
                        <span className="flex items-center gap-1"><Phone size={10} />{sub.client_phone}</span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1 text-zinc-500">
                        <Calendar size={10} />
                        Próximo pago: {new Date(sub.next_due_date).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
                      </span>
                      {isOverdue ? (
                        <span className="flex items-center gap-1 text-red-400 font-medium">
                          <AlertTriangle size={10} />
                          {Math.abs(daysUntil)} días de atraso
                        </span>
                      ) : daysUntil <= 7 ? (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Clock size={10} />
                          Vence en {daysUntil} días
                        </span>
                      ) : null}
                    </div>

                    {sub.notes && (
                      <p className="mt-1 text-xs text-zinc-600 italic">"{sub.notes}"</p>
                    )}
                  </div>

                  {/* Monto y acción */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{fmt(sub.amount)}</p>
                      <p className="text-[10px] text-zinc-500">/mes</p>
                    </div>

                    <button
                      onClick={() => markAsPaid(sub)}
                      disabled={markingPaid === sub.id}
                      className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
                    >
                      {markingPaid === sub.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={12} />
                      )}
                      Registrar pago
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
