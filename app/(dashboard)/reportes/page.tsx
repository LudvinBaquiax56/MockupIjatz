"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetByStudent } from "@/components/reportes/budget-by-student"
import { ExpenseTimeline } from "@/components/reportes/expense-timeline"
import { CategoryBreakdown } from "@/components/reportes/category-breakdown"
import { BecaDistribution } from "@/components/reportes/beca-distribution"
import { useMockData } from "@/lib/mock-data-context"
import { formatMes } from "@/lib/data"

export default function ReportesPage() {
  const { becarios, gastos, getMesActual } = useMockData()

  const mesActual = getMesActual()
  const mesesDisponibles = useMemo(
    () => Array.from(new Set([mesActual, ...gastos.map((g) => g.mes)])).sort((a, b) => b.localeCompare(a)),
    [gastos, mesActual]
  )
  const [mesSeleccionado, setMesSeleccionado] = useState(mesActual)

  const gastosMes = gastos.filter((g) => g.mes === mesSeleccionado)
  const totalPresupuesto = becarios
    .filter((b) => b.estado === "activo")
    .reduce((sum, b) => sum + b.presupuestoMensual, 0)
  const totalGastado = gastosMes.reduce((sum, g) => sum + g.monto, 0)
  const porcentajeUso = totalPresupuesto > 0 ? Math.round((totalGastado / totalPresupuesto) * 100) : 0

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">Reportes</h1>
          <p className="text-sm text-muted-foreground">
            Analisis y visualizacion de datos del programa de becas
          </p>
        </div>
        <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mesesDisponibles.map((m) => (
              <SelectItem key={m} value={m}>{formatMes(m)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Presupuesto Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Q{totalPresupuesto.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Becarios activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Gastado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Q{totalGastado.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{formatMes(mesSeleccionado)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{porcentajeUso}%</p>
            <p className="text-xs text-muted-foreground">Del presupuesto mensual</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="presupuesto" className="flex flex-col gap-4">
        <TabsList className="w-fit">
          <TabsTrigger value="presupuesto">Por Becario</TabsTrigger>
          <TabsTrigger value="timeline">Linea de Tiempo</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="distribucion">Distribucion</TabsTrigger>
        </TabsList>

        <TabsContent value="presupuesto">
          <BudgetByStudent mes={mesSeleccionado} />
        </TabsContent>
        <TabsContent value="timeline">
          <ExpenseTimeline />
        </TabsContent>
        <TabsContent value="categorias">
          <CategoryBreakdown mes={mesSeleccionado} />
        </TabsContent>
        <TabsContent value="distribucion">
          <BecaDistribution />
        </TabsContent>
      </Tabs>
    </div>
  )
}
