"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { type Usuario, type Rol, usuarios, formatRol } from "@/lib/data"

const PASSWORD = "admin"
const STORAGE_KEY = "beca_user_id"

interface AuthContextType {
  currentUser: Usuario | null
  isAuthenticated: boolean
  isBecario: boolean
  isAdmin: boolean
  isTesorero: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY)
    if (savedId) {
      const user = usuarios.find((u) => u.id === savedId)
      if (user) {
        setCurrentUser(user)
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  function login(username: string, password: string): boolean {
    if (password !== PASSWORD) return false
    const user = usuarios.find((u) => u.username === username.toLowerCase().trim())
    if (!user) return false
    localStorage.setItem(STORAGE_KEY, user.id)
    setCurrentUser(user)
    setIsAuthenticated(true)
    return true
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setCurrentUser(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  const isBecario = currentUser?.rol === "becario"
  const isAdmin = currentUser ? currentUser.rol !== "becario" : false
  const isTesorero = currentUser?.rol === "tesorero"

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, isBecario, isAdmin, isTesorero, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useCurrentUser() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useCurrentUser must be used inside AuthProvider")
  return ctx
}

export { formatRol }
export type { Rol }
