"use client"

import { useMemo, useState } from "react"
import { usePagination } from "@/lib/use-pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMockData } from "@/lib/mock-data-context"
import { formatMes } from "@/lib/data"
import { CheckCircle2, ChevronLeft, ChevronRight, Download, Search, Wallet } from "lucide-react"
import { toast } from "sonner"
import { exportToCSV } from "@/lib/utils"

const estadoStyles: Record<string, string> = {
  pagado: "bg-primary/10 text-primary border-primary/20",
  pendiente: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  retenido: "bg-destructive/10 text-destructive border-destructive/20",
}

export default function PagosPage() {
  const { pagos, descuentos, marcarPagoPagado, getMesActual } = useMockData()
  const [search, setSearch] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")

  const meses = useMemo(() => Array.from(new Set(pagos.map((p) => p.mes))).sort((a, b) => b.localeCompare(a)), [pagos])
  const [filtroMes, setFiltroMes] = useState(() => {
    const actual = getMesActual()
    return meses.includes(actual) ? actual : meses[0] ?? "todos"
  })

  const filtered = pagos.filter((p) => {
    const bySearch =
      p.becarioNombre.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
    const byEstado = filtroEstado === "todos" ? true : p.estado === filtroEstado
    const byMes = filtroMes === "todos" ? true : p.mes === filtroMes
    return bySearch && byEstado && byMes
  })

  const totalNeto = filtered.reduce((sum, p) => sum + p.montoNeto, 0)
  const totalPendiente = filtered.filter((p) => p.estado === "pendiente").reduce((sum, p) => sum + p.montoNeto, 0)
  const totalRetenido = filtered.filter((p) => p.estado === "retenido").reduce((sum, p) => sum + p.montoNeto, 0)
  const { page, setPage, totalPages, paginatedItems: pagosPaginados } = usePagination(filtered, 10)

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">Pagos</h1>
          <p className="text-sm text-muted-foreground">Control de pagos mensuales, descuentos y estado de desembolso</p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            exportToCSV(
              filtered.map((p) => ({
                Becario: p.becarioNombre,
                Mes: p.mes,
                Base: p.montoBase,
                Descuentos: p.descuentos,
                Neto: p.montoNeto,
                Estado: p.estado,
                FechaPago: p.fechaPago ?? "",
              })),
              "pagos"
            )
          }
          className="gap-2 w-fit"
        >
          <Download className="size-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monto Neto</CardTitle>
            <Wallet className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q{totalNeto.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total del filtro actual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q{totalPendiente.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Por pagar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Retenido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q{totalRetenido.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Con observaciones</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar becario o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pagado">Pagado</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="retenido">Retenido</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroMes} onValueChange={setFiltroMes}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los meses</SelectItem>
            {meses.map((mes) => (
              <SelectItem key={mes} value={mes}>
                {formatMes(mes)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Becario</TableHead>
                <TableHead>Mes</TableHead>
                <TableHead className="text-right">Base</TableHead>
                <TableHead className="text-right">Descuentos</TableHead>
                <TableHead className="text-right">Neto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagosPaginados.map((p) => {
                const descCount = descuentos.filter((d) => d.becarioId === p.becarioId && d.mesAplicado === p.mes).length
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{p.becarioNombre}</p>
                        <p className="text-xs text-muted-foreground">{p.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatMes(p.mes)}</TableCell>
                    <TableCell className="text-right">Q{p.montoBase.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {descCount > 0 ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="text-sm underline decoration-dotted underline-offset-2 cursor-pointer hover:text-foreground text-right"
                            >
                              <span className="block">Q{p.descuentos.toLocaleString()}</span>
                              <span className="text-[10px] text-muted-foreground">{descCount} descuento(s)</span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-72 p-3" align="end">
                            <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Descuentos aplicados</p>
                            <div className="flex flex-col gap-2">
                              {descuentos
                                .filter((d) => d.becarioId === p.becarioId && d.mesAplicado === p.mes)
                                .map((d) => (
                                  <div key={d.id} className="flex items-start justify-between gap-2 text-sm">
                                    <div>
                                      <p className="font-medium leading-tight">{d.motivo}</p>
                                      <p className="text-xs text-muted-foreground capitalize">{d.tipo}</p>
                                    </div>
                                    <span className="font-semibold text-destructive shrink-0">-Q{d.monto.toLocaleString()}</span>
                                  </div>
                                ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <span>Q{p.descuentos.toLocaleString()}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold">Q{p.montoNeto.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={estadoStyles[p.estado] || ""}>
                        {p.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {p.estado === "pagado" ? (
                        <span className="text-xs text-muted-foreground">
                          {p.fechaPago ? `Pagado ${p.fechaPago}` : "Pagado"}
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            marcarPagoPagado(p.id)
                            toast.success("Pago marcado como pagado")
                          }}
                          className="h-8"
                        >
                          <CheckCircle2 className="size-4 mr-1" />
                          Marcar pagado
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
              {pagosPaginados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No se encontraron pagos con los filtros actuales
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
          <span>{filtered.length} pago{filtered.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-8" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="size-4" />
            </Button>
            <span className="px-2 text-xs">{page} / {totalPages}</span>
            <Button variant="outline" size="icon" className="size-8" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
