'use client'

import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react'
import {
  tenantConfig,
  TERMINOLOGY_PRESETS,
  type TenantConfig,
  type TenantTerminology,
  type TenantFeatures,
  type TenantBranding,
  type BusinessType,
} from './tenant'

// --- Context ---

interface TenantContextValue extends TenantConfig {
  /** Tipo de negocio resuelto del campus del usuario */
  resolvedBusinessType: BusinessType
  /** Nombre del negocio del campus (ej: "Ferretería Don Pedro") */
  businessName: string | null
  /** Actualizar el tipo de negocio dinámicamente (llamado tras login) */
  setBusinessContext: (businessType: BusinessType, businessName?: string | null) => void
}

const TenantContext = createContext<TenantContextValue>({
  ...tenantConfig,
  resolvedBusinessType: tenantConfig.businessType,
  businessName: null,
  setBusinessContext: () => {},
})

// --- Provider ---

interface TenantProviderProps {
  children: ReactNode
}

/**
 * TenantProvider dinámico.
 * 
 * Flujo:
 * 1. Arranca con la config estática (env vars / defaults → "VentaFlow" general)
 * 2. Cuando el usuario se logea, el dashboard layout lee el business_type
 *    de su campus y llama a setBusinessContext()
 * 3. La terminología, roles labels, y branding se actualizan dinámicamente
 * 
 * Para roles globales (super_admin/adm_merch) que ven todos los campus,
 * se mantiene la terminología "general" (Sucursal, Vendedor, etc.)
 */
export function TenantProvider({ children }: TenantProviderProps) {
  const [businessType, setBusinessType] = useState<BusinessType>(tenantConfig.businessType)
  const [businessName, setBusinessName] = useState<string | null>(null)

  const setBusinessContext = useCallback((bt: BusinessType, name?: string | null) => {
    setBusinessType(bt)
    setBusinessName(name ?? null)
  }, [])

  const config = useMemo<TenantContextValue>(() => {
    // Resolver terminología según el tipo de negocio del campus
    const preset = TERMINOLOGY_PRESETS[businessType] ?? TERMINOLOGY_PRESETS.general
    const terminology: TenantTerminology = {
      ...tenantConfig.terminology,
      ...preset,
    }

    return {
      ...tenantConfig,
      businessType,
      terminology,
      resolvedBusinessType: businessType,
      businessName,
      setBusinessContext,
    }
  }, [businessType, businessName, setBusinessContext])

  return (
    <TenantContext.Provider value={config}>
      {children}
    </TenantContext.Provider>
  )
}

// --- Hooks ---

/**
 * Accede a la configuración completa del tenant (incluyendo business_type resuelto)
 */
export function useTenant(): TenantContextValue {
  return useContext(TenantContext)
}

/**
 * Accede solo al branding del tenant
 */
export function useBranding(): TenantBranding {
  const { branding } = useContext(TenantContext)
  return branding
}

/**
 * Accede a la terminología del tenant (dinámica según campus).
 * Ejemplo: const { branch, seller } = useTerminology()
 * 
 * Si el usuario está en un campus tipo "food":
 *   branch = "Local", seller = "Cajero"
 * Si el usuario está en un campus tipo "hardware":
 *   branch = "Sucursal", seller = "Vendedor"
 */
export function useTerminology(): TenantTerminology {
  const { terminology } = useContext(TenantContext)
  return terminology
}

/**
 * Hook para verificar si un feature está habilitado.
 * Ejemplo: const enabled = useFeature('whatsapp')
 */
export function useFeature(feature: keyof TenantFeatures): boolean {
  const { features } = useContext(TenantContext)
  return features[feature]
}

/**
 * Hook para formatear moneda según config del tenant.
 * Ejemplo: const fmt = useCurrency(); fmt(15000) → "$15.000"
 */
export function useCurrency() {
  const { currency } = useContext(TenantContext)

  return useMemo(() => {
    const formatter = new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return (amount: number) => formatter.format(amount)
  }, [currency.locale, currency.code])
}

/**
 * Hook para acceder al setter de business context.
 * Usado en el dashboard layout después del login.
 */
export function useSetBusinessContext() {
  const { setBusinessContext } = useContext(TenantContext)
  return setBusinessContext
}
