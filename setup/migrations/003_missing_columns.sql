-- ============================================
-- VentaFlow — Migración 003
-- ============================================
-- Agrega columnas y vistas que el código espera
-- pero no estaban en el schema original.

-- ─── orders.amount_paid ────────────────────────────────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS amount_paid numeric DEFAULT 0;

-- ─── orders.balance_due ────────────────────────────────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS balance_due numeric DEFAULT 0;

-- ─── orders.payment_type ───────────────────────────────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_type text;

-- ─── orders.payment_status ─────────────────────────────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_status text;

-- ─── order_items.variant_type ──────────────────────────────────────────────────
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS variant_type text;

ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS variant_value text;

-- ─── products.deleted_at (soft delete) ─────────────────────────────────────────
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- ─── products.cost_price (para pricing center) ────────────────────────────────
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS cost_price numeric DEFAULT 0;

-- ─── audit_logs.target_type ────────────────────────────────────────────────────
ALTER TABLE public.audit_logs
  ADD COLUMN IF NOT EXISTS target_type text;

ALTER TABLE public.audit_logs
  ADD COLUMN IF NOT EXISTS target_id text;

-- ─── Vista: products_with_stock ────────────────────────────────────────────────
-- Vista que combina productos con su inventario para el pricing center
CREATE OR REPLACE VIEW public.products_with_stock AS
SELECT 
  p.*,
  COALESCE(i.stock, 0) as stock,
  i.low_stock_alert,
  i.campus_id as inventory_campus_id,
  c.name as category_name
FROM public.products p
LEFT JOIN public.inventory i ON i.product_id = p.id
LEFT JOIN public.categories c ON c.id = p.category_id
WHERE p.deleted_at IS NULL;

-- ─── orders: columnas adicionales para producción ──────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS production_started_at timestamp with time zone;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS ready_pickup_at timestamp with time zone;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS delivered_at timestamp with time zone;

-- ─── order_items: timestamps de producción ─────────────────────────────────────
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS production_started_at timestamp with time zone;

ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS ready_pickup_at timestamp with time zone;

ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS delivered_at timestamp with time zone;

ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS fulfillment_type text;

-- ─── FIN ───────────────────────────────────────────────────────────────────────
