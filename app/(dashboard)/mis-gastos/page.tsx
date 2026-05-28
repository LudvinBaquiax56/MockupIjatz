"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCurrentUser } from "@/lib/auth-context"
import { useMockData } from "@/lib/mock-data-context"
import { formatCategoria, CATEGORIAS_GASTO, type CategoriaGasto, type Gasto } from "@/lib/data"
import { Plus, Wallet, PiggyBank, TrendingDown, Receipt, Pencil, Trash2, Image, X } from "lucide-react"
import { toast } from "sonner"

// ── Helpers ────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function getMesLimits(mesActual: string) {
  const primerDia = `${mesActual}-01`
  const [y, m] = mesActual.split("-").map(Number)
  const ultimoDia = new Date(y, m, 0).toISOString().slice(0, 10)
  return { primerDia, ultimoDia }
}

function toBase64(file: File): Promise<string> {
  return new Promise((res) => {
    const reader = new FileReader()
    reader.onload = () => res(reader.result as string)
    reader.readAsDataURL(file)
  })
}

function mesLabel(mes: string) {
  const [y, m] = mes.split("-")
  const nombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  return `${nombres[parseInt(m, 10) - 1]} ${y}`
}

// ── Thumbnails component ───────────────────────────────────────

function ImageThumbnails({ imagenes, onView }: { imagenes: string[]; onView: (src: string) => void }) {
  if (!imagenes.length) return <span className="text-muted-foreground text-xs">—</span>
  return (
    <div className="flex gap-1 flex-wrap">
      {imagenes.map((src, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onView(src)}
          className="size-8 rounded overflow-hidden border border-border hover:border-primary transition-colors shrink-0"
        >
          <img src={src} alt={`Imagen ${i + 1}`} className="size-full object-cover" />
        </button>
      ))}
    </div>
  )
}

// ── Image picker (used in add/edit forms) ─────────────────────

