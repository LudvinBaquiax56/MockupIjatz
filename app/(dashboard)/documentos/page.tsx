"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { useCurrentUser } from "@/lib/auth-context"
import { useMockData } from "@/lib/mock-data-context"
import {
  formatTipoDocumento,
  formatEstadoEntrega,
  formatMes,
  TIPOS_DOCUMENTO,
  type TipoDocumento,
  type NivelEducativo,
  type EntregaDocumento,
  type TareaAsignada,
} from "@/lib/data"
import { Plus, Eye, CheckCircle2, XCircle, FileText, Clock, Upload, ChevronDown, ChevronRight } from "lucide-react"
import { toast } from "sonner"

// ── Helpers ─────────────────────────────────────────────────

function toBase64(file: File): Promise<string> {
  return new Promise((res) => {
    const reader = new FileReader()
    reader.onload = () => res(reader.result as string)
    reader.readAsDataURL(file)
  })
}

// ── Estado badge ─────────────────────────────────────────────

function EstadoBadge({ estado }: { estado: string }) {
  const styles: Record<string, string> = {
    pendiente: "bg-muted text-muted-foreground border-border",
    entregado: "bg-blue-100 text-blue-800 border-blue-200",
    revisado: "bg-primary/10 text-primary border-primary/20",
    rechazado: "bg-destructive/10 text-destructive border-destructive/20",
  }
  const icons: Record<string, React.ReactNode> = {
    pendiente: <Clock className="size-3" />,
    entregado: <Upload className="size-3" />,
    revisado: <CheckCircle2 className="size-3" />,
    rechazado: <XCircle className="size-3" />,
  }
  return (
    <Badge variant="outline" className={`gap-1 ${styles[estado] ?? ""}`}>
      {icons[estado]}
      {formatEstadoEntrega(estado)}
    </Badge>
  )
}

// ── File thumbnails ──────────────────────────────────────────

