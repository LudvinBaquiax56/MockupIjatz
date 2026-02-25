"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Receipt, TrendingDown, PiggyBank, Users } from "lucide-react"
import { useMockData } from "@/lib/mock-data-context"

export function GastosSummary() {
  const { gastos, becarios, getMesActual } = useMockData()
  const mesActual = getMesActual()
  const activos = becarios.filter((b) => b.estado === "activo")
  const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0)
  const totalMesActual = gastos.filter((g) => g.mes === mesActual).reduce((sum, g) => sum + g.monto, 0)
  const presupuestoTotal = activos.reduce((sum, b) => sum + b.presupuestoMensual, 0)
  const disponible = Math.max(0, presupuestoTotal - totalMesActual)

  const cards = [
    {
      label: "Total Gastos",
      value: `Q${totalGastos.toLocaleString()}`,
      sub: `${gastos.length} registros`,
      icon: Receipt,
      color: "text-foreground",
      bg: "bg-muted",
    },
    {
      label: `Gastado (${mesActual})`,
      value: `Q${totalMesActual.toLocaleString()}`,
      sub: "Consumo del mes actual",
      icon: TrendingDown,
      color: "text-chart-4",
      bg: "bg-chart-4/10",
    },
    {
      label: `Disponible (${mesActual})`,
      value: `Q${disponible.toLocaleString()}`,
      sub: "Presupuesto restante",
      icon: PiggyBank,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Becarios Activos",
      value: activos.length.toString(),
      sub: `Q${presupuestoTotal.toLocaleString()} presupuesto total`,
      icon: Users,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className={`rounded-lg p-2.5 ${c.bg}`}>
              <c.icon className={`size-5 ${c.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="text-lg font-bold">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
