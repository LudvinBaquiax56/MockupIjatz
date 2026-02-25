"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { becarios } from "@/lib/data"
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
]

export function BecaDistribution() {
  const distribution: Record<string, number> = {}
  becarios.forEach((b) => {
    const label =
      b.tipoBeca === "completa"
        ? "Completa"
        : b.tipoBeca === "parcial"
        ? "Parcial"
        : "Investigacion"
    distribution[label] = (distribution[label] || 0) + 1
  })

  const data = Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Distribucion por Tipo de Beca
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
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
                label={({ name, value }) => `${name}: ${value}`}
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
  )
}
