"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMockData } from "@/lib/mock-data-context"
import { formatCategoria } from "@/lib/data"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const COLORS = [
  "oklch(0.45 0.18 160)",
  "oklch(0.55 0.15 200)",
  "oklch(0.65 0.12 80)",
  "oklch(0.50 0.20 30)",
  "oklch(0.60 0.10 280)",
]

export function CategoryBreakdown({ mes }: { mes: string }) {
  const { gastos } = useMockData()

  const filtrados = gastos.filter((g) => g.mes === mes)
  const categorias: Record<string, number> = {}
  filtrados.forEach((g) => {
    categorias[g.categoria] = (categorias[g.categoria] || 0) + g.monto
  })
  const data = Object.entries(categorias).map(([name, value]) => ({
    name: formatCategoria(name),
    value,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Desglose por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-100">
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              Sin gastos registrados este mes
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.91 0.008 240)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [
                    `Q${value.toLocaleString()}`,
                    "Monto",
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
