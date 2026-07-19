# NexoPOS — Guía de Setup para Nuevos Clientes

## Resumen

Este directorio contiene todo lo necesario para montar una nueva instancia del sistema para un cliente nuevo. Cada cliente tiene su propio proyecto Supabase (BD aislada).

## Prerequisitos

- [Node.js](https://nodejs.org/) 18+
- Una cuenta en [Supabase](https://supabase.com) (plan Free funciona para empezar)

## Paso a Paso

### 1. Crear proyecto Supabase

1. Ve a [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Elige nombre, contraseña DB, y región (ej: South America - São Paulo)
4. Espera ~2 min a que se cree

### 2. Obtener credenciales

En tu proyecto Supabase, ve a **Settings → API**:

| Variable | Dónde encontrarla |
|----------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (secreta) |

### 3. Configurar variables de entorno

Copia `.env.example` a `.env.local` y completa:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

NEXT_PUBLIC_APP_NAME=Ferretería Don Pedro
NEXT_PUBLIC_BUSINESS_TYPE=hardware
NEXT_PUBLIC_PLAN=pro
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Tipos de negocio disponibles:**
- `general` — Negocio genérico
- `retail` — Tienda de retail
- `food` — Cafetería / restaurant
- `hardware` — Ferretería
- `clothing` — Tienda de ropa
- `church_merch` — Merch de iglesia (config original ARM)

### 4. Ejecutar la migración de BD

Abre el **SQL Editor** en tu dashboard de Supabase:  
`https://supabase.com/dashboard/project/TU_PROJECT_ID/sql`

Copia y pega el contenido de:
```
setup/migrations/001_schema.sql
```

Ejecuta. Deberías ver "Success. No rows returned."

### 5. Ejecutar el setup

```bash
node setup/setup.js
```

El script te pedirá:
- Nombre de la sucursal principal
- Ciudad
- Email del administrador
- Contraseña
- Nombre completo

Al terminar tendrás:
- Schema completo instalado
- Sucursal principal creada
- Categorías según tipo de negocio
- Usuario super_admin listo para login

### 6. Iniciar la app

```bash
npm run dev
```

Abre `http://localhost:3000` y logea con las credenciales del admin.

## Deploy a Producción

### Vercel (recomendado)

1. Push el repo a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Configura las env vars del nuevo cliente
4. Deploy

Cada cliente puede tener su propio deploy en Vercel con sus propias env vars.

### Múltiples clientes con el mismo repo

```
Repo (código) ─── Deploy Cliente A (env vars A → Supabase proyecto A)
              └── Deploy Cliente B (env vars B → Supabase proyecto B)
              └── Deploy Cliente C (env vars C → Supabase proyecto C)
```

El código es el mismo, solo cambian las variables de entorno y el proyecto Supabase.

## Estructura de Archivos

```
setup/
├── README.md              ← Esta guía
├── setup.js               ← Script interactivo de setup
├── migrations/
│   └── 001_schema.sql     ← Schema completo (tablas, enums, triggers, RLS)
└── seeds/
    └── seed.sql           ← Template de datos iniciales (referencia)
```

## Troubleshooting

### "Your project's URL and Key are required"
→ Verifica que `.env.local` existe y tiene las 3 variables de Supabase.

### Error en migración "relation already exists"
→ Normal si ejecutas la migración dos veces. El script usa `IF NOT EXISTS`.

### El trigger no crea el profile
→ Verifica que `handle_new_user` existe ejecutando en SQL Editor:
```sql
SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
```

### Cambiar tipo de negocio después del setup
→ Solo afecta la terminología en la UI (env var `NEXT_PUBLIC_BUSINESS_TYPE`). Las categorías se pueden editar desde Settings → Categorías.

## Agregar más sucursales

Después del setup inicial, puedes agregar sucursales desde:
- La UI: Settings → Campus (como super_admin)
- SQL: `INSERT INTO campus (name, city) VALUES ('Sucursal 2', 'Valparaíso');`

## Agregar más usuarios

- Desde la UI: Settings → Usuarios → "Nuevo usuario"
- Desde el script: re-ejecuta `setup.js` (detecta que el schema ya existe)
