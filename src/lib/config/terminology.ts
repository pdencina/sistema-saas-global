/**
 * Terminología del Sistema
 * 
 * Este archivo centraliza todos los términos que se muestran en la UI
 * y que varían según el tipo de negocio.
 * 
 * La fuente principal es `tenantConfig.terminology` en tenant.ts.
 * Este archivo provee helpers adicionales para uso en componentes.
 * 
 * MAPEO DE CONCEPTOS:
 * ┌─────────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
 * │ Concepto        │ Ferretería   │ Cafetería    │ Retail       │ Iglesia      │
 * ├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 * │ branch (DB:     │ Sucursal     │ Local        │ Tienda       │ Campus       │
 * │ campus)         │              │              │              │              │
 * ├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 * │ seller (DB:     │ Vendedor     │ Cajero       │ Asesor       │ Voluntario   │
 * │ voluntario)     │              │              │              │              │
 * ├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 * │ branchAdmin     │ Encargado    │ Encargado    │ Encargado    │ Pastor       │
 * │ (DB: admin)     │              │              │              │              │
 * ├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 * │ manager (DB:    │ Gerente      │ Gerente      │ Gerente      │ ADM Merch    │
 * │ adm_merch)      │              │              │              │              │
 * └─────────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
 * 
 * NOTA: Los valores en la base de datos (campus, voluntario, admin, adm_merch)
 * NO se cambian. Solo cambia lo que se muestra al usuario en la UI.
 */

import { tenantConfig, type TenantTerminology } from './tenant'

/**
 * Obtener un término de la terminología del tenant.
 * Alias corto para usar en componentes.
 * 
 * @example
 * // En un componente:
 * <p>Selecciona una {term('branch')}</p>
 * // Renderiza: "Selecciona una Sucursal" (o "Local", "Tienda", etc.)
 */
export function term(key: keyof TenantTerminology): string {
  return tenantConfig.terminology[key]
}

/**
 * Obtener un término en minúsculas (útil para uso inline).
 * 
 * @example
 * <p>Vista de tu {termLower('branch')}</p>
 * // Renderiza: "Vista de tu sucursal"
 */
export function termLower(key: keyof TenantTerminology): string {
  return tenantConfig.terminology[key].toLowerCase()
}

/**
 * Construir frase "Todas las {sucursales}" o "Todos los {campus}"
 * usando el género correcto automáticamente.
 */
export function allBranches(): string {
  const plural = tenantConfig.terminology.branchPlural
  // Heurística simple para género en español
  const isFeminine = plural.endsWith('as') || plural.endsWith('es')
  return `${isFeminine ? 'Todas las' : 'Todos los'} ${plural.toLowerCase()}`
}

/**
 * Textos comunes que combinan terminología.
 * Útil para headers y descripciones que se repiten.
 */
export const commonPhrases = {
  /** "Vista global · Todas las sucursales" */
  get globalView() {
    return `Vista global · ${allBranches()}`
  },
  /** "Vista de tu sucursal" */
  get localView() {
    return `Vista de tu ${termLower('branch')}`
  },
  /** "Seleccionar sucursal" */
  get selectBranch() {
    return `Seleccionar ${termLower('branch')}`
  },
  /** "Nuevo vendedor" */
  get newSeller() {
    return `Nuevo ${termLower('seller')}`
  },
  /** "Sin sucursal asignada" */
  get noBranchAssigned() {
    return `Sin ${termLower('branch')} asignada`
  },
}
