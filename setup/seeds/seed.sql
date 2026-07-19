-- ============================================
-- NexoPOS — Seed Data
-- ============================================
-- Datos iniciales para un nuevo negocio.
-- Ejecutar DESPUÉS de 001_schema.sql
--
-- IMPORTANTE: Antes de ejecutar, reemplazar los valores marcados con [CONFIGURAR]
-- o usar el script setup.js que los reemplaza automáticamente.

-- ─── Configuración de la app ───────────────────────────────────────────────────

INSERT INTO public.app_settings (key, value) VALUES
  ('app_name', '[CONFIGURAR_APP_NAME]'),
  ('business_type', '[CONFIGURAR_BUSINESS_TYPE]'),
  ('currency', 'CLP'),
  ('timezone', 'America/Santiago'),
  ('default_low_stock_alert', '5'),
  ('require_cash_session', 'true'),
  ('allow_negative_stock', 'false'),
  ('order_number_prefix', ''),
  ('whatsapp_enabled', 'false'),
  ('sumup_enabled', 'false')
ON CONFLICT (key) DO NOTHING;

-- ─── Sucursal principal ────────────────────────────────────────────────────────

INSERT INTO public.campus (id, name, city, country) VALUES
  ('00000000-0000-0000-0000-000000000001', '[CONFIGURAR_BRANCH_NAME]', '[CONFIGURAR_CITY]', 'Chile')
ON CONFLICT (name) DO NOTHING;

-- ─── Categorías por tipo de negocio ────────────────────────────────────────────
-- Las categorías se insertan según el tipo de negocio.
-- El script setup.js selecciona el bloque correcto automáticamente.

-- == CATEGORÍAS: general ==
-- INSERT INTO public.categories (name, description) VALUES
--   ('Productos', 'Productos generales'),
--   ('Servicios', 'Servicios ofrecidos'),
--   ('Accesorios', 'Accesorios varios'),
--   ('Otros', 'Otros productos')
-- ON CONFLICT (name) DO NOTHING;

-- == CATEGORÍAS: retail ==
-- INSERT INTO public.categories (name, description) VALUES
--   ('Ropa', 'Prendas de vestir'),
--   ('Calzado', 'Zapatos y zapatillas'),
--   ('Accesorios', 'Bolsos, cinturones, gorras'),
--   ('Electrónica', 'Gadgets y electrónicos'),
--   ('Hogar', 'Artículos para el hogar'),
--   ('Otros', 'Productos varios')
-- ON CONFLICT (name) DO NOTHING;

-- == CATEGORÍAS: food ==
-- INSERT INTO public.categories (name, description) VALUES
--   ('Bebidas calientes', 'Café, té, chocolate'),
--   ('Bebidas frías', 'Jugos, smoothies, agua'),
--   ('Comida', 'Platos preparados, sándwiches'),
--   ('Snacks', 'Galletas, pasteles, dulces'),
--   ('Postres', 'Tortas, helados'),
--   ('Otros', 'Productos varios')
-- ON CONFLICT (name) DO NOTHING;

-- == CATEGORÍAS: hardware ==
-- INSERT INTO public.categories (name, description) VALUES
--   ('Herramientas manuales', 'Martillos, destornilladores, llaves'),
--   ('Herramientas eléctricas', 'Taladros, lijadoras, sierras'),
--   ('Fijaciones', 'Tornillos, clavos, anclajes'),
--   ('Pinturas', 'Pinturas, brochas, rodillos'),
--   ('Electricidad', 'Cables, enchufes, interruptores'),
--   ('Plomería', 'Tuberías, llaves de paso, sellos'),
--   ('Construcción', 'Cemento, ladrillos, arena'),
--   ('Seguridad', 'Candados, cerraduras, chapas'),
--   ('Otros', 'Productos varios')
-- ON CONFLICT (name) DO NOTHING;

-- == CATEGORÍAS: clothing ==
-- INSERT INTO public.categories (name, description) VALUES
--   ('Poleras', 'Camisetas y poleras'),
--   ('Pantalones', 'Jeans, pantalones, shorts'),
--   ('Polerones', 'Polerones y buzos'),
--   ('Chaquetas', 'Chaquetas y parkas'),
--   ('Ropa interior', 'Boxers, calcetines'),
--   ('Accesorios', 'Gorras, bufandas, cinturones'),
--   ('Calzado', 'Zapatillas y zapatos'),
--   ('Otros', 'Productos varios')
-- ON CONFLICT (name) DO NOTHING;

-- == CATEGORÍAS: church_merch ==
-- INSERT INTO public.categories (name, description) VALUES
--   ('Poleras', 'Poleras con diseños'),
--   ('Polerones', 'Polerones y buzos'),
--   ('Accesorios', 'Gorras, tazas, stickers'),
--   ('Bebidas', 'Café, jugos, agua'),
--   ('Snacks', 'Galletas, dulces'),
--   ('Otros', 'Productos varios')
-- ON CONFLICT (name) DO NOTHING;

-- ─── FIN ───────────────────────────────────────────────────────────────────────
-- Seed completado.
-- El primer usuario admin se crea mediante el script setup.js
-- usando la API de auth de Supabase.
