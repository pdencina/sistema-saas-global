#!/usr/bin/env node

/**
 * NexoPOS — Setup Script
 * 
 * Inicializa un nuevo proyecto Supabase con el schema y datos iniciales.
 * 
 * USO:
 *   node setup/setup.js
 * 
 * PREREQUISITOS:
 *   - Proyecto Supabase creado
 *   - Variables de entorno configuradas (o archivo .env.local)
 * 
 * El script:
 *   1. Valida las variables de entorno
 *   2. Ejecuta la migración (schema)
 *   3. Inserta categorías según tipo de negocio
 *   4. Crea la sucursal principal
 *   5. Crea el primer usuario admin
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

// ─── Cargar .env.local si existe ───────────────────────────────────────────────

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

// ─── Configuración ─────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Mi Negocio'
const BUSINESS_TYPE = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'general'

// ─── Categorías por tipo de negocio ────────────────────────────────────────────

const CATEGORIES = {
  general: [
    { name: 'Productos', description: 'Productos generales' },
    { name: 'Servicios', description: 'Servicios ofrecidos' },
    { name: 'Accesorios', description: 'Accesorios varios' },
    { name: 'Otros', description: 'Otros productos' },
  ],
  retail: [
    { name: 'Ropa', description: 'Prendas de vestir' },
    { name: 'Calzado', description: 'Zapatos y zapatillas' },
    { name: 'Accesorios', description: 'Bolsos, cinturones, gorras' },
    { name: 'Electrónica', description: 'Gadgets y electrónicos' },
    { name: 'Hogar', description: 'Artículos para el hogar' },
    { name: 'Otros', description: 'Productos varios' },
  ],
  food: [
    { name: 'Bebidas calientes', description: 'Café, té, chocolate' },
    { name: 'Bebidas frías', description: 'Jugos, smoothies, agua' },
    { name: 'Comida', description: 'Platos preparados, sándwiches' },
    { name: 'Snacks', description: 'Galletas, pasteles, dulces' },
    { name: 'Postres', description: 'Tortas, helados' },
    { name: 'Otros', description: 'Productos varios' },
  ],
  hardware: [
    { name: 'Herramientas manuales', description: 'Martillos, destornilladores, llaves' },
    { name: 'Herramientas eléctricas', description: 'Taladros, lijadoras, sierras' },
    { name: 'Fijaciones', description: 'Tornillos, clavos, anclajes' },
    { name: 'Pinturas', description: 'Pinturas, brochas, rodillos' },
    { name: 'Electricidad', description: 'Cables, enchufes, interruptores' },
    { name: 'Plomería', description: 'Tuberías, llaves de paso, sellos' },
    { name: 'Construcción', description: 'Cemento, ladrillos, arena' },
    { name: 'Seguridad', description: 'Candados, cerraduras, chapas' },
    { name: 'Otros', description: 'Productos varios' },
  ],
  clothing: [
    { name: 'Poleras', description: 'Camisetas y poleras' },
    { name: 'Pantalones', description: 'Jeans, pantalones, shorts' },
    { name: 'Polerones', description: 'Polerones y buzos' },
    { name: 'Chaquetas', description: 'Chaquetas y parkas' },
    { name: 'Ropa interior', description: 'Boxers, calcetines' },
    { name: 'Accesorios', description: 'Gorras, bufandas, cinturones' },
    { name: 'Calzado', description: 'Zapatillas y zapatos' },
    { name: 'Otros', description: 'Productos varios' },
  ],
  church_merch: [
    { name: 'Poleras', description: 'Poleras con diseños' },
    { name: 'Polerones', description: 'Polerones y buzos' },
    { name: 'Accesorios', description: 'Gorras, tazas, stickers' },
    { name: 'Bebidas', description: 'Café, jugos, agua' },
    { name: 'Snacks', description: 'Galletas, dulces' },
    { name: 'Otros', description: 'Productos varios' },
  ],
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()) }))
}

function log(emoji, msg) {
  console.log(`${emoji}  ${msg}`)
}

function fail(msg) {
  console.error(`\n❌  ${msg}\n`)
  process.exit(1)
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════╗')
  console.log('║      NexoPOS — Setup Inicial         ║')
  console.log('╚══════════════════════════════════════╝\n')

  // 1. Validar env vars
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    fail('Faltan variables de entorno.\nConfigura NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  }

  log('✓', `Supabase URL: ${SUPABASE_URL}`)
  log('✓', `App: ${APP_NAME}`)
  log('✓', `Tipo de negocio: ${BUSINESS_TYPE}`)

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  // 2. Ejecutar migración
  log('⏳', 'Ejecutando migración de schema...')
  
  const migrationPath = path.resolve(__dirname, 'migrations', '001_schema.sql')
  if (!fs.existsSync(migrationPath)) {
    fail('No se encontró setup/migrations/001_schema.sql')
  }
  
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')
  
  const { error: migrationError } = await supabase.rpc('exec_sql', { sql: migrationSQL }).maybeSingle()
  
  if (migrationError) {
    // Si exec_sql no existe, indicar que deben ejecutar manualmente
    console.log('\n⚠️  No se pudo ejecutar la migración automáticamente.')
    console.log('   Esto es normal — Supabase no expone exec_sql por defecto.')
    console.log('\n   👉 Ejecuta manualmente el archivo:')
    console.log(`      setup/migrations/001_schema.sql`)
    console.log('   en el SQL Editor de tu dashboard de Supabase.')
    console.log('   (https://supabase.com/dashboard/project/_/sql)\n')
    
    const continueSetup = await ask('¿Ya ejecutaste la migración manualmente? (s/n): ')
    if (continueSetup.toLowerCase() !== 's' && continueSetup.toLowerCase() !== 'si') {
      log('⏸️', 'Setup pausado. Ejecuta la migración y vuelve a correr este script.')
      process.exit(0)
    }
  } else {
    log('✓', 'Migración ejecutada correctamente')
  }

  // 3. Datos del negocio
  console.log('\n─── Configuración del negocio ───\n')
  
  const branchName = await ask(`Nombre de la sucursal principal (ej: "Casa Matriz"): `) || 'Casa Matriz'
  const city = await ask(`Ciudad: `) || 'Santiago'
  const adminEmail = await ask(`Email del administrador: `)
  const adminPassword = await ask(`Contraseña del administrador (min 6 chars): `)
  const adminName = await ask(`Nombre completo del administrador: `)

  if (!adminEmail || !adminPassword || adminPassword.length < 6) {
    fail('Email y contraseña (min 6 chars) son requeridos para el admin.')
  }

  // 4. Crear sucursal
  log('⏳', 'Creando sucursal principal...')
  
  const { data: campus, error: campusError } = await supabase
    .from('campus')
    .upsert({ name: branchName, city, country: 'Chile', active: true }, { onConflict: 'name' })
    .select()
    .single()

  if (campusError) {
    fail(`Error creando sucursal: ${campusError.message}`)
  }
  log('✓', `Sucursal "${campus.name}" creada (${campus.id})`)

  // 5. Crear categorías
  log('⏳', `Insertando categorías para "${BUSINESS_TYPE}"...`)
  
  const categories = CATEGORIES[BUSINESS_TYPE] || CATEGORIES.general
  
  const { error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'name' })

  if (catError) {
    console.warn(`   ⚠️  Aviso categorías: ${catError.message}`)
  } else {
    log('✓', `${categories.length} categorías insertadas`)
  }

  // 6. Insertar app_settings
  log('⏳', 'Configurando app_settings...')
  
  const settings = [
    { key: 'app_name', value: APP_NAME },
    { key: 'business_type', value: BUSINESS_TYPE },
    { key: 'currency', value: 'CLP' },
    { key: 'timezone', value: 'America/Santiago' },
    { key: 'default_low_stock_alert', value: '5' },
    { key: 'require_cash_session', value: 'true' },
    { key: 'allow_negative_stock', value: 'false' },
    { key: 'whatsapp_enabled', value: 'false' },
    { key: 'sumup_enabled', value: 'false' },
  ]
  
  const { error: settingsError } = await supabase
    .from('app_settings')
    .upsert(settings, { onConflict: 'key' })

  if (settingsError) {
    console.warn(`   ⚠️  Aviso settings: ${settingsError.message}`)
  } else {
    log('✓', 'Configuración guardada')
  }

  // 7. Crear usuario admin
  log('⏳', 'Creando usuario administrador...')
  
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: {
      full_name: adminName || adminEmail,
      role: 'super_admin',
    },
  })

  if (authError) {
    fail(`Error creando usuario: ${authError.message}`)
  }

  // El trigger handle_new_user debería crear el profile automáticamente.
  // Aseguramos que tenga el campus correcto y rol super_admin.
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      role: 'super_admin',
      campus_id: campus.id,
      full_name: adminName || adminEmail,
    })
    .eq('id', authUser.user.id)

  if (profileError) {
    // El trigger podría no haberse disparado aún, crear manualmente
    await supabase.from('profiles').upsert({
      id: authUser.user.id,
      email: adminEmail,
      full_name: adminName || adminEmail,
      role: 'super_admin',
      campus_id: campus.id,
      active: true,
    })
  }

  log('✓', `Admin creado: ${adminEmail} (super_admin)`)

  // 8. Resumen
  console.log('\n╔══════════════════════════════════════╗')
  console.log('║        ✓ SETUP COMPLETADO            ║')
  console.log('╚══════════════════════════════════════╝\n')
  console.log(`  App:        ${APP_NAME}`)
  console.log(`  Tipo:       ${BUSINESS_TYPE}`)
  console.log(`  Sucursal:   ${branchName} (${city})`)
  console.log(`  Admin:      ${adminEmail}`)
  console.log(`  Categorías: ${categories.length}`)
  console.log(`\n  🚀 Ya puedes ejecutar: npm run dev\n`)
  console.log(`  Login con: ${adminEmail} / [tu contraseña]\n`)
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err.message)
  process.exit(1)
})
