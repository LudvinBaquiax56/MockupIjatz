"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCurrentUser } from "@/lib/auth-context"

export default function LoginPage() {
  const { isAuthenticated, login } = useCurrentUser()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) router.replace("/")
  }, [isAuthenticated, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const ok = login(username, password)
    setLoading(false)
    if (ok) {
      router.push("/")
    } else {
      setError("Usuario o contrasenia incorrectos")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
              <GraduationCap className="size-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <CardTitle className="text-xl font-bold">BecaControl</CardTitle>
            <CardDescription>Sistema de Gestion de Becarios</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="director, encargada, maria..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Contrasenia</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar Sesion"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
