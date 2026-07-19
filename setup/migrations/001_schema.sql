-- ============================================
-- NexoPOS — Schema Migration
-- ============================================
-- Ejecutar en un proyecto Supabase nuevo via SQL Editor
-- Este script crea todas las tablas, enums, indexes, y secuencias necesarias.
--
-- PREREQUISITO: El proyecto Supabase debe tener habilitada la extensión uuid-ossp
-- (viene habilitada por defecto en proyectos nuevos)

-- ─── Extensiones ───────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Enums ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('super_admin', 'adm_merch', 'admin', 'voluntario');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'cancelled', 'refunded');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.payment_method AS ENUM ('efectivo', 'tarjeta', 'transferencia', 'mixto', 'link_pago', 'pendiente');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.movement_type AS ENUM ('entrada', 'salida', 'ajuste', 'venta', 'devolucion', 'transferencia_in', 'transferencia_out');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── Secuencias ────────────────────────────────────────────────────────────────
CREATE SEQUENCE IF NOT EXISTS public.orders_order_number_seq START 1;

-- ─── Tablas base (sin FK a otras tablas) ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.app_settings (
  key text NOT NULL,
  value text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT app_settings_pkey PRIMARY KEY (key)
);

CREATE TABLE IF NOT EXISTS public.campus (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  city text,
  country text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT campus_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  description text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);

-- ─── Profiles (depende de auth.users) ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  role public.user_role NOT NULL DEFAULT 'voluntario',
  avatar_url text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  campus_id uuid,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT profiles_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus(id)
);

-- ─── Products ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.products (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  sku text UNIQUE,
  category_id uuid,
  image_url text,
  active boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  sale_type text DEFAULT 'stock' CHECK (sale_type IN ('stock', 'encargo')),
  has_sizes boolean DEFAULT false,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT products_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id)
);

CREATE TABLE IF NOT EXISTS public.product_sizes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  size text NOT NULL,
  stock integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT product_sizes_pkey PRIMARY KEY (id),
  CONSTRAINT product_sizes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE
);

-- ─── Inventory ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.inventory (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL,
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  low_stock_alert integer NOT NULL DEFAULT 5,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid,
  campus_id uuid,
  CONSTRAINT inventory_pkey PRIMARY KEY (id),
  CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT inventory_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.profiles(id),
  CONSTRAINT inventory_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus(id)
);

CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL,
  type public.movement_type NOT NULL,
  quantity integer NOT NULL,
  notes text,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  campus_id uuid,
  CONSTRAINT inventory_movements_pkey PRIMARY KEY (id),
  CONSTRAINT inventory_movements_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT inventory_movements_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT inventory_movements_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus(id)
);

CREATE TABLE IF NOT EXISTS public.inventory_transfers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_campus_id uuid NOT NULL,
  to_campus_id uuid NOT NULL,
  product_id uuid NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'received', 'cancelled')),
  notes text,
  requested_by uuid,
  approved_by uuid,
  received_by uuid,
  requested_at timestamp with time zone NOT NULL DEFAULT now(),
  approved_at timestamp with time zone,
  received_at timestamp with time zone,
  CONSTRAINT inventory_transfers_pkey PRIMARY KEY (id),
  CONSTRAINT inventory_transfers_from_campus_fkey FOREIGN KEY (from_campus_id) REFERENCES public.campus(id),
  CONSTRAINT inventory_transfers_to_campus_fkey FOREIGN KEY (to_campus_id) REFERENCES public.campus(id),
  CONSTRAINT inventory_transfers_product_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT inventory_transfers_requested_by_fkey FOREIGN KEY (requested_by) REFERENCES public.profiles(id),
  CONSTRAINT inventory_transfers_approved_by_fkey FOREIGN KEY (approved_by) REFERENCES public.profiles(id),
  CONSTRAINT inventory_transfers_received_by_fkey FOREIGN KEY (received_by) REFERENCES public.profiles(id)
);

-- ─── Orders ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  order_number integer NOT NULL DEFAULT nextval('orders_order_number_seq') UNIQUE,
  status public.order_status NOT NULL DEFAULT 'pending',
  payment_method public.payment_method NOT NULL DEFAULT 'efectivo',
  subtotal numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  notes text,
  seller_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  campus_id uuid,
  promo_code text,
  delivery_status text CHECK (delivery_status IN ('pending', 'ready', 'delivered')),
  client_phone text,
  pickup_campus_id uuid,
  tracking_token text,
  production_status text,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profiles(id),
  CONSTRAINT orders_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus(id),
  CONSTRAINT orders_pickup_campus_fkey FOREIGN KEY (pickup_campus_id) REFERENCES public.campus(id)
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL,
  subtotal numeric,
  discount_pct numeric DEFAULT 0,
  line_total numeric DEFAULT 0,
  size text,
  refunded_qty integer DEFAULT 0,
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);

CREATE TABLE IF NOT EXISTS public.order_contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  client_name text,
  client_email text,
  client_phone text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_contacts_pkey PRIMARY KEY (id),
  CONSTRAINT order_contacts_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.order_fulfillment (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid,
  order_item_id uuid,
  fulfillment_type text,
  status text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT order_fulfillment_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.order_status_history (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  status text NOT NULL,
  notes text,
  updated_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_status_history_pkey PRIMARY KEY (id),
  CONSTRAINT order_status_history_order_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT order_status_history_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.profiles(id)
);

CREATE TABLE IF NOT EXISTS public.delivery_updates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  from_status text,
  to_status text NOT NULL,
  notes text,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT delivery_updates_pkey PRIMARY KEY (id),
  CONSTRAINT delivery_updates_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT delivery_updates_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.profiles(id)
);

