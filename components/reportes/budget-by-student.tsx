"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMockData } from "@/lib/mock-data-context"
import { formatMes } from "@/lib/data"
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
  const { becarios, gastos, calcularGastoMensual } = useMockData()

  const mesesDisponibles = useMemo(
    () => Array.from(new Set(gastos.map((g) => g.mes))).sort((a, b) => b.localeCompare(a)),
    [gastos]
  )

  const [mesLocal, setMesLocal] = useState(mes)

  const data = becarios
    .filter((b) => b.estado === "activo")
    .map((b) => ({
      nombre: `${b.nombre} ${b.apellido.split(" ")[0]}`,
      presupuesto: b.presupuestoMensual,
      gastado: calcularGastoMensual(b.id, mesLocal),
      disponible: Math.max(0, b.presupuestoMensual - calcularGastoMensual(b.id, mesLocal)),
    }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-base">Presupuesto vs Gastos por Becario</CardTitle>
          <Select value={mesLocal} onValueChange={setMesLocal}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mesesDisponibles.map((m) => (
                <SelectItem key={m} value={m}>{formatMes(m)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
