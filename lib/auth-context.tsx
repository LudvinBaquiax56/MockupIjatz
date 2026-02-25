"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Usuario, type Rol, usuarios, formatRol } from "@/lib/data"

interface AuthContextType {
  currentUser: Usuario
  setCurrentUser: (user: Usuario) => void
  isBecario: boolean
  isAdmin: boolean
  isTesorero: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Usuario>(usuarios[0]) // Director by default

  const isBecario = currentUser.rol === "becario"
  const isAdmin = currentUser.rol !== "becario"
  const isTesorero = currentUser.rol === "tesorero"

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isBecario, isAdmin, isTesorero }}>
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