function FileThumbnails({ archivos, onView }: { archivos: string[]; onView: (src: string) => void }) {
  if (!archivos.length) return <span className="text-muted-foreground text-xs">Sin archivos</span>
  return (
    <div className="flex gap-1 flex-wrap">
      {archivos.map((src, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onView(src)}
          className="size-8 rounded overflow-hidden border border-border hover:border-primary transition-colors shrink-0"
        >
          {src.startsWith("data:image") ? (
            <img src={src} alt="" className="size-full object-cover" />
          ) : (
            <div className="size-full flex items-center justify-center bg-muted">
              <FileText className="size-4 text-muted-foreground" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Resumen becario documentos ────────────────────────────────

function ResumenBecarioDocumentos({
  becario,
  tareas,
  getEntregaByTareaYBecario,
}: {
  becario: { id: string; nombre: string; apellido: string; nivel: string }
  tareas: TareaAsignada[]
  getEntregaByTareaYBecario: (tareaId: string, becarioId: string) => EntregaDocumento | undefined
}) {
  const [expanded, setExpanded] = useState(false)

  const entregadas = tareas.filter((t) => {
    const e = getEntregaByTareaYBecario(t.id, becario.id)
    return e && (e.estado === "entregado" || e.estado === "revisado")
  }).length
  const total = tareas.length
  const pct = total === 0 ? 0 : Math.round((entregadas / total) * 100)

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
          className="text-[11px] hidden sm:inline-flex bg-muted text-muted-foreground border-border capitalize"
        >
          {becario.nivel}
        </Badge>
        <div className="w-32 hidden md:block">
          <Progress value={pct} className="h-2" />
        </div>
        <span className="text-sm font-medium tabular-nums w-24 text-right">
          {entregadas}
          <span className="text-xs text-muted-foreground font-normal"> / {total} tareas</span>
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-3 pt-1 bg-muted/20">
          {tareas.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">Sin tareas asignadas</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs h-8">Tarea</TableHead>
                  <TableHead className="text-xs h-8 hidden sm:table-cell">Tipo</TableHead>
                  <TableHead className="text-xs h-8 hidden md:table-cell">Fecha límite</TableHead>
                  <TableHead className="text-xs h-8">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tareas.map((t) => {
                  const entrega = getEntregaByTareaYBecario(t.id, becario.id)
                  const vencida = new Date(t.fechaLimite) < new Date()
                  return (
                    <TableRow key={t.id} className="hover:bg-transparent">
                      <TableCell className="text-xs py-1.5">{t.titulo}</TableCell>
                      <TableCell className="text-xs py-1.5 hidden sm:table-cell text-muted-foreground">
                        {formatTipoDocumento(t.tipo)}
                      </TableCell>
                      <TableCell className={`text-xs py-1.5 hidden md:table-cell ${vencida && !entrega ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                        {new Date(t.fechaLimite).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                      </TableCell>
                      <TableCell className="py-1.5">
                        <EstadoBadge estado={entrega?.estado ?? "pendiente"} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────

export default function DocumentosPage() {
  const { currentUser } = useCurrentUser()
  const {
    tareas,
    entregas,
    becarios,
    addTarea,
    updateEntrega,
    getEntregasByTarea,
    getEntregaByTareaYBecario,
    getTareasParaBecario,
    getMesActual,
  } = useMockData()

  // Nueva tarea dialog
  const [addOpen, setAddOpen] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState<TipoDocumento | "">("")
  const [nivelDestino, setNivelDestino] = useState<NivelEducativo | "todos" | "">("")
  const [fechaLimite, setFechaLimite] = useState("")

  // Revisar entrega dialog
  const [revisandoEntrega, setRevisandoEntrega] = useState<EntregaDocumento | null>(null)
  const [comentarioRevisor, setComentarioRevisor] = useState("")
  const [confirmRechazar, setConfirmRechazar] = useState(false)

  // Ver archivos dialog
  const [viendoArchivos, setViendoArchivos] = useState<string[] | null>(null)
  const [viewingFile, setViewingFile] = useState<string | null>(null)

  // Filtros entregas
  const [filterEstado, setFilterEstado] = useState("todos")
  const [filterTarea, setFilterTarea] = useState("todas")

  // Filtro por becario
  const [filtroNivelBecario, setFiltroNivelBecario] = useState<"todos" | NivelEducativo>("todos")

  const mesActualDoc = getMesActual()
  const mesesDisponiblesDoc = Array.from(
    new Set([mesActualDoc, ...tareas.map((t) => t.fechaLimite.slice(0, 7))])
  ).sort((a, b) => b.localeCompare(a))
  const [mesSeleccionadoDoc, setMesSeleccionadoDoc] = useState(mesActualDoc)

  function resetAdd() {
    setTitulo(""); setDescripcion(""); setTipo(""); setNivelDestino(""); setFechaLimite("")
  }

  function handleAddTarea(e: React.FormEvent) {
    e.preventDefault()
    if (!tipo) { toast.error("Selecciona el tipo de documento"); return }
    if (!nivelDestino) { toast.error("Selecciona el nivel destino"); return }
    if (!currentUser) return
    addTarea({ titulo: titulo.trim(), descripcion: descripcion.trim(), tipo, fechaLimite, nivelDestino, creadaPor: currentUser.id })
    toast.success("Tarea creada exitosamente")
    resetAdd()
    setAddOpen(false)
  }

  function openRevisar(entrega: EntregaDocumento) {
    setRevisandoEntrega(entrega)
    setComentarioRevisor("")
  }

  function handleAprobar() {
    if (!revisandoEntrega) return
    updateEntrega(revisandoEntrega.id, { estado: "revisado", comentarioRevisor: comentarioRevisor.trim() || undefined })
    toast.success("Entrega aprobada")
    setRevisandoEntrega(null)
  }

  function handleRechazar() {
    if (!revisandoEntrega) return
    updateEntrega(revisandoEntrega.id, { estado: "rechazado", comentarioRevisor: comentarioRevisor.trim() })
    toast.success("Entrega rechazada")
    setRevisandoEntrega(null)
  }

  const entregasFiltradas = entregas
    .filter((e) => filterEstado === "todos" || e.estado === filterEstado)
    .filter((e) => filterTarea === "todas" || e.tareaId === filterTarea)
    .sort((a, b) => new Date(b.fechaEntrega).getTime() - new Date(a.fechaEntrega).getTime())

  const tareasOrdenadas = [...tareas].sort(
    (a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime()
  )

  const becariosFiltrados = becarios.filter(
    (b) => filtroNivelBecario === "todos" || b.nivel === filtroNivelBecario
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
        <p className="text-sm text-muted-foreground">Gestion de tareas asignadas y entregas de becarios</p>
      </div>

      <Tabs defaultValue="tareas">
        <TabsList>
          <TabsTrigger value="tareas">Tareas ({tareas.length})</TabsTrigger>
          <TabsTrigger value="entregas">Entregas ({entregas.length})</TabsTrigger>
          <TabsTrigger value="porbecario">Por Becario</TabsTrigger>
        </TabsList>

        {/* ── Tab Tareas ── */}
        <TabsContent value="tareas" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Tareas Asignadas</CardTitle>
              <Button size="sm" onClick={() => setAddOpen(true)}>
                <Plus className="size-4 mr-1.5" />
                Nueva Tarea
              </Button>
            </CardHeader>
            <CardContent>
              {tareasOrdenadas.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay tareas creadas</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Nivel</TableHead>
                      <TableHead>Fecha límite</TableHead>
                      <TableHead className="text-center">Entregas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tareasOrdenadas.map((t) => {
                      const numEntregas = getEntregasByTarea(t.id).length
                      const vencida = new Date(t.fechaLimite) < new Date()
                      return (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">{t.titulo}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">{formatTipoDocumento(t.tipo)}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground capitalize">
                            {t.nivelDestino === "todos" ? "Todos" : t.nivelDestino === "diversificado" ? "Diversificado" : "Universitario"}
                          </TableCell>
                          <TableCell className={`text-sm ${vencida ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                            {new Date(t.fechaLimite).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={numEntregas > 0 ? "default" : "secondary"}>{numEntregas}</Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab Entregas ── */}
        <TabsContent value="entregas" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-base">Entregas de Becarios</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Select value={filterTarea} onValueChange={setFilterTarea}>
                  <SelectTrigger className="h-8 text-xs w-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las tareas</SelectItem>
                    {tareas.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.titulo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterEstado} onValueChange={setFilterEstado}>
                  <SelectTrigger className="h-8 text-xs w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="entregado">Entregado</SelectItem>
                    <SelectItem value="revisado">Revisado</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {entregasFiltradas.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay entregas que coincidan</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Becario</TableHead>
                      <TableHead className="hidden md:table-cell">Tarea</TableHead>
                      <TableHead className="hidden lg:table-cell">Archivos</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="hidden md:table-cell">Fecha entrega</TableHead>
                      <TableHead className="w-28" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entregasFiltradas.map((e) => {
                      const tarea = tareas.find((t) => t.id === e.tareaId)
                      return (
                        <TableRow key={e.id}>
                          <TableCell className="font-medium text-sm">{e.becarioNombre}</TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-50 truncate">
                            {tarea?.titulo ?? "—"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <FileThumbnails archivos={e.archivos} onView={setViewingFile} />
                          </TableCell>
                          <TableCell>
                            <EstadoBadge estado={e.estado} />
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            {new Date(e.fechaEntrega).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 justify-end">
                              {e.archivos.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-7 text-muted-foreground hover:text-foreground"
                                  onClick={() => setViendoArchivos(e.archivos)}
                                >
                                  <Eye className="size-3.5" />
                                </Button>
                              )}
                              {e.estado === "entregado" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                  onClick={() => openRevisar(e)}
                                >
                                  Revisar
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab Por Becario ── */}
        <TabsContent value="porbecario" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-base">Documentos por becario</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Select
                  value={filtroNivelBecario}
                  onValueChange={(v) => setFiltroNivelBecario(v as "todos" | NivelEducativo)}
                >
                  <SelectTrigger className="h-8 text-xs w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los niveles</SelectItem>
                    <SelectItem value="diversificado">Diversificado</SelectItem>
                    <SelectItem value="universitario">Universitario</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={mesSeleccionadoDoc} onValueChange={setMesSeleccionadoDoc}>
                  <SelectTrigger className="h-8 text-xs w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mesesDisponiblesDoc.map((m) => (
                      <SelectItem key={m} value={m}>{formatMes(m)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {becariosFiltrados.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8 px-4">No hay becarios en este nivel</p>
              ) : (
                <div className="divide-y">
                  {becariosFiltrados.map((b) => {
                    const tareasDelMes = getTareasParaBecario(b.nivel).filter(
                      (t) => t.fechaLimite.slice(0, 7) === mesSeleccionadoDoc
                    )
                    return (
                      <ResumenBecarioDocumentos
                        key={b.id}
                        becario={b}
                        tareas={tareasDelMes}
                        getEntregaByTareaYBecario={getEntregaByTareaYBecario}
                      />
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Dialog nueva tarea ── */}
      <Dialog open={addOpen} onOpenChange={(o) => { setAddOpen(o); if (!o) resetAdd() }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nueva Tarea</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTarea} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="titulo">Título</Label>
              <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Informe mensual de mayo" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Instrucciones detalladas para el becario..."
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Tipo de documento</Label>
                <Select value={tipo} onValueChange={(v) => setTipo(v as TipoDocumento)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {TIPOS_DOCUMENTO.map((td) => (
                      <SelectItem key={td.value} value={td.value}>{td.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Nivel destino</Label>
                <Select value={nivelDestino} onValueChange={(v) => setNivelDestino(v as NivelEducativo | "todos")}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="diversificado">Diversificado</SelectItem>
                    <SelectItem value="universitario">Universitario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="fecha">Fecha límite</Label>
              <Input id="fecha" type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="ghost" onClick={() => { setAddOpen(false); resetAdd() }}>Cancelar</Button>
              <Button type="submit">Crear tarea</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Dialog revisar entrega ── */}
      <Dialog open={!!revisandoEntrega} onOpenChange={(o) => { if (!o) setRevisandoEntrega(null) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Revisar entrega — {revisandoEntrega?.becarioNombre}</DialogTitle>
          </DialogHeader>
          {revisandoEntrega && (
            <div className="flex flex-col gap-4 pt-1">
              <div>
                <p className="text-sm font-medium mb-2">Archivos entregados</p>
                <FileThumbnails archivos={revisandoEntrega.archivos} onView={setViewingFile} />
              </div>
              {revisandoEntrega.comentario && (
                <div>
                  <p className="text-sm font-medium">Comentario del becario</p>
                  <p className="text-sm text-muted-foreground mt-1">{revisandoEntrega.comentario}</p>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="comentario-revisor">Comentario (requerido al rechazar)</Label>
                <Textarea
                  id="comentario-revisor"
                  value={comentarioRevisor}
                  onChange={(e) => setComentarioRevisor(e.target.value)}
                  placeholder="Escribe un comentario para el becario..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <Button variant="ghost" onClick={() => setRevisandoEntrega(null)}>Cancelar</Button>
                <Button variant="destructive" onClick={() => {
                  if (!comentarioRevisor.trim()) { toast.error("Agrega un comentario explicando el rechazo"); return }
                  setConfirmRechazar(true)
                }}>
                  <XCircle className="size-4 mr-1.5" />
                  Rechazar
                </Button>
                <Button onClick={handleAprobar}>
                  <CheckCircle2 className="size-4 mr-1.5" />
                  Aprobar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Dialog ver archivos ── */}
      <Dialog open={!!viendoArchivos} onOpenChange={(o) => { if (!o) setViendoArchivos(null) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Archivos entregados</DialogTitle>
          </DialogHeader>
          {viendoArchivos && (
            <div className="flex flex-wrap gap-3 pt-2">
              <FileThumbnails archivos={viendoArchivos} onView={setViewingFile} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Confirmar rechazo ── */}
      <AlertDialog open={confirmRechazar} onOpenChange={setConfirmRechazar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rechazar entrega</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion notificara al becario que su entrega fue rechazada. ¿Confirmas el rechazo?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { setConfirmRechazar(false); handleRechazar() }}
            >
              Sí, rechazar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── File viewer ── */}
      <Dialog open={!!viewingFile} onOpenChange={(o) => { if (!o) setViewingFile(null) }}>
        <DialogContent className="max-w-2xl p-2">
          {viewingFile && viewingFile.startsWith("data:image") && (
            <img src={viewingFile} alt="Archivo" className="w-full h-auto rounded max-h-[80vh] object-contain" />
          )}
          {viewingFile && !viewingFile.startsWith("data:image") && (
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground text-sm">Vista previa no disponible para PDF</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
