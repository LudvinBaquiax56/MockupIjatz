"use client"

import { useCurrentUser } from "@/lib/auth-context"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingReminders } from "@/components/dashboard/upcoming-reminders"
import { BecarioDashboard } from "@/components/dashboard/becario-dashboard"
import { formatRol } from "@/lib/data"

export default function DashboardPage() {
  const { currentUser, isBecario } = useCurrentUser()

  if (isBecario) {
    return <BecarioDashboard />
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Bienvenido, {currentUser.nombre} - {formatRol(currentUser.rol)}
        </p>
      </div>

      <DashboardStats />
      <DashboardCharts />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <UpcomingReminders />
      </div>
    </div>
  )
}