-- ─── Refunds ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.refunds (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  amount numeric NOT NULL,
  reason text,
  refunded_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT refunds_pkey PRIMARY KEY (id),
  CONSTRAINT refunds_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT refunds_refunded_by_fkey FOREIGN KEY (refunded_by) REFERENCES public.profiles(id)
);

CREATE TABLE IF NOT EXISTS public.refund_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  refund_id uuid NOT NULL,
  order_item_id uuid NOT NULL,
  product_id uuid NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL,
  CONSTRAINT refund_items_pkey PRIMARY KEY (id),
  CONSTRAINT refund_items_refund_fkey FOREIGN KEY (refund_id) REFERENCES public.refunds(id) ON DELETE CASCADE,
  CONSTRAINT refund_items_order_item_fkey FOREIGN KEY (order_item_id) REFERENCES public.order_items(id),
  CONSTRAINT refund_items_product_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);

-- ─── Cash Sessions ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.cash_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  campus_id uuid NOT NULL,
  opened_by uuid,
  closed_by uuid,
  opened_at timestamp with time zone NOT NULL DEFAULT now(),
  closed_at timestamp with time zone,
  opening_amount numeric NOT NULL DEFAULT 0,
  closing_amount_declared numeric,
  sales_total numeric NOT NULL DEFAULT 0,
  orders_count integer NOT NULL DEFAULT 0,
  difference numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT cash_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT cash_sessions_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus(id),
  CONSTRAINT cash_sessions_opened_by_fkey FOREIGN KEY (opened_by) REFERENCES public.profiles(id),
  CONSTRAINT cash_sessions_closed_by_fkey FOREIGN KEY (closed_by) REFERENCES public.profiles(id)
);

-- ─── Promotions ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.promotions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  label text NOT NULL,
  type text NOT NULL CHECK (type IN ('percent', 'fixed')),
  value numeric NOT NULL,
  min_amount integer,
  max_uses integer,
  used_count integer DEFAULT 0,
  active boolean DEFAULT true,
  valid_from timestamp with time zone,
  valid_until timestamp with time zone,
  campus_id uuid,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT promotions_pkey PRIMARY KEY (id),
  CONSTRAINT promotions_campus_id_fkey FOREIGN KEY (campus_id) REFERENCES public.campus(id),
  CONSTRAINT promotions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id)
);

-- ─── Module Permissions ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.module_permissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  module text NOT NULL,
  role text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid,
  CONSTRAINT module_permissions_pkey PRIMARY KEY (id),
  CONSTRAINT module_permissions_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.profiles(id)
);

-- ─── Audit Logs ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  actor_id uuid,
  action text NOT NULL,
  entity_type text,
  entity_id text,
  campus_id uuid,
  metadata jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT audit_logs_pkey PRIMARY KEY (id)
);

-- ─── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_profiles_campus ON public.profiles(campus_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(active);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON public.inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_campus ON public.inventory(campus_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_product ON public.inventory_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_campus ON public.inventory_movements(campus_id);
CREATE INDEX IF NOT EXISTS idx_orders_campus ON public.orders(campus_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON public.orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON public.order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_cash_sessions_campus ON public.cash_sessions(campus_id);
CREATE INDEX IF NOT EXISTS idx_cash_sessions_status ON public.cash_sessions(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_transfers_from ON public.inventory_transfers(from_campus_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transfers_to ON public.inventory_transfers(to_campus_id);
CREATE INDEX IF NOT EXISTS idx_promotions_code ON public.promotions(code);

-- ─── Trigger: auto-crear profile cuando se registra un usuario ─────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'voluntario')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─── Trigger: actualizar updated_at automáticamente ────────────────────────────

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_products ON public.products;
CREATE TRIGGER set_updated_at_products
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_orders ON public.orders;
CREATE TRIGGER set_updated_at_orders
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_cash_sessions ON public.cash_sessions;
CREATE TRIGGER set_updated_at_cash_sessions
  BEFORE UPDATE ON public.cash_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ─── RLS Policies ──────────────────────────────────────────────────────────────
-- Habilitamos RLS en tablas con datos sensibles.
-- Las API routes usan service_role_key (bypasea RLS), 
-- pero el cliente directo queda protegido.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: usuarios solo ven su propio perfil (o su campus si son admin)
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Orders: usuarios ven órdenes de su campus
CREATE POLICY "Users can view orders from their campus"
  ON public.orders FOR SELECT
  USING (
    campus_id IN (
      SELECT campus_id FROM public.profiles WHERE id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'adm_merch')
    )
  );

-- Inventory: usuarios ven inventario de su campus
CREATE POLICY "Users can view inventory from their campus"
  ON public.inventory FOR SELECT
  USING (
    campus_id IN (
      SELECT campus_id FROM public.profiles WHERE id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'adm_merch')
    )
  );

-- ─── FIN ───────────────────────────────────────────────────────────────────────
-- Schema creado exitosamente.
-- Ejecutar setup/seeds/seed.sql para datos iniciales.