function ImagePicker({
  imagenes,
  onChange,
}: {
  imagenes: string[]
  onChange: (imgs: string[]) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    const nuevas = await Promise.all(files.map(toBase64))
    onChange([...imagenes, ...nuevas])
    if (fileRef.current) fileRef.current.value = ""
  }

  function remove(idx: number) {
    onChange(imagenes.filter((_, i) => i !== idx))
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Imagenes de respaldo (opcional)</Label>
      <div className="flex flex-wrap gap-2">
        {imagenes.map((src, i) => (
          <div key={i} className="relative size-12 rounded overflow-hidden border border-border">
            <img src={src} alt="" className="size-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-0 right-0 bg-black/60 text-white rounded-bl p-0.5 leading-none hover:bg-black/80"
            >
              <X className="size-2.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="size-12 rounded border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Image className="size-5" />
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFiles}
      />
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────

export default function MisGastosPage() {
  const { currentUser } = useCurrentUser()
  const {
    getBecarioById,
    getGastosByBecario,
    calcularGastoMensual,
    calcularAhorroMensual,
    calcularAhorroAcumulado,
    addGasto,
    updateGasto,
    deleteGasto,
    getMesActual,
  } = useMockData()

  const becario = getBecarioById(currentUser?.becarioId)
  const mesActual = getMesActual()
  const { primerDia, ultimoDia } = getMesLimits(mesActual)

  // Add form state
  const [addOpen, setAddOpen] = useState(false)
  const [addConcepto, setAddConcepto] = useState("")
  const [addCategoria, setAddCategoria] = useState<CategoriaGasto | "">("")
  const [addMonto, setAddMonto] = useState("")
  const [addFecha, setAddFecha] = useState(todayISO())
  const [addImagenes, setAddImagenes] = useState<string[]>([])

  // Edit dialog state
  const [editingGasto, setEditingGasto] = useState<Gasto | null>(null)
  const [editConcepto, setEditConcepto] = useState("")
  const [editCategoria, setEditCategoria] = useState<CategoriaGasto | "">("")
  const [editMonto, setEditMonto] = useState("")
  const [editFecha, setEditFecha] = useState("")
  const [editImagenes, setEditImagenes] = useState<string[]>([])

  // Delete confirm + image viewer
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [viewingImage, setViewingImage] = useState<string | null>(null)

  // Histórico filter
  const [filterCat, setFilterCat] = useState<string>("todas")

  if (!becario) {
    return (
      <div className="flex items-center justify-center h-64 p-6">
        <p className="text-muted-foreground">Solo los becarios pueden ver esta pagina.</p>
      </div>
    )
  }

  const becarioId = becario.id
  const misGastos = getGastosByBecario(becarioId).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  const gastosDelMes = misGastos.filter((g) => g.mes === mesActual)
  const gastosHistorico = misGastos
    .filter((g) => g.mes !== mesActual)
    .filter((g) => filterCat === "todas" || g.categoria === filterCat)

  const gastadoMes = calcularGastoMensual(becarioId, mesActual)
  const ahorroMes = calcularAhorroMensual(becarioId, mesActual)
  const ahorroAcumulado = calcularAhorroAcumulado(becarioId)
  const porcentaje = becario.presupuestoMensual > 0 ? Math.round((gastadoMes / becario.presupuestoMensual) * 100) : 0

  // ── Add handlers ──

  function resetAdd() {
    setAddConcepto("")
    setAddCategoria("")
    setAddMonto("")
    setAddFecha(todayISO())
    setAddImagenes([])
  }

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!addCategoria) { toast.error("Selecciona una categoria"); return }
    const montoNum = Number(addMonto)
    if (Number.isNaN(montoNum) || montoNum <= 0) { toast.error("Ingresa un monto valido"); return }

    const mesFecha = addFecha.slice(0, 7)
    const gastoAcumulado = calcularGastoMensual(becarioId, mesFecha)
    const totalConNuevo = gastoAcumulado + montoNum

    addGasto({ becarioId, concepto: addConcepto.trim(), categoria: addCategoria, monto: montoNum, fecha: addFecha, imagenes: addImagenes })
    resetAdd()
    setAddOpen(false)

    const presupuesto = becario?.presupuestoMensual ?? 0
    if (presupuesto > 0 && totalConNuevo > presupuesto) {
      toast.warning("Este gasto supera tu presupuesto mensual")
    } else if (presupuesto > 0 && totalConNuevo / presupuesto >= 0.8) {
      toast.warning("Has superado el 80% de tu presupuesto este mes")
    } else {
      toast.success("Gasto registrado")
    }
  }

  // ── Edit handlers ──

  function openEdit(g: Gasto) {
    setEditingGasto(g)
    setEditConcepto(g.concepto)
    setEditCategoria(g.categoria)
    setEditMonto(String(g.monto))
    setEditFecha(g.fecha)
    setEditImagenes(g.imagenes ?? [])
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!editingGasto || !editCategoria) return
    const montoNum = Number(editMonto)
    if (Number.isNaN(montoNum) || montoNum <= 0) { toast.error("Ingresa un monto valido"); return }
    updateGasto(editingGasto.id, {
      concepto: editConcepto.trim(),
      categoria: editCategoria,
      monto: montoNum,
      fecha: editFecha,
      mes: editFecha.slice(0, 7),
      imagenes: editImagenes,
    })
    toast.success("Gasto actualizado")
    setEditingGasto(null)
  }

  function handleDelete() {
    if (!deletingId) return
    deleteGasto(deletingId)
    toast.success("Gasto eliminado")
    setDeletingId(null)
  }

  // ── Render ──

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Mis Gastos</h1>
        <p className="text-sm text-muted-foreground">Registro y seguimiento de tus gastos</p>
      </div>

      {/* Summary cards */}
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Gastado este mes</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro este mes</CardTitle>
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

      {/* ── Sección A: Gastos del mes actual ── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Gastos de {mesLabel(mesActual)}</CardTitle>
          <Dialog open={addOpen} onOpenChange={(o) => { setAddOpen(o); if (!o) resetAdd() }}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-4 mr-1.5" />
                Registrar Gasto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="flex flex-col gap-4 pt-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="a-concepto">Concepto</Label>
                  <Input id="a-concepto" value={addConcepto} onChange={(e) => setAddConcepto(e.target.value)} placeholder="Ej: Almuerzo en cafeteria" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Categoria</Label>
                    <Select value={addCategoria} onValueChange={(v) => setAddCategoria(v as CategoriaGasto)}>
                      <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIAS_GASTO.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="a-monto">Monto (Q)</Label>
                    <Input id="a-monto" type="number" min="1" step="0.01" value={addMonto} onChange={(e) => setAddMonto(e.target.value)} placeholder="0.00" required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="a-fecha">Fecha</Label>
                  <Input id="a-fecha" type="date" value={addFecha} min={primerDia} max={ultimoDia} onChange={(e) => setAddFecha(e.target.value)} required />
                </div>
                <ImagePicker imagenes={addImagenes} onChange={setAddImagenes} />
                <Button type="submit" className="mt-1">Registrar Gasto</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {gastosDelMes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No hay gastos registrados este mes</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Imagenes</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="w-16" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {gastosDelMes.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell className="font-medium">{g.concepto}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{formatCategoria(g.categoria)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(g.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                    </TableCell>
                    <TableCell>
                      <ImageThumbnails imagenes={g.imagenes ?? []} onView={setViewingImage} />
                    </TableCell>
                    <TableCell className="text-right font-semibold">Q{g.monto.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground" onClick={() => openEdit(g)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-destructive" onClick={() => setDeletingId(g.id)}>
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* ── Sección B: Histórico ── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Historico</CardTitle>
          <Select value={filterCat} onValueChange={setFilterCat}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las categorias</SelectItem>
              {CATEGORIAS_GASTO.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {gastosHistorico.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No hay gastos anteriores</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Mes</TableHead>
                  <TableHead>Imagenes</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gastosHistorico.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell className="font-medium">{g.concepto}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{formatCategoria(g.categoria)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{mesLabel(g.mes)}</TableCell>
                    <TableCell>
                      <ImageThumbnails imagenes={g.imagenes ?? []} onView={setViewingImage} />
                    </TableCell>
                    <TableCell className="text-right font-semibold">Q{g.monto.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* ── Edit dialog ── */}
      <Dialog open={!!editingGasto} onOpenChange={(o) => { if (!o) setEditingGasto(null) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Gasto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="e-concepto">Concepto</Label>
              <Input id="e-concepto" value={editConcepto} onChange={(e) => setEditConcepto(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Categoria</Label>
                <Select value={editCategoria} onValueChange={(v) => setEditCategoria(v as CategoriaGasto)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS_GASTO.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="e-monto">Monto (Q)</Label>
                <Input id="e-monto" type="number" min="1" step="0.01" value={editMonto} onChange={(e) => setEditMonto(e.target.value)} required />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="e-fecha">Fecha</Label>
              <Input id="e-fecha" type="date" value={editFecha} min={primerDia} max={ultimoDia} onChange={(e) => setEditFecha(e.target.value)} required />
            </div>
            <ImagePicker imagenes={editImagenes} onChange={setEditImagenes} />
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="ghost" onClick={() => setEditingGasto(null)}>Cancelar</Button>
              <Button type="submit">Guardar cambios</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete confirm ── */}
      <AlertDialog open={!!deletingId} onOpenChange={(o) => { if (!o) setDeletingId(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar gasto</AlertDialogTitle>
            <AlertDialogDescription>Esta accion no se puede deshacer. El gasto sera eliminado permanentemente.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Image viewer ── */}
      <Dialog open={!!viewingImage} onOpenChange={(o) => { if (!o) setViewingImage(null) }}>
        <DialogContent className="max-w-2xl p-2">
          {viewingImage && (
            <img src={viewingImage} alt="Imagen de respaldo" className="w-full h-auto rounded max-h-[80vh] object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
