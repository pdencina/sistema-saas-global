/**
 * Tenant Configuration
 * 
 * Este archivo centraliza toda la configuración del negocio.
 * Para personalizar la plataforma, solo necesitas cambiar las variables
 * de entorno o este archivo de configuración.
 * 
 * En el futuro esto vendrá de una tabla `tenants` en la DB,
 * pero por ahora usamos env vars + defaults.
 */

export type BusinessType = 'retail' | 'food' | 'hardware' | 'clothing' | 'general' | 'church_merch'

export type PlanTier = 'starter' | 'pro' | 'enterprise'

export interface TenantBranding {
  name: string
  shortName: string
  slug: string
  logoUrl: string
  faviconUrl: string
  primaryColor: string
  accentColor: string
  description: string
  url: string
  locale: string
}

export interface TenantTerminology {
  /** Punto de venta físico: "Sucursal", "Campus", "Tienda", "Local" */
  branch: string
  branchPlural: string
  /** Quien vende: "Vendedor", "Cajero", "Voluntario" */
  seller: string
  sellerPlural: string
  /** Admin de sucursal: "Administrador", "Encargado", "Pastor" */
  branchAdmin: string
  /** Manager global: "Gerente", "Administrador" */
  manager: string
  /** El negocio general: "Tienda", "Negocio", "Local" */
  business: string
  /** Cliente: "Cliente", "Comprador" */
  customer: string
  customerPlural: string
}

export interface TenantFeatures {
  whatsapp: boolean
  sumup: boolean
  emailNotifications: boolean
  forecast: boolean
  aiInsights: boolean
  production: boolean
  transfers: boolean
  promotions: boolean
  cashSessions: boolean
  customerDisplay: boolean
  productionTv: boolean
  pricing: boolean
}

export interface TenantConfig {
  branding: TenantBranding
  terminology: TenantTerminology
  features: TenantFeatures
  businessType: BusinessType
  plan: PlanTier
  currency: {
    code: string
    symbol: string
    locale: string
  }
}

// --- Defaults basados en variables de entorno ---

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'VentaFlow'
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

const DEFAULT_BRANDING: TenantBranding = {
  name: appName,
  shortName: appName.split(' ')[0],
  slug: appName.toLowerCase().replace(/\s+/g, '-'),
  logoUrl: '/logo.png',
  faviconUrl: '/favicon.svg',
  primaryColor: '#f59e0b', // amber-500
  accentColor: '#8b5cf6',  // violet-500
  description: `Sistema de Punto de Venta · ${appName}`,
  url: appUrl,
  locale: 'es_CL',
}

const DEFAULT_TERMINOLOGY: TenantTerminology = {
  branch: 'Sucursal',
  branchPlural: 'Sucursales',
  seller: 'Colaborador',
  sellerPlural: 'Colaboradores',
  branchAdmin: 'Administrador',
  manager: 'Gerente',
  business: 'Negocio',
  customer: 'Cliente',
  customerPlural: 'Clientes',
}

const DEFAULT_FEATURES: TenantFeatures = {
  whatsapp: true,
  sumup: true,
  emailNotifications: true,
  forecast: true,
  aiInsights: true,
  production: true,
  transfers: true,
  promotions: true,
  cashSessions: true,
  customerDisplay: true,
  productionTv: true,
  pricing: true,
}

const DEFAULT_CURRENCY = {
  code: 'CLP',
  symbol: '$',
  locale: 'es-CL',
}

/**
 * Configuración del tenant actual.
 * En una versión multi-tenant real, esto se resolvería por subdomain o DB.
 */
export const tenantConfig: TenantConfig = {
  branding: DEFAULT_BRANDING,
  terminology: DEFAULT_TERMINOLOGY,
  features: DEFAULT_FEATURES,
  businessType: (process.env.NEXT_PUBLIC_BUSINESS_TYPE as BusinessType) || 'general',
  plan: (process.env.NEXT_PUBLIC_PLAN as PlanTier) || 'pro',
  currency: DEFAULT_CURRENCY,
}

/**
 * Helper: obtener el nombre completo del tenant
 */
export function getTenantName(): string {
  return tenantConfig.branding.name
}

/**
 * Helper: obtener terminología
 */
export function t(key: keyof TenantTerminology): string {
  return tenantConfig.terminology[key]
}

/**
 * Helper: verificar si un feature está habilitado
 */
export function isFeatureEnabled(feature: keyof TenantFeatures): boolean {
  return tenantConfig.features[feature]
}

/**
 * Presets de terminología por tipo de negocio
 */
export const TERMINOLOGY_PRESETS: Record<BusinessType, Partial<TenantTerminology>> = {
  retail: {
    branch: 'Tienda',
    branchPlural: 'Tiendas',
    seller: 'Vendedor',
    sellerPlural: 'Vendedores',
    branchAdmin: 'Encargado',
    manager: 'Gerente',
    business: 'Tienda',
  },
  food: {
    branch: 'Local',
    branchPlural: 'Locales',
    seller: 'Cajero',
    sellerPlural: 'Cajeros',
    branchAdmin: 'Encargado',
    manager: 'Gerente',
    business: 'Restaurant',
  },
  hardware: {
    branch: 'Sucursal',
    branchPlural: 'Sucursales',
    seller: 'Vendedor',
    sellerPlural: 'Vendedores',
    branchAdmin: 'Encargado',
    manager: 'Gerente',
    business: 'Ferretería',
  },
  clothing: {
    branch: 'Tienda',
    branchPlural: 'Tiendas',
    seller: 'Asesor',
    sellerPlural: 'Asesores',
    branchAdmin: 'Encargado',
    manager: 'Gerente',
    business: 'Tienda',
  },
  general: {
    branch: 'Sucursal',
    branchPlural: 'Sucursales',
    seller: 'Colaborador',
    sellerPlural: 'Colaboradores',
    branchAdmin: 'Administrador',
    manager: 'Gerente',
    business: 'Negocio',
  },
  church_merch: {
    branch: 'Campus',
    branchPlural: 'Campus',
    seller: 'Voluntario',
    sellerPlural: 'Voluntarios',
    branchAdmin: 'Pastor',
    manager: 'ADM Merch',
    business: 'Merch',
  },
}
