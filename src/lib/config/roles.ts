/**
 * Roles Configuration
 * 
 * Los valores de rol en la DB se mantienen como están (super_admin, adm_merch, admin, voluntario)
 * para no requerir migración. Este archivo mapea esos valores a labels configurables
 * que se muestran en la UI.
 * 
 * En una versión futura multi-tenant, cada tenant podría definir sus propios labels.
 */

import { tenantConfig } from './tenant'

/** Roles almacenados en la DB (no cambiar — son enums de Postgres) */
export type RoleKey = 'super_admin' | 'adm_merch' | 'admin' | 'voluntario'

/** Información de un rol para mostrar en UI */
export interface RoleInfo {
  key: RoleKey
  label: string
  description: string
  /** Color del badge en la UI */
  badgeClass: string
  /** Es un rol con acceso global (multi-sucursal) */
  isGlobal: boolean
  /** Nivel de jerarquía (mayor = más privilegios) */
  level: number
}

/**
 * Genera la configuración de roles usando la terminología del tenant actual
 */
function buildRoleConfig(): Record<RoleKey, RoleInfo> {
  const term = tenantConfig.terminology

  return {
    super_admin: {
      key: 'super_admin',
      label: 'Super Admin',
      description: `Acceso total · Todas las ${term.branchPlural.toLowerCase()}`,
      badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      isGlobal: true,
      level: 100,
    },
    adm_merch: {
      key: 'adm_merch',
      label: term.manager,
      description: `Gestión operacional · Multi ${term.branch.toLowerCase()}`,
      badgeClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      isGlobal: true,
      level: 80,
    },
    admin: {
      key: 'admin',
      label: term.branchAdmin,
      description: `${term.branchAdmin} de ${term.branch.toLowerCase()}`,
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      isGlobal: false,
      level: 60,
    },
    voluntario: {
      key: 'voluntario',
      label: term.seller,
      description: `Ventas y punto de venta`,
      badgeClass: 'bg-green-500/10 text-green-400 border-green-500/20',
      isGlobal: false,
      level: 20,
    },
  }
}

/** Configuración de roles (se recalcula si cambia el tenant) */
export const ROLES = buildRoleConfig()

/** Obtener info de un rol */
export function getRoleInfo(role: RoleKey | string | null): RoleInfo {
  if (!role) return ROLES.voluntario
  return ROLES[role as RoleKey] ?? ROLES.voluntario
}

/** Verificar si un rol tiene acceso global */
export function isGlobalRole(role: string | null | undefined): boolean {
  if (!role) return false
  return ROLES[role as RoleKey]?.isGlobal ?? false
}

/** Obtener el label de un rol */
export function getRoleLabel(role: string | null | undefined): string {
  if (!role) return ROLES.voluntario.label
  return ROLES[role as RoleKey]?.label ?? role
}

/** Lista de roles para selects en formularios */
export function getRoleOptions(): { value: RoleKey; label: string }[] {
  return [
    { value: 'voluntario', label: ROLES.voluntario.label },
    { value: 'admin', label: ROLES.admin.label },
    { value: 'adm_merch', label: ROLES.adm_merch.label },
    { value: 'super_admin', label: ROLES.super_admin.label },
  ]
}
