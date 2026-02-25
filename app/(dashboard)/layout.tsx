"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { AuthProvider, useCurrentUser } from "@/lib/auth-context"
import { MockDataProvider } from "@/lib/mock-data-context"
import { usuarios, formatRol } from "@/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UserCircle } from "lucide-react"

function RoleSelector() {
  const { currentUser, setCurrentUser } = useCurrentUser()

  const rolColors: Record<string, string> = {
    director: "bg-amber-100 text-amber-800 border-amber-200",
    encargada: "bg-teal-100 text-teal-800 border-teal-200",
    secretaria: "bg-sky-100 text-sky-800 border-sky-200",
    tesorero: "bg-orange-100 text-orange-800 border-orange-200",
    becario: "bg-emerald-100 text-emerald-800 border-emerald-200",
  }

  return (
    <div className="flex items-center gap-3 ml-auto">
      <Badge variant="outline" className={`${rolColors[currentUser.rol]} text-xs font-medium`}>
        {formatRol(currentUser.rol)}
      </Badge>
      <Select
        value={currentUser.id}
        onValueChange={(id) => {
          const user = usuarios.find((u) => u.id === id)
          if (user) setCurrentUser(user)
        }}
      >
        <SelectTrigger className="w-[220px] h-8 text-xs">
          <div className="flex items-center gap-2">
            <UserCircle className="size-4 text-muted-foreground" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {usuarios.map((u) => (
            <SelectItem key={u.id} value={u.id}>
              <span className="text-xs">
                {u.nombre} {u.apellido} - {formatRol(u.rol)}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function DashboardInner({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-semibold text-foreground">BecaControl</span>
          <RoleSelector />
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
    <AuthProvider>
      <MockDataProvider>
        <DashboardInner>{children}</DashboardInner>
      </MockDataProvider>
    </AuthProvider>
  )
}
