-- ============================================
-- VentaFlow — Migración 006: Catálogo Público
-- ============================================
-- Agrega slug a campus para URLs públicas de tienda.
-- Ejemplo: ventaflow.cl/store/soundwave

-- ─── Campo slug en campus ──────────────────────────────────────────────────────

ALTER TABLE public.campus
  ADD COLUMN IF NOT EXISTS slug text UNIQUE;

ALTER TABLE public.campus
  ADD COLUMN IF NOT EXISTS store_enabled boolean DEFAULT false;

ALTER TABLE public.campus
  ADD COLUMN IF NOT EXISTS store_description text;

ALTER TABLE public.campus
  ADD COLUMN IF NOT EXISTS store_banner_url text;

ALTER TABLE public.campus
  ADD COLUMN IF NOT EXISTS store_whatsapp text;

CREATE INDEX IF NOT EXISTS idx_campus_slug ON public.campus(slug);

-- ─── FIN ───────────────────────────────────────────────────────────────────────
