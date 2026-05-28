"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMockData } from "@/lib/mock-data-context"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export function BudgetByStudent({ mes }: { mes: string }) {
  const { becarios, calcularGastoMensual } = useMockData()
  const data = becarios
    .filter((b) => b.estado === "activo")
    .map((b) => ({
      nombre: `${b.nombre} ${b.apellido.split(" ")[0]}`,
      presupuesto: b.presupuestoMensual,
      gastado: calcularGastoMensual(b.id, mes),
      disponible: Math.max(0, b.presupuestoMensual - calcularGastoMensual(b.id, mes)),
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Presupuesto vs Gastos por Becario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                type="number"
                tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 12 }}
              />
              <YAxis
                dataKey="nombre"
                type="category"
                width={120}
                tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.91 0.008 240)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`Q${value.toLocaleString()}`]}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                dataKey="gastado"
                name="Gastado"
                fill="oklch(0.45 0.18 160)"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="disponible"
                name="Disponible"
                fill="oklch(0.55 0.15 200)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
