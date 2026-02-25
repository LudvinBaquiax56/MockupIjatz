"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCategoria, formatMes } from "@/lib/data"
import { useMockData } from "@/lib/mock-data-context"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const COLORS = [
  "oklch(0.45 0.18 160)",
  "oklch(0.55 0.15 200)",
  "oklch(0.65 0.12 80)",
  "oklch(0.50 0.20 30)",
  "oklch(0.60 0.10 280)",
]

export function DashboardCharts() {
  const { gastos } = useMockData()
  const catMap: Record<string, number> = {}
  const mesMap: Record<string, number> = {}

  gastos.forEach((g) => {
    catMap[g.categoria] = (catMap[g.categoria] || 0) + g.monto
    mesMap[g.mes] = (mesMap[g.mes] || 0) + g.monto
  })

  const gastosPorCategoria = Object.entries(catMap).map(([name, value]) => ({
    name: formatCategoria(name),
    value,
  }))
  const gastosPorMes = Object.entries(mesMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, monto]) => ({ mes: formatMes(mes), monto }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gastos por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gastosPorMes}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mes" className="text-xs" tick={{ fill: "oklch(0.50 0.02 240)" }} />
                <YAxis className="text-xs" tick={{ fill: "oklch(0.50 0.02 240)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.91 0.008 240)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`Q${value.toLocaleString()}`, "Monto"]}
                />
                <Bar dataKey="monto" fill="oklch(0.45 0.18 160)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gastosPorCategoria}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {gastosPorCategoria.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.91 0.008 240)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`Q${value.toLocaleString()}`, "Monto"]}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
