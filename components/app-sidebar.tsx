"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  CalendarDays,
  GraduationCap,
  Settings,
  PiggyBank,
  Receipt,
  Banknote,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useCurrentUser } from "@/lib/auth-context"
import type { Rol } from "@/lib/data"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: Rol[] | "all"
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard, roles: "all" },
  { title: "Becarios", href: "/becarios", icon: Users, roles: ["director", "encargada", "secretaria", "tesorero"] },
  { title: "Mis Gastos", href: "/mis-gastos", icon: Receipt, roles: ["becario"] },
  { title: "Mi Ahorro", href: "/mi-ahorro", icon: PiggyBank, roles: ["becario"] },
  { title: "Gastos", href: "/gastos", icon: Wallet, roles: ["director", "encargada", "secretaria"] },
  { title: "Pagos", href: "/pagos", icon: Banknote, roles: ["tesorero", "director"] },
  { title: "Reportes", href: "/reportes", icon: BarChart3, roles: ["director", "encargada", "tesorero"] },
  { title: "Calendario", href: "/calendario", icon: CalendarDays, roles: "all" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { currentUser } = useCurrentUser()

  const visibleItems = navItems.filter(
    (item) => item.roles === "all" || item.roles.includes(currentUser.rol)
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <GraduationCap className="size-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
              BecaControl
            </span>
            <span className="text-[10px] text-sidebar-foreground/60">
              Sistema de Becarios
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegacion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Configuracion">
              <Settings className="size-4" />
              <span>Configuracion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
