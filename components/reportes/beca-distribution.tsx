"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMockData } from "@/lib/mock-data-context"
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
]

const nivelLabel: Record<string, string> = {
  diversificado: "Diversificado",
  universitario: "Universitario",
}

export function BecaDistribution() {
  const { becarios } = useMockData()

  const distribution: Record<string, number> = {}
  becarios.forEach((b) => {
    const label = nivelLabel[b.nivel] ?? b.nivel
    distribution[label] = (distribution[label] || 0) + 1
  })

  const data = Object.entries(distribution).map(([name, value]) => ({ name, value }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Distribucion por Nivel Educativo</CardTitle>
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
