-- ============================================
-- VentaFlow — Seed: Tienda Demo SoundWave
-- ============================================
-- Ejecutar DESPUÉS de las migraciones 001-006.
-- Crea el campus SoundWave con productos de música.

-- ─── Campus SoundWave ──────────────────────────────────────────────────────────

INSERT INTO public.campus (name, city, country, business_type, business_name, slug, store_enabled, store_description, store_whatsapp, active)
VALUES (
  'SoundWave',
  'Santiago',
  'Chile',
  'retail',
  'SoundWave Música',
  'soundwave',
  true,
  'Tu tienda de instrumentos y accesorios musicales. Cuerdas, baquetas, uñetas, afinadores y más.',
  '+56949616038',
  true
)
ON CONFLICT (name) DO UPDATE SET
  slug = 'soundwave',
  store_enabled = true,
  business_name = 'SoundWave Música',
  store_description = 'Tu tienda de instrumentos y accesorios musicales. Cuerdas, baquetas, uñetas, afinadores y más.',
  store_whatsapp = '+56949616038';

-- ─── Categorías ────────────────────────────────────────────────────────────────

INSERT INTO public.categories (name, description) VALUES
  ('Cuerdas', 'Cuerdas para guitarra, bajo, violín y más'),
  ('Baquetas', 'Baquetas y escobillas para batería'),
  ('Uñetas', 'Picks y púas para guitarra y bajo'),
  ('Afinadores', 'Afinadores cromáticos y de clip'),
  ('Accesorios', 'Capos, correas, cables y más'),
  ('Mantenimiento', 'Limpiadores, lubricantes y herramientas')
ON CONFLICT (name) DO NOTHING;

-- ─── Productos ─────────────────────────────────────────────────────────────────

