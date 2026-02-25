"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useCurrentUser } from "@/lib/auth-context"
import { useMockData } from "@/lib/mock-data-context"
import { PiggyBank, TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

export default function MiAhorroPage() {
  const { currentUser } = useCurrentUser()
  const { getBecarioById, calcularAhorroMensual, calcularAhorroAcumulado, getHistorialAhorro, getMesActual } = useMockData()
  const becario = getBecarioById(currentUser.becarioId)

  if (!becario) {
    return (
      <div className="flex items-center justify-center h-64 p-6">
        <p className="text-muted-foreground">Solo los becarios pueden ver esta pagina.</p>
      </div>
    )
  }

  const mesActual = getMesActual()
  const ahorroMes = calcularAhorroMensual(becario.id, mesActual)
  const ahorroAcumulado = calcularAhorroAcumulado(becario.id)
  const historial = getHistorialAhorro(becario.id)

  // Calculate cumulative savings
  let acumulado = 0
  const historialAcumulado = historial.map((h) => {
    acumulado += h.ahorro
    return { ...h, ahorroAcumulado: acumulado }
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Mi Ahorro</h1>
        <p className="text-sm text-muted-foreground">
          Seguimiento de tu ahorro mensual y acumulado
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro este Mes</CardTitle>
            <div className="rounded-lg p-2 bg-primary/10">
              <PiggyBank className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Q{ahorroMes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              De Q{becario.presupuestoMensual.toLocaleString()} de presupuesto
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro Acumulado</CardTitle>
            <div className="rounded-lg p-2 bg-chart-3/10">
              <TrendingUp className="size-4 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q{ahorroAcumulado.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total de los ultimos meses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Promedio Mensual</CardTitle>
            <div className="rounded-lg p-2 bg-chart-2/10">
              <Minus className="size-4 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Q{historial.length > 0 ? Math.round(ahorroAcumulado / historial.length).toLocaleString() : 0}
            </div>
            <p className="text-xs text-muted-foreground">Ahorro promedio por mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ahorro Acumulado</CardTitle>
            <CardDescription>Crecimiento del ahorro total mes a mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historialAcumulado}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="label" tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.91 0.008 240)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`Q${value.toLocaleString()}`, "Acumulado"]}
                  />
                  <defs>
                    <linearGradient id="ahorroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.45 0.18 160)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.45 0.18 160)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="ahorroAcumulado"
                    stroke="oklch(0.45 0.18 160)"
                    fill="url(#ahorroGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Detalle Mensual</CardTitle>
            <CardDescription>Presupuesto, gastado y ahorrado cada mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historial}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="label" tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.91 0.008 240)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number, name: string) => [
                      `Q${value.toLocaleString()}`,
                      name === "gastado" ? "Gastado" : "Ahorrado",
                    ]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "12px" }}
                    formatter={(v: string) => (v === "gastado" ? "Gastado" : "Ahorrado")}
                  />
                  <Bar dataKey="gastado" fill="oklch(0.50 0.20 30)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="ahorro" fill="oklch(0.45 0.18 160)" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Month-by-month breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Desglose Mes a Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {[...historial].reverse().map((h) => {
              const porcentajeAhorro = h.presupuesto > 0 ? Math.round((h.ahorro / h.presupuesto) * 100) : 0
              return (
                <div key={h.mes} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{h.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Presupuesto: Q{h.presupuesto.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      Gastado: <span className="font-medium">Q{h.gastado.toLocaleString()}</span>
                    </p>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-sm font-semibold text-primary">
                      Q{h.ahorro.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {porcentajeAhorro}% ahorrado
                    </p>
                  </div>
                  {h.ahorro > 0 ? (
                    <ArrowUpRight className="size-4 text-primary shrink-0" />
                  ) : (
                    <ArrowDownRight className="size-4 text-destructive shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
