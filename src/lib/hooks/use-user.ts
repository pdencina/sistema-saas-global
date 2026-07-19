'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { isGlobalRole as checkGlobalRole } from '@/lib/config/roles'
import type { Profile, UserRole } from '@/types'

interface UseUserReturn {
  profile: Profile | null
  role: UserRole | null
  loading: boolean
  /** Tiene acceso de administración (admin, manager, o super_admin) */
  isAdmin: boolean
  /** Es super admin */
  isSuperAdmin: boolean
  /** Es manager (adm_merch en DB) — gestión operacional multi-sucursal */
  isManager: boolean
  /** Es vendedor/cajero (voluntario en DB) — solo POS */
  isCashier: boolean
  /** Tiene acceso global (ve todas las sucursales) */
  isGlobalRole: boolean
  campusId: string | null

  // --- Deprecated aliases (para backward compat durante migración) ---
  /** @deprecated usar isManager */
  isAdmMerch: boolean
  /** @deprecated usar isCashier */
  isVoluntario: boolean
}

export function useUser(): UseUserReturn {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data as Profile | null)
      setLoading(false)
    }

    getProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      getProfile()
    })

    return () => subscription.unsubscribe()
  }, [])

  const role = profile?.role ?? null

  const isSuperAdmin = role === 'super_admin'
  const isManager = role === 'adm_merch'
  const isCashier = role === 'voluntario'
  const isGlobal = checkGlobalRole(role)

  return {
    profile,
    role,
    loading,
    isSuperAdmin,
    isManager,
    isAdmin: role === 'admin' || isManager || isSuperAdmin,
    isCashier,
    isGlobalRole: isGlobal,
    campusId: profile?.campus_id ?? null,

    // Deprecated aliases
    isAdmMerch: isManager,
    isVoluntario: isCashier,
  }
}
