"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Wallet, TrendingUp, PiggyBank } from "lucide-react"
import { useMockData } from "@/lib/mock-data-context"

export function DashboardStats() {
  const { becarios, gastos, calcularAhorroMensual, getMesActual } = useMockData()
  const mesActual = getMesActual()
  const activos = becarios.filter((b) => b.estado === "activo")
  const totalBecarios = activos.length
  const totalGastos = gastos.filter((g) => g.mes === mesActual).reduce((sum, g) => sum + g.monto, 0)
  const presupuestoTotal = activos.reduce((sum, b) => sum + b.presupuestoMensual, 0)
  const ahorroTotal = activos.reduce((sum, b) => sum + calcularAhorroMensual(b.id, mesActual), 0)

  const stats = [
    {
      title: "Becarios Activos",
      value: totalBecarios.toString(),
      description: `${becarios.length} registrados en total`,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Gastos del Periodo",
      value: `Q${totalGastos.toLocaleString()}`,
      description: `De Q${presupuestoTotal.toLocaleString()} presupuesto`,
      icon: Wallet,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      title: "Tasa de Uso",
      value: `${presupuestoTotal > 0 ? Math.round((totalGastos / presupuestoTotal) * 100) : 0}%`,
      description: "Del presupuesto utilizado",
      icon: TrendingUp,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
    {
      title: `Ahorro Total (${mesActual})`,
      value: `Q${ahorroTotal.toLocaleString()}`,
      description: "Ahorro combinado del mes",
      icon: PiggyBank,
      color: "text-chart-5",
      bg: "bg-chart-5/10",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bg}`}>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