INSERT INTO public.products (name, description, price, sku, category_id, active, sale_type) VALUES
  -- Cuerdas
  ('Cuerdas Guitarra Acústica D''Addario EJ16', 'Calibre .012-.053. Fósforo bronce, tono cálido y brillante.', 8990, 'SW-CU-001', (SELECT id FROM categories WHERE name = 'Cuerdas'), true, 'stock'),
  ('Cuerdas Guitarra Eléctrica Ernie Ball Regular Slinky', 'Calibre .010-.046. Las más populares del mundo.', 6990, 'SW-CU-002', (SELECT id FROM categories WHERE name = 'Cuerdas'), true, 'stock'),
  ('Cuerdas Bajo 4 Cuerdas D''Addario EXL170', 'Calibre .045-.100. Nickel wound, tono versátil.', 18990, 'SW-CU-003', (SELECT id FROM categories WHERE name = 'Cuerdas'), true, 'stock'),
  ('Cuerdas Guitarra Clásica Savarez 520R', 'Tensión normal. Nylon rectificado, sonido redondo.', 12490, 'SW-CU-004', (SELECT id FROM categories WHERE name = 'Cuerdas'), true, 'stock'),
  ('Cuerdas Ukelele Aquila New Nylgut', 'Para ukelele soprano/concierto. Sonido claro y proyección.', 5990, 'SW-CU-005', (SELECT id FROM categories WHERE name = 'Cuerdas'), true, 'stock'),

  -- Baquetas
  ('Baquetas Vic Firth 5A American Classic', 'Hickory americano. El modelo más vendido del mundo.', 12990, 'SW-BQ-001', (SELECT id FROM categories WHERE name = 'Baquetas'), true, 'stock'),
  ('Baquetas Vic Firth 7A American Classic', 'Hickory. Más ligeras, ideales para jazz y práctica.', 12990, 'SW-BQ-002', (SELECT id FROM categories WHERE name = 'Baquetas'), true, 'stock'),
  ('Baquetas Vic Firth 2B American Classic', 'Hickory. Más gruesas, para rock pesado y potencia.', 13490, 'SW-BQ-003', (SELECT id FROM categories WHERE name = 'Baquetas'), true, 'stock'),
  ('Escobillas Vic Firth SBWIRE', 'Escobillas retráctiles de alambre. Para jazz y baladas.', 15990, 'SW-BQ-004', (SELECT id FROM categories WHERE name = 'Baquetas'), true, 'stock'),

  -- Uñetas
  ('Uñetas Dunlop Tortex 0.73mm (12 unidades)', 'Las picks más populares. Agarre superior, durabilidad extrema.', 5490, 'SW-UN-001', (SELECT id FROM categories WHERE name = 'Uñetas'), true, 'stock'),
  ('Uñetas Dunlop Jazz III (6 unidades)', 'Punta afilada para velocidad y precisión. Favoritas de shredders.', 4990, 'SW-UN-002', (SELECT id FROM categories WHERE name = 'Uñetas'), true, 'stock'),
  ('Uñetas Fender Medium (12 unidades)', 'Celuloide clásico. Tono cálido y natural.', 3990, 'SW-UN-003', (SELECT id FROM categories WHERE name = 'Uñetas'), true, 'stock'),

  -- Afinadores
  ('Afinador Clip Korg Pitchclip 2', 'Cromático de clip. Pantalla LED clara, compacto y preciso.', 14990, 'SW-AF-001', (SELECT id FROM categories WHERE name = 'Afinadores'), true, 'stock'),
  ('Afinador Pedal Boss TU-3', 'El estándar de la industria. Bypass verdadero, ultra preciso.', 79990, 'SW-AF-002', (SELECT id FROM categories WHERE name = 'Afinadores'), true, 'stock'),
  ('Afinador Clip Snark SN-5X', 'Pantalla giratoria full color. Rápido y económico.', 9990, 'SW-AF-003', (SELECT id FROM categories WHERE name = 'Afinadores'), true, 'stock'),

  -- Accesorios
  ('Capo Guitarra Kyser Quick-Change', 'Capo de resorte. Un solo movimiento, sin perder afinación.', 18990, 'SW-AC-001', (SELECT id FROM categories WHERE name = 'Accesorios'), true, 'stock'),
  ('Correa Guitarra Levy''s Cotton', 'Algodón premium 2". Cómoda y resistente.', 14990, 'SW-AC-002', (SELECT id FROM categories WHERE name = 'Accesorios'), true, 'stock'),
  ('Cable Instrumento 3m Mogami Gold', 'Cable premium blindado. Conectores Neutrik. Sin ruido.', 29990, 'SW-AC-003', (SELECT id FROM categories WHERE name = 'Accesorios'), true, 'stock'),
  ('Soporte Guitarra Hercules GS414B', 'Sistema AGS de seguridad. Para eléctrica y acústica.', 34990, 'SW-AC-004', (SELECT id FROM categories WHERE name = 'Accesorios'), true, 'stock'),

  -- Mantenimiento
  ('Kit Limpieza Dunlop System 65', 'Limpiador de cuerdas + diapasón + cuerpo. Todo en uno.', 19990, 'SW-MN-001', (SELECT id FROM categories WHERE name = 'Mantenimiento'), true, 'stock'),
  ('Aceite Diapasón Dunlop Lemon Oil', 'Hidrata y protege diapasones de palisandro y ébano.', 7990, 'SW-MN-002', (SELECT id FROM categories WHERE name = 'Mantenimiento'), true, 'stock')
ON CONFLICT (sku) DO NOTHING;

-- ─── Inventario para SoundWave ─────────────────────────────────────────────────

INSERT INTO public.inventory (product_id, campus_id, stock, low_stock_alert)
SELECT 
  p.id,
  (SELECT id FROM public.campus WHERE slug = 'soundwave'),
  CASE 
    WHEN p.sku LIKE 'SW-CU%' THEN 40
    WHEN p.sku LIKE 'SW-BQ%' THEN 25
    WHEN p.sku LIKE 'SW-UN%' THEN 60
    WHEN p.sku LIKE 'SW-AF%' THEN 15
    WHEN p.sku LIKE 'SW-AC%' THEN 20
    WHEN p.sku LIKE 'SW-MN%' THEN 30
    ELSE 20
  END,
  5
FROM public.products p
WHERE p.sku LIKE 'SW-%'
AND NOT EXISTS (
  SELECT 1 FROM public.inventory i 
  WHERE i.product_id = p.id 
  AND i.campus_id = (SELECT id FROM public.campus WHERE slug = 'soundwave')
);

-- ─── FIN ───────────────────────────────────────────────────────────────────────
