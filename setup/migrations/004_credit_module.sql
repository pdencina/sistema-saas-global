-- ============================================
-- VentaFlow — Migración 004: Módulo Cuentas por Cobrar
-- ============================================
-- Soporte para ventas a crédito y seguimiento de pagos pendientes.

-- ─── Campos de crédito en orders ───────────────────────────────────────────────

-- payment_status: 'paid' (pagado completo), 'partial' (abono), 'credit' (fiado/pendiente)
-- Ya existe payment_status de migración anterior, pero asegurar que esté
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'paid';

-- Datos del cliente a crédito
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS credit_client_name text;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS credit_client_phone text;

-- Fecha límite de pago (opcional)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS credit_due_date timestamp with time zone;

-- Fecha en que se completó el pago
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS paid_at timestamp with time zone;

-- Notas de crédito (ej: "Paga el viernes", "Apoderado curso 3B")
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS credit_notes text;

-- ─── Index para consultas rápidas de créditos pendientes ───────────────────────

CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_credit_client ON public.orders(credit_client_name);

-- ─── FIN ───────────────────────────────────────────────────────────────────────
