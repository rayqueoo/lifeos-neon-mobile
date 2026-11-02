import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { get, patch, tokenStore } from './api'
import type { User } from './types'
type AuthValue = { user: User; loading: boolean; login: (_email: string, _password: string) => Promise<void>; register: (_email: string, _name: string, _password: string) => Promise<void>; logout: () => Promise<void>; refreshUser: () => Promise<void> }
const AuthContext = createContext<AuthValue | null>(null)
export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useState<User>({ id: 1, full_name: 'Meu LifeOS', email: 'dispositivo local' }); const [loading] = useState(false); const refreshUser = async () => setUser(await get<User>('/auth/me')); const logout = async () => undefined; const login = async (_email: string, _password: string) => undefined; const register = async (_email: string, _name: string, _password: string) => undefined; const value = useMemo(() => ({ user, loading, login, register, logout, refreshUser }), [user, loading]); return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> }
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within AuthProvider'); return context }
export async function saveLocalProfile(name: string) { await patch('/auth/me', { full_name: name }); tokenStore.set('offline') }
