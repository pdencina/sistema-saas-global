'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AlertTriangle, CheckCircle2, Clock, CreditCard } from 'lucide-react'

interface SubInfo {
  plan: string
  status: string
  amount: number
  next_due_date: string
  days_overdue: number
}

const PLAN_LABELS: Record<string, string> = {
  esencial: 'Esencial',
  crecimiento: 'Crecimiento',
  enterprise: 'Enterprise',
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n)

/**
 * Banner que muestra el estado de la suscripción del cliente.
 * Se muestra solo para roles locales (admin, voluntario).
 * Si la suscripción está vencida, muestra alerta roja.
 */
export default function SubscriptionBanner() {
  const [sub, setSub] = useState<SubInfo | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, campus_id')
        .eq('id', user.id)
        .single()

      // Solo mostrar para roles locales, no para super_admin
      if (!profile || profile.role === 'super_admin') return
      if (!profile.campus_id) return

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan, status, amount, next_due_date, days_overdue')
        .eq('campus_id', profile.campus_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!subscription) return

      setSub(subscription)
      setShow(true)
    }

    load()
  }, [])

  if (!show || !sub) return null

  const daysUntil = Math.ceil((new Date(sub.next_due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const isOverdue = daysUntil < 0
  const isWarning = daysUntil >= 0 && daysUntil <= 7

  // Si está al día y faltan más de 7 días, no mostrar nada
  if (!isOverdue && !isWarning && sub.status === 'active') return null

  return (
    <div
      className={`mb-4 flex items-center justify-between rounded-xl border px-4 py-3 ${
        isOverdue
          ? 'border-red-500/20 bg-red-500/5'
          : isWarning
            ? 'border-amber-500/20 bg-amber-500/5'
            : 'border-zinc-700/40 bg-zinc-800/30'
      }`}
    >
      <div className="flex items-center gap-3">
        {isOverdue ? (
          <AlertTriangle size={16} className="text-red-400" />
        ) : isWarning ? (
          <Clock size={16} className="text-amber-400" />
        ) : (
          <CheckCircle2 size={16} className="text-green-400" />
        )}

        <div>
          <p className={`text-sm font-medium ${isOverdue ? 'text-red-300' : isWarning ? 'text-amber-300' : 'text-zinc-200'}`}>
            {isOverdue
              ? `Suscripción vencida hace ${Math.abs(daysUntil)} días`
              : isWarning
                ? `Tu suscripción vence en ${daysUntil} día${daysUntil !== 1 ? 's' : ''}`
                : `Plan ${PLAN_LABELS[sub.plan] ?? sub.plan} activo`
            }
          </p>
          <p className="text-xs text-zinc-500">
            Plan {PLAN_LABELS[sub.plan] ?? sub.plan} · {fmt(sub.amount)}/mes
          </p>
        </div>
      </div>

      {(isOverdue || isWarning) && (
        <div className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
          isOverdue ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
          <CreditCard size={12} className="inline mr-1" />
          Contactar administrador
        </div>
      )}
    </div>
  )
}
