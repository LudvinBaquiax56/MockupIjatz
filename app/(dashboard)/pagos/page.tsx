"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMockData } from "@/lib/mock-data-context"
import { CheckCircle2, Search, Wallet } from "lucide-react"
import { toast } from "sonner"

const estadoStyles: Record<string, string> = {
  pagado: "bg-primary/10 text-primary border-primary/20",
  pendiente: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  retenido: "bg-destructive/10 text-destructive border-destructive/20",
}

export default function PagosPage() {
  const { pagos, descuentos, marcarPagoPagado } = useMockData()
  const [search, setSearch] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [filtroMes, setFiltroMes] = useState("todos")

  const meses = useMemo(() => Array.from(new Set(pagos.map((p) => p.mes))).sort(), [pagos])

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

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Pagos</h1>
        <p className="text-sm text-muted-foreground">Control de pagos mensuales, descuentos y estado de desembolso</p>
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
          <SelectTrigger className="w-[160px]">
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
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los meses</SelectItem>
            {meses.map((mes) => (
              <SelectItem key={mes} value={mes}>
                {mes}
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
              {filtered.map((p) => {
                const descCount = descuentos.filter((d) => d.becarioId === p.becarioId && d.mesAplicado === p.mes).length
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{p.becarioNombre}</p>
                        <p className="text-xs text-muted-foreground">{p.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{p.mes}</TableCell>
                    <TableCell className="text-right">Q{p.montoBase.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span>Q{p.descuentos.toLocaleString()}</span>
                      {descCount > 0 && (
                        <p className="text-[10px] text-muted-foreground">{descCount} descuento(s)</p>
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
              {filtered.length === 0 && (
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
    </div>
  )
}
