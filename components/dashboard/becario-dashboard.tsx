"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useCurrentUser } from "@/lib/auth-context"
import { useMockData } from "@/lib/mock-data-context"
import { formatCategoria } from "@/lib/data"
import { Wallet, PiggyBank, TrendingDown, TrendingUp } from "lucide-react"
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

export function BecarioDashboard() {
  const { currentUser } = useCurrentUser()
  const {
    getBecarioById,
    getGastosByBecario,
    calcularGastoMensual,
    calcularAhorroMensual,
    calcularAhorroAcumulado,
    getHistorialAhorro,
    getMesActual,
  } = useMockData()
  const becario = getBecarioById(currentUser.becarioId)

  if (!becario) {
    return (
      <div className="flex items-center justify-center h-64 p-6">
        <p className="text-muted-foreground">No se encontro tu perfil de becario.</p>
      </div>
    )
  }

  const mesActual = getMesActual()
  const gastadoMes = calcularGastoMensual(becario.id, mesActual)
  const ahorroMes = calcularAhorroMensual(becario.id, mesActual)
  const ahorroAcumulado = calcularAhorroAcumulado(becario.id)
  const porcentajeUsado = Math.round((gastadoMes / becario.presupuestoMensual) * 100)
  const gastosRecientes = getGastosByBecario(becario.id)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5)
  const historial = getHistorialAhorro(becario.id)

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          Hola, {becario.nombre}
        </h1>
        <p className="text-sm text-muted-foreground">
          {becario.carrera} - {becario.institucion}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Presupuesto Mensual</CardTitle>
            <div className="rounded-lg p-2 bg-primary/10">
              <Wallet className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q{becario.presupuestoMensual.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Asignacion mensual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gastado este Mes</CardTitle>
            <div className="rounded-lg p-2 bg-chart-4/10">
              <TrendingDown className="size-4 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q{gastadoMes.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={porcentajeUsado} className="h-2 flex-1" />
              <span className="text-xs text-muted-foreground">{porcentajeUsado}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro este Mes</CardTitle>
            <div className="rounded-lg p-2 bg-chart-1/10">
              <PiggyBank className="size-4 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Q{ahorroMes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Disponible sin gastar</p>
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
            <p className="text-xs text-muted-foreground">Total historico ahorrado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Historial Presupuesto vs Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historial}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="label" className="text-xs" tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 11 }} />
                  <YAxis className="text-xs" tick={{ fill: "oklch(0.50 0.02 240)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.91 0.008 240)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number, name: string) => [
                      `Q${value.toLocaleString()}`,
                      name === "gastado" ? "Gastado" : name === "ahorro" ? "Ahorro" : "Presupuesto",
                    ]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "12px" }}
                    formatter={(value: string) =>
                      value === "gastado" ? "Gastado" : value === "ahorro" ? "Ahorro" : "Presupuesto"
                    }
                  />
                  <Bar dataKey="gastado" fill="oklch(0.50 0.20 30)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="ahorro" fill="oklch(0.45 0.18 160)" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gastos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {gastosRecientes.map((gasto) => (
                <div key={gasto.id} className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{gasto.concepto}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCategoria(gasto.categoria)} - {new Date(gasto.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold">Q{gasto.monto.toLocaleString()}</span>
                    <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                      Registrado
                    </Badge>
                  </div>
                </div>
              ))}
              {gastosRecientes.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No hay gastos registrados</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
