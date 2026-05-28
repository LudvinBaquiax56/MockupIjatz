"use client"

import { useState } from "react"
import { GastosTable } from "@/components/gastos/gastos-table"
import { AddGastoDialog } from "@/components/gastos/add-gasto-dialog"
import { GastosSummary } from "@/components/gastos/gastos-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, ChevronDown, ChevronRight, Download } from "lucide-react"
import { useMockData } from "@/lib/mock-data-context"
import { CATEGORIAS_GASTO, formatCategoria, formatMes, formatEstado } from "@/lib/data"
import { exportToCSV } from "@/lib/utils"

function ResumenBecario({
  becario,
  gastosDelMes,
}: {
  becario: { id: string; nombre: string; apellido: string; estado: string; presupuestoMensual: number }
  gastosDelMes: { id: string; concepto: string; categoria: string; monto: number; fecha: string }[]
}) {
  const [expanded, setExpanded] = useState(false)
  const total = gastosDelMes.reduce((s, g) => s + g.monto, 0)
  const pct = Math.min(100, Math.round((total / becario.presupuestoMensual) * 100))
  const sobrePpto = total > becario.presupuestoMensual

  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="text-muted-foreground">
          {expanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </span>
        <span className="font-medium text-sm flex-1 min-w-0 truncate">
          {becario.nombre} {becario.apellido}
        </span>
        <Badge
          variant="outline"
          className={`text-[11px] hidden sm:inline-flex ${
            becario.estado === "activo"
              ? "bg-primary/10 text-primary border-primary/20"
              : becario.estado === "pendiente"
              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
              : "bg-muted text-muted-foreground border-border"
          }`}
        >
          {formatEstado(becario.estado)}
        </Badge>
        <div className="w-32 hidden md:block">
          <Progress value={pct} className={`h-2 ${sobrePpto ? "[&>div]:bg-destructive" : ""}`} />
        </div>
        <span className={`text-sm font-medium tabular-nums w-24 text-right ${sobrePpto ? "text-destructive" : ""}`}>
          Q{total.toLocaleString("es-MX")}
          <span className="text-xs text-muted-foreground font-normal"> / Q{becario.presupuestoMensual.toLocaleString("es-MX")}</span>
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-3 pt-1 bg-muted/20">
          {gastosDelMes.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">Sin gastos registrados este mes</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs h-8">Concepto</TableHead>
                  <TableHead className="text-xs h-8 hidden sm:table-cell">Categoría</TableHead>
                  <TableHead className="text-xs h-8 hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-xs h-8 text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gastosDelMes.map((g) => (
                  <TableRow key={g.id} className="hover:bg-transparent">
                    <TableCell className="text-xs py-1.5">{g.concepto}</TableCell>
                    <TableCell className="text-xs py-1.5 hidden sm:table-cell text-muted-foreground">
                      {formatCategoria(g.categoria)}
                    </TableCell>
                    <TableCell className="text-xs py-1.5 hidden md:table-cell text-muted-foreground">
                      {new Date(g.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                    </TableCell>
                    <TableCell className="text-xs py-1.5 text-right tabular-nums font-medium">
                      Q{g.monto.toLocaleString("es-MX")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  )
}

export default function GastosPage() {
  const { gastos, becarios, addGasto, deleteGasto, getMesActual } = useMockData()
  const [search, setSearch] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState("todas")
  const [showAdd, setShowAdd] = useState(false)

  const mesActual = getMesActual()
  const mesesDisponibles = Array.from(
    new Set([mesActual, ...gastos.map((g) => g.mes)])
  ).sort((a, b) => b.localeCompare(a))

  const [mesSeleccionado, setMesSeleccionado] = useState(mesActual)
  const [filtroNivelResumen, setFiltroNivelResumen] = useState("todos")

  const filtered = gastos.filter((g) => {
    const matchSearch =
      g.concepto.toLowerCase().includes(search.toLowerCase()) ||
      g.becarioNombre.toLowerCase().includes(search.toLowerCase())
    const matchCategoria =
      filtroCategoria === "todas" || g.categoria === filtroCategoria
    return matchSearch && matchCategoria
  })

  const becariosFiltradosResumen = becarios.filter((b) =>
    filtroNivelResumen === "todos" || b.nivel === filtroNivelResumen
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Control de Gastos
          </h1>
          <p className="text-sm text-muted-foreground">
            Registro y seguimiento de gastos de becarios
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              exportToCSV(
                filtered.map((g) => ({
                  Concepto: g.concepto,
                  Becario: g.becarioNombre,
                  Categoria: formatCategoria(g.categoria),
                  Monto: g.monto,
                  Fecha: g.fecha,
                  Mes: g.mes,
                })),
                "gastos"
              )
            }
            className="gap-2"
          >
            <Download className="size-4" />
            Exportar CSV
          </Button>
          <Button onClick={() => setShowAdd(true)} className="gap-2">
            <Plus className="size-4" />
            Registrar Gasto
          </Button>
        </div>
      </div>

      <GastosSummary />

      <Tabs defaultValue="todos">
        <TabsList>
          <TabsTrigger value="todos">Todos los gastos</TabsTrigger>
          <TabsTrigger value="resumen">Resumen por becario</TabsTrigger>
        </TabsList>

        {/* ── Tab todos los gastos ── */}
        <TabsContent value="todos" className="mt-4">
          <div className="flex flex-col gap-3 sm:flex-row mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar gasto o becario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorias</SelectItem>
                {CATEGORIAS_GASTO.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <GastosTable gastos={filtered} onDelete={deleteGasto} />
        </TabsContent>

        {/* ── Tab resumen por becario ── */}
        <TabsContent value="resumen" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-base">Gastos del mes por becario</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Select value={filtroNivelResumen} onValueChange={setFiltroNivelResumen}>
                  <SelectTrigger className="h-8 text-xs w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los niveles</SelectItem>
                    <SelectItem value="diversificado">Diversificado</SelectItem>
                    <SelectItem value="universitario">Universitario</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
                  <SelectTrigger className="h-8 text-xs w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mesesDisponibles.map((m) => (
                      <SelectItem key={m} value={m}>
                        {formatMes(m)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {becariosFiltradosResumen.map((b) => {
                  const gastosDelMes = gastos.filter(
                    (g) => g.becarioId === b.id && g.mes === mesSeleccionado
                  )
                  return (
                    <ResumenBecario
                      key={b.id}
                      becario={b}
                      gastosDelMes={gastosDelMes}
                    />
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddGastoDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        becarios={becarios}
        onSubmit={(data) => addGasto(data)}
      />
    </div>
  )
}
