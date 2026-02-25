"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGastosPorMes } from "@/lib/data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export function ExpenseTimeline() {
  const data = getGastosPorMes()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Evolucion de Gastos Mensuales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorMonto" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.45 0.18 160)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.45 0.18 160)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="mes"
                tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 12 }}
              />
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
              <Area
                type="monotone"
                dataKey="monto"
                stroke="oklch(0.45 0.18 160)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMonto)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
