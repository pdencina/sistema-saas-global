#!/usr/bin/env node

/**
 * VentaFlow — Carga de Datos Demo
 * 
 * Crea 3 campus (sucursales) de ejemplo, cada una con un tipo de negocio
 * diferente, categorías y productos demo para mostrar a potenciales clientes.
 * 
 * USO:
 *   node setup/load-demos.js
 * 
 * PREREQUISITOS:
 *   - Migración 001 y 002 ejecutadas
 *   - Variables de entorno configuradas en .env.local
 *   - Al menos un usuario super_admin creado
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// ─── Cargar .env.local ─────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env.local')
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
    lines.forEach(line => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      const [key, ...rest] = trimmed.split('=')
      if (key && rest.length) {
        process.env[key.trim()] = rest.join('=').trim()
      }
    })
  }
}

loadEnv()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// ─── Datos de los 3 demos ──────────────────────────────────────────────────────

const DEMOS = [
  {
    campus: {
      name: 'Demo Ferretería',
      city: 'Santiago',
      country: 'Chile',
      business_type: 'hardware',
      business_name: 'Ferretería Don Pedro',
    },
    user: {
      email: 'demo-ferreteria@ventaflow.cl',
      password: 'demo123456',
      full_name: 'Pedro González',
      role: 'admin',
    },
    categories: [
      'Herramientas manuales',
      'Herramientas eléctricas',
      'Fijaciones',
      'Pinturas',
      'Electricidad',
      'Plomería',
    ],
    products: [
      { name: 'Martillo carpintero 16oz', price: 8990, sku: 'FER-001', category: 'Herramientas manuales', stock: 25 },
      { name: 'Destornillador Phillips #2', price: 2990, sku: 'FER-002', category: 'Herramientas manuales', stock: 50 },
      { name: 'Llave ajustable 10"', price: 7490, sku: 'FER-003', category: 'Herramientas manuales', stock: 15 },
      { name: 'Taladro percutor 750W', price: 45990, sku: 'FER-004', category: 'Herramientas eléctricas', stock: 8 },
      { name: 'Sierra caladora 600W', price: 34990, sku: 'FER-005', category: 'Herramientas eléctricas', stock: 5 },
      { name: 'Tornillos madera 2" (100u)', price: 3490, sku: 'FER-006', category: 'Fijaciones', stock: 80 },
      { name: 'Clavos 2.5" (1kg)', price: 2490, sku: 'FER-007', category: 'Fijaciones', stock: 40 },
      { name: 'Pintura látex blanca 1gal', price: 15990, sku: 'FER-008', category: 'Pinturas', stock: 20 },
      { name: 'Rodillo antigota 9"', price: 4990, sku: 'FER-009', category: 'Pinturas', stock: 30 },
      { name: 'Cable eléctrico 2.5mm (10m)', price: 6990, sku: 'FER-010', category: 'Electricidad', stock: 35 },
      { name: 'Interruptor doble', price: 3990, sku: 'FER-011', category: 'Electricidad', stock: 45 },
      { name: 'Llave de paso 1/2"', price: 5490, sku: 'FER-012', category: 'Plomería', stock: 20 },
    ],
  },
  {
    campus: {
      name: 'Demo Cafetería',
      city: 'Viña del Mar',
      country: 'Chile',
      business_type: 'food',
      business_name: 'Café La Esquina',
    },
    user: {
      email: 'demo-cafeteria@ventaflow.cl',
      password: 'demo123456',
      full_name: 'María López',
      role: 'admin',
    },
    categories: [
      'Bebidas calientes',
      'Bebidas frías',
      'Comida',
      'Snacks',
      'Postres',
    ],
    products: [
      { name: 'Espresso simple', price: 1500, sku: 'CAF-001', category: 'Bebidas calientes', stock: 999 },
      { name: 'Cappuccino', price: 2500, sku: 'CAF-002', category: 'Bebidas calientes', stock: 999 },
      { name: 'Latte grande', price: 2990, sku: 'CAF-003', category: 'Bebidas calientes', stock: 999 },
      { name: 'Chocolate caliente', price: 2490, sku: 'CAF-004', category: 'Bebidas calientes', stock: 999 },
      { name: 'Té verde', price: 1800, sku: 'CAF-005', category: 'Bebidas calientes', stock: 999 },
      { name: 'Jugo natural naranja', price: 2990, sku: 'CAF-006', category: 'Bebidas frías', stock: 50 },
      { name: 'Smoothie berries', price: 3490, sku: 'CAF-007', category: 'Bebidas frías', stock: 30 },
      { name: 'Limonada jengibre', price: 2490, sku: 'CAF-008', category: 'Bebidas frías', stock: 40 },
      { name: 'Sándwich jamón queso', price: 3990, sku: 'CAF-009', category: 'Comida', stock: 15 },
      { name: 'Wrap pollo palta', price: 4490, sku: 'CAF-010', category: 'Comida', stock: 12 },
      { name: 'Muffin arándano', price: 1990, sku: 'CAF-011', category: 'Snacks', stock: 20 },
      { name: 'Croissant mantequilla', price: 1790, sku: 'CAF-012', category: 'Snacks', stock: 25 },
      { name: 'Cheesecake frambuesa', price: 3990, sku: 'CAF-013', category: 'Postres', stock: 8 },
      { name: 'Brownie doble chocolate', price: 2490, sku: 'CAF-014', category: 'Postres', stock: 15 },
    ],
  },
  {
    campus: {
      name: 'Demo Retail',
      city: 'Concepción',
      country: 'Chile',
      business_type: 'retail',
      business_name: 'Urban Style',
    },
    user: {
      email: 'demo-retail@ventaflow.cl',
      password: 'demo123456',
      full_name: 'Carlos Muñoz',
      role: 'admin',
    },
    categories: [
      'Poleras',
      'Polerones',
      'Pantalones',
      'Accesorios',
      'Calzado',
    ],
    products: [
      { name: 'Polera básica negra', price: 9990, sku: 'RET-001', category: 'Poleras', stock: 30, has_sizes: true },
      { name: 'Polera estampada urban', price: 14990, sku: 'RET-002', category: 'Poleras', stock: 20, has_sizes: true },
      { name: 'Polera oversize blanca', price: 12990, sku: 'RET-003', category: 'Poleras', stock: 25, has_sizes: true },
      { name: 'Polerón hoodie gris', price: 24990, sku: 'RET-004', category: 'Polerones', stock: 15, has_sizes: true },
      { name: 'Polerón zipper negro', price: 29990, sku: 'RET-005', category: 'Polerones', stock: 10, has_sizes: true },
      { name: 'Jeans slim fit azul', price: 29990, sku: 'RET-006', category: 'Pantalones', stock: 20, has_sizes: true },
      { name: 'Jogger cargo verde', price: 22990, sku: 'RET-007', category: 'Pantalones', stock: 18, has_sizes: true },
      { name: 'Gorra snapback negra', price: 12990, sku: 'RET-008', category: 'Accesorios', stock: 35 },
      { name: 'Riñonera urban camo', price: 15990, sku: 'RET-009', category: 'Accesorios', stock: 20 },
      { name: 'Calcetines pack x3', price: 7990, sku: 'RET-010', category: 'Accesorios', stock: 40 },
      { name: 'Zapatillas urbanas blancas', price: 39990, sku: 'RET-011', category: 'Calzado', stock: 12, has_sizes: true },
      { name: 'Zapatillas running negras', price: 44990, sku: 'RET-012', category: 'Calzado', stock: 10, has_sizes: true },
    ],
  },
]

// ─── Tallas por defecto para productos con has_sizes ───────────────────────────

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL']
const SHOE_SIZES = ['38', '39', '40', '41', '42', '43', '44']

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║   VentaFlow — Carga de Demos             ║')
  console.log('╚══════════════════════════════════════════╝\n')

  for (const demo of DEMOS) {
    console.log(`\n─── ${demo.campus.business_name} (${demo.campus.business_type}) ───\n`)

    // 1. Crear campus
    const { data: campus, error: campusErr } = await supabase
      .from('campus')
      .upsert(demo.campus, { onConflict: 'name' })
      .select()
      .single()

    if (campusErr) {
      console.error(`  ❌ Error creando campus: ${campusErr.message}`)
      continue
    }
    console.log(`  ✓ Campus: ${campus.name} (${campus.id})`)

    // 2. Crear categorías
    const categoryMap = {}
    for (const catName of demo.categories) {
      const { data: cat, error: catErr } = await supabase
        .from('categories')
        .upsert({ name: catName, active: true }, { onConflict: 'name' })
        .select()
        .single()

      if (cat) categoryMap[catName] = cat.id
      if (catErr) console.warn(`  ⚠ Categoría "${catName}": ${catErr.message}`)
    }
    console.log(`  ✓ Categorías: ${Object.keys(categoryMap).length}`)

    // 3. Crear productos + inventario
    let productCount = 0
    for (const prod of demo.products) {
      const { data: product, error: prodErr } = await supabase
        .from('products')
        .upsert({
          name: prod.name,
          price: prod.price,
          sku: prod.sku,
          category_id: categoryMap[prod.category] || null,
          active: true,
          sale_type: 'stock',
          has_sizes: prod.has_sizes || false,
        }, { onConflict: 'sku' })
        .select()
        .single()

      if (prodErr || !product) {
        console.warn(`  ⚠ Producto "${prod.name}": ${prodErr?.message}`)
        continue
      }

      // Crear inventario para este campus
      await supabase.from('inventory').upsert({
        product_id: product.id,
        campus_id: campus.id,
        stock: prod.stock,
        low_stock_alert: prod.stock < 20 ? 3 : 5,
      }, { onConflict: 'product_id' }).select()

      // Crear tallas si aplica
      if (prod.has_sizes) {
        const sizes = prod.category === 'Calzado' ? SHOE_SIZES : DEFAULT_SIZES
        for (const size of sizes) {
          await supabase.from('product_sizes').upsert({
            product_id: product.id,
            size,
            stock: Math.floor(prod.stock / sizes.length),
            active: true,
          }).select()
        }
      }

      productCount++
    }
    console.log(`  ✓ Productos: ${productCount}`)

    // 4. Crear usuario demo
    const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
      email: demo.user.email,
      password: demo.user.password,
      email_confirm: true,
      user_metadata: {
        full_name: demo.user.full_name,
        role: demo.user.role,
      },
    })

    if (authErr) {
      if (authErr.message.includes('already been registered')) {
        console.log(`  ✓ Usuario ya existe: ${demo.user.email}`)
      } else {
        console.warn(`  ⚠ Usuario: ${authErr.message}`)
      }
    } else {
      // Asignar campus y rol
      await supabase.from('profiles').update({
        role: demo.user.role,
        campus_id: campus.id,
        full_name: demo.user.full_name,
      }).eq('id', authUser.user.id)

      console.log(`  ✓ Usuario: ${demo.user.email} (${demo.user.role})`)
    }
  }

  // Resumen final
  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║        ✓ DEMOS CARGADAS                  ║')
  console.log('╚══════════════════════════════════════════╝\n')
  console.log('  Cuentas de demo:')
  console.log('  ┌───────────────────────────────────────────────────────┐')
  console.log('  │ Ferretería  │ demo-ferreteria@ventaflow.cl │ demo123456 │')
  console.log('  │ Cafetería   │ demo-cafeteria@ventaflow.cl  │ demo123456 │')
  console.log('  │ Retail      │ demo-retail@ventaflow.cl     │ demo123456 │')
  console.log('  └───────────────────────────────────────────────────────┘')
  console.log('\n  Cada usuario ve solo los productos de su tipo de negocio.')
  console.log('  La terminología de la UI se adapta automáticamente.\n')
}

main().catch(err => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
