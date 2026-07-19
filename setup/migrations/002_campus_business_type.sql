-- ============================================
-- VentaFlow — Migración 002
-- ============================================
-- Agrega business_type a la tabla campus para soportar
-- demos multi-negocio dentro de una misma BD.
--
-- Cada campus puede ser un tipo de negocio diferente
-- y la UI se adapta automáticamente.

-- ─── Agregar columna business_type a campus ────────────────────────────────────

ALTER TABLE public.campus
  ADD COLUMN IF NOT EXISTS business_type text DEFAULT 'general'
  CHECK (business_type IN ('retail', 'food', 'hardware', 'clothing', 'general', 'church_merch'));

-- ─── Agregar columna business_name a campus (nombre del negocio demo) ──────────

ALTER TABLE public.campus
  ADD COLUMN IF NOT EXISTS business_name text;

-- ─── Comentarios ───────────────────────────────────────────────────────────────

COMMENT ON COLUMN public.campus.business_type IS 'Tipo de negocio: retail, food, hardware, clothing, general, church_merch. Define la terminología y categorías de la UI.';
COMMENT ON COLUMN public.campus.business_name IS 'Nombre del negocio (ej: "Ferretería Don Pedro"). Si es null, se usa el nombre del campus.';

-- ─── FIN ───────────────────────────────────────────────────────────────────────
