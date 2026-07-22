-- ============================================
-- VentaFlow — Migración 005: Módulo Suscripciones
-- ============================================
-- Gestión de suscripciones mensuales de clientes.
-- El super_admin administra el estado de pago de cada cliente.

-- ─── Tabla subscriptions ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  campus_id uuid NOT NULL,
  plan text NOT NULL DEFAULT 'esencial' CHECK (plan IN ('esencial', 'crecimiento', 'enterprise')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'cancelled', 'trial')),
  amount numeric NOT NULL DEFAULT 39990,
  currency text NOT NULL DEFAULT 'CLP',
  
  -- Ciclo de facturación
  billing_cycle text NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
  current_period_start timestamp with time zone NOT NULL DEFAULT now(),
  current_period_end timestamp with time zone NOT NULL DEFAULT (now() + interval '30 days'),
  
  -- Pago
  last_paid_at timestamp with time zone,
  next_due_date timestamp with time zone NOT NULL DEFAULT (now() + interval '30 days'),
  days_overdue integer DEFAULT 0,
  
  -- Info del cliente
  client_name text,
  client_email text,
  client_phone text,
  
  -- Notas y referencia de pago
  payment_reference text,
  notes text,
  
  -- Metadata
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid,
  
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_campus_fkey FOREIGN KEY (campus_id) REFERENCES public.campus(id),
  CONSTRAINT subscriptions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id)
);

-- ─── Tabla de pagos históricos ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.subscription_payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL,
  amount numeric NOT NULL,
  payment_method text,
  payment_reference text,
  paid_at timestamp with time zone NOT NULL DEFAULT now(),
  period_start timestamp with time zone,
  period_end timestamp with time zone,
  notes text,
  recorded_by uuid,
  
  CONSTRAINT subscription_payments_pkey PRIMARY KEY (id),
  CONSTRAINT subscription_payments_sub_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  CONSTRAINT subscription_payments_recorded_by_fkey FOREIGN KEY (recorded_by) REFERENCES public.profiles(id)
);

-- ─── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_subscriptions_campus ON public.subscriptions(campus_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_next_due ON public.subscriptions(next_due_date);
CREATE INDEX IF NOT EXISTS idx_subscription_payments_sub ON public.subscription_payments(subscription_id);

-- ─── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_payments ENABLE ROW LEVEL SECURITY;

-- Super admin puede ver y gestionar todo
CREATE POLICY "Super admin manages subscriptions"
  ON public.subscriptions FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Clientes pueden ver su propia suscripción
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (
    campus_id IN (SELECT campus_id FROM public.profiles WHERE id = auth.uid())
  );

-- Super admin gestiona pagos
CREATE POLICY "Super admin manages payments"
  ON public.subscription_payments FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Clientes pueden ver sus pagos
CREATE POLICY "Users can view own payments"
  ON public.subscription_payments FOR SELECT
  TO authenticated
  USING (
    subscription_id IN (
      SELECT id FROM public.subscriptions 
      WHERE campus_id IN (SELECT campus_id FROM public.profiles WHERE id = auth.uid())
    )
  );

-- ─── FIN ───────────────────────────────────────────────────────────────────────
