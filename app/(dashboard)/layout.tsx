"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { MockDataProvider } from "@/lib/mock-data-context"
import { useCurrentUser, formatRol } from "@/lib/auth-context"

const rolColors: Record<string, string> = {
  director: "bg-amber-100 text-amber-800 border-amber-200",
  encargada: "bg-teal-100 text-teal-800 border-teal-200",
  secretaria: "bg-sky-100 text-sky-800 border-sky-200",
  tesorero: "bg-orange-100 text-orange-800 border-orange-200",
  becario: "bg-emerald-100 text-emerald-800 border-emerald-200",
}

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthenticated, logout } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login")
  }, [isAuthenticated, router])

  if (!isAuthenticated || !currentUser) return null

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-semibold text-foreground">BecaControl</span>
          <div className="flex items-center gap-3 ml-auto">
            <Badge
              variant="outline"
              className={`${rolColors[currentUser.rol]} text-xs font-medium`}
            >
              {formatRol(currentUser.rol)}
            </Badge>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {currentUser.nombre} {currentUser.apellido}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:block text-xs">Cerrar sesion</span>
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MockDataProvider>
      <DashboardInner>{children}</DashboardInner>
    </MockDataProvider>
  )
}
