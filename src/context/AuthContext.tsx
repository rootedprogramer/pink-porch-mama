import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Stage } from '../data/stages'

export interface Profile {
  id: string
  name: string
  stage: Stage
  stage_date: string | null
  faith_mode: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  profile: Profile | null
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null, loading: true, profile: null, signOut: async () => {}, refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    if (data) {
      setProfile({
        id: data.id,
        name: data.name,
        stage: (data.stage ?? 'postpartum') as Stage,
        stage_date: data.stage_date ?? data.baby_birthday ?? null,
        faith_mode: !!data.faith_mode,
      })
    } else {
      setProfile(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) void fetchProfile(session.user.id)
      else setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
      if (session?.user) void fetchProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => { await supabase.auth.signOut() }
  const refreshProfile = async () => { if (user) await fetchProfile(user.id) }

  return (
    <AuthContext.Provider value={{ user, loading, profile, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
