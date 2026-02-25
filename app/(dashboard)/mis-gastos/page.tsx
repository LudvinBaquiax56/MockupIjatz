"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCurrentUser } from "@/lib/auth-context"
import { useMockData } from "@/lib/mock-data-context"
import { formatCategoria, CATEGORIAS_GASTO, type CategoriaGasto } from "@/lib/data"
import { Plus, Wallet, PiggyBank, TrendingDown, Receipt } from "lucide-react"
import { toast } from "sonner"

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function MisGastosPage() {
  const { currentUser } = useCurrentUser()
  const {
    getBecarioById,
    getGastosByBecario,
    calcularGastoMensual,
    calcularAhorroMensual,
    calcularAhorroAcumulado,
    addGasto,
    getMesActual,
  } = useMockData()
  const becario = getBecarioById(currentUser.becarioId)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filterCat, setFilterCat] = useState<string>("todas")
  const [concepto, setConcepto] = useState("")
  const [categoria, setCategoria] = useState<CategoriaGasto | "">("")
  const [monto, setMonto] = useState("")
  const [fecha, setFecha] = useState(todayISO())

  if (!becario) {
    return (
      <div className="flex items-center justify-center h-64 p-6">
        <p className="text-muted-foreground">Solo los becarios pueden ver esta pagina.</p>
      </div>
    )
  }
  const becarioId = becario.id

  const mesActual = getMesActual()
  const misGastos = getGastosByBecario(becarioId).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  const gastosFiltrados = filterCat === "todas" ? misGastos : misGastos.filter((g) => g.categoria === filterCat)
  const gastadoMes = calcularGastoMensual(becarioId, mesActual)
  const ahorroMes = calcularAhorroMensual(becarioId, mesActual)
  const ahorroAcumulado = calcularAhorroAcumulado(becarioId)
  const porcentaje = becario.presupuestoMensual > 0 ? Math.round((gastadoMes / becario.presupuestoMensual) * 100) : 0

  function resetForm() {
    setConcepto("")
    setCategoria("")
    setMonto("")
    setFecha(todayISO())
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!categoria) {
      toast.error("Selecciona una categoria")
      return
    }
    const montoNum = Number(monto)
    if (Number.isNaN(montoNum) || montoNum <= 0) {
      toast.error("Ingresa un monto valido")
      return
    }

    addGasto({
      becarioId,
      concepto: concepto.trim(),
      categoria,
      monto: montoNum,
      fecha,
    })
    toast.success("Gasto registrado exitosamente")
    resetForm()
    setDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">Mis Gastos</h1>
          <p className="text-sm text-muted-foreground">Registra y revisa tus gastos mensuales</p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4 mr-1.5" />
              Registrar Gasto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="concepto">Concepto</Label>
                <Input id="concepto" value={concepto} onChange={(e) => setConcepto(e.target.value)} placeholder="Ej: Almuerzo en cafeteria" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={categoria} onValueChange={(v) => setCategoria(v as CategoriaGasto)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIAS_GASTO.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="monto">Monto (Q)</Label>
                  <Input id="monto" type="number" min="1" step="0.01" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="0.00" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
              <Button type="submit" className="mt-2">
                Registrar Gasto
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Presupuesto</CardTitle>
            <Wallet className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Q{becario.presupuestoMensual.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Asignacion mensual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gastado ({mesActual})</CardTitle>
            <TrendingDown className="size-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Q{gastadoMes.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={porcentaje} className="h-1.5 flex-1" />
              <span className="text-[10px] text-muted-foreground">{porcentaje}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro ({mesActual})</CardTitle>
            <PiggyBank className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">Q{ahorroMes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Disponible este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro Acumulado</CardTitle>
            <Receipt className="size-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Q{ahorroAcumulado.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total historico</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Historial de Gastos</CardTitle>
          <Select value={filterCat} onValueChange={setFilterCat}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue />
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
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gastosFiltrados.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.concepto}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {formatCategoria(g.categoria)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(g.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell className="text-right font-semibold">Q{g.monto.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {gastosFiltrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No hay gastos en esta categoria
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
