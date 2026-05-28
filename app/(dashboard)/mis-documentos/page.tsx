"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useCurrentUser } from "@/lib/auth-context"
import { useMockData } from "@/lib/mock-data-context"
import {
  formatTipoDocumento,
  formatEstadoEntrega,
  type EntregaDocumento,
} from "@/lib/data"
import { Upload, Image, X, FileText, CheckCircle2, Clock, XCircle, Eye } from "lucide-react"
import { toast } from "sonner"

// ── Helpers ─────────────────────────────────────────────────

function toBase64(file: File): Promise<string> {
  return new Promise((res) => {
    const reader = new FileReader()
    reader.onload = () => res(reader.result as string)
    reader.readAsDataURL(file)
  })
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

// ── File picker ──────────────────────────────────────────────

function FilePicker({
  archivos,
  onChange,
}: {
  archivos: string[]
  onChange: (files: string[]) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    const nuevos = await Promise.all(files.map(toBase64))
    onChange([...archivos, ...nuevos])
    if (fileRef.current) fileRef.current.value = ""
  }

  function remove(idx: number) {
    onChange(archivos.filter((_, i) => i !== idx))
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Archivos adjuntos</Label>
      <div className="flex flex-wrap gap-2">
        {archivos.map((src, i) => (
          <div key={i} className="relative size-14 rounded overflow-hidden border border-border">
            {src.startsWith("data:image") ? (
              <img src={src} alt="" className="size-full object-cover" />
            ) : (
              <div className="size-full flex items-center justify-center bg-muted">
                <FileText className="size-6 text-muted-foreground" />
              </div>
            )}
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
          className="size-14 rounded border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Image className="size-5" />
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFiles}
      />
      <p className="text-xs text-muted-foreground">Acepta imagenes y PDF</p>
    </div>
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

// ── Estado badge ─────────────────────────────────────────────

function EstadoBadge({ estado }: { estado: EntregaDocumento["estado"] | "pendiente" }) {
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

// ── Main page ────────────────────────────────────────────────

export default function MisDocumentosPage() {
  const { currentUser } = useCurrentUser()
  const {
    getBecarioById,
    getTareasParaBecario,
    getEntregaByTareaYBecario,
    addEntrega,
    updateEntrega,
  } = useMockData()

  const becario = getBecarioById(currentUser?.becarioId)

  const [entregandoTareaId, setEntregandoTareaId] = useState<string | null>(null)
  const [archivos, setArchivos] = useState<string[]>([])
  const [comentario, setComentario] = useState("")
  const [viendeEntregaId, setViendoEntregaId] = useState<string | null>(null)
  const [viewingFile, setViewingFile] = useState<string | null>(null)

  if (!becario) {
    return (
      <div className="flex items-center justify-center h-64 p-6">
        <p className="text-muted-foreground">Solo los becarios pueden ver esta pagina.</p>
      </div>
    )
  }

  const tareas = getTareasParaBecario(becario.nivel).sort(
    (a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime()
  )

  function openEntregar(tareaId: string, entregaExistente?: EntregaDocumento) {
    setEntregandoTareaId(tareaId)
    setArchivos(entregaExistente?.archivos ?? [])
    setComentario(entregaExistente?.comentario ?? "")
  }

  function handleEntregar() {
    if (!entregandoTareaId || !becario) return
    if (archivos.length === 0) {
      toast.error("Adjunta al menos un archivo")
      return
    }
    const entregaExistente = getEntregaByTareaYBecario(entregandoTareaId, becario.id)
    if (entregaExistente) {
      updateEntrega(entregaExistente.id, {
        archivos,
        comentario,
        estado: "entregado",
        fechaEntrega: todayISO(),
        comentarioRevisor: undefined,
      })
    } else {
      addEntrega({ tareaId: entregandoTareaId, becarioId: becario.id, archivos, comentario })
    }
    toast.success("Documento entregado exitosamente")
    setEntregandoTareaId(null)
    setArchivos([])
    setComentario("")
  }

  const tareaEnEntrega = tareas.find((t) => t.id === entregandoTareaId)
  const entregaViendose = viendeEntregaId
    ? tareas.map((t) => getEntregaByTareaYBecario(t.id, becario.id)).find((e) => e?.id === viendeEntregaId)
    : undefined

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mis Documentos</h1>
        <p className="text-sm text-muted-foreground">Tareas asignadas y entregas de documentos</p>
      </div>

      {tareas.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No hay tareas asignadas para tu nivel educativo.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {tareas.map((tarea) => {
            const entrega = getEntregaByTareaYBecario(tarea.id, becario.id)
            const estadoEntrega = entrega?.estado ?? "pendiente"
            const vencido = new Date(tarea.fechaLimite) < new Date() && estadoEntrega === "pendiente"

            return (
              <Card key={tarea.id} className={vencido ? "border-destructive/40" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <CardTitle className="text-base">{tarea.titulo}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{formatTipoDocumento(tarea.tipo)}</Badge>
                        <EstadoBadge estado={estadoEntrega} />
                        <span className={`text-xs ${vencido ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                          Fecha límite: {new Date(tarea.fechaLimite).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {entrega && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={() => setViendoEntregaId(entrega.id)}
                        >
                          <Eye className="size-3.5" />
                          Ver entrega
                        </Button>
                      )}
                      {(estadoEntrega === "pendiente" || estadoEntrega === "rechazado") && (
                        <Button
                          size="sm"
                          className="gap-1.5"
                          onClick={() => openEntregar(tarea.id, entrega)}
                        >
                          <Upload className="size-3.5" />
                          {estadoEntrega === "rechazado" ? "Volver a entregar" : "Entregar"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{tarea.descripcion}</p>
                  {entrega?.comentarioRevisor && (
                    <div className={`mt-3 rounded-md px-3 py-2 text-sm ${estadoEntrega === "rechazado" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                      <span className="font-medium">Comentario del revisor:</span> {entrega.comentarioRevisor}
                    </div>
                  )}
                  {entrega && estadoEntrega === "entregado" && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Entregado el {new Date(entrega.fechaEntrega).toLocaleDateString("es-MX", { day: "numeric", month: "long" })}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* ── Dialog entregar ── */}
      <Dialog open={!!entregandoTareaId} onOpenChange={(o) => { if (!o) { setEntregandoTareaId(null); setArchivos([]); setComentario("") } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Entregar documento</DialogTitle>
          </DialogHeader>
          {tareaEnEntrega && (
            <div className="flex flex-col gap-4 pt-1">
              <div className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
                {tareaEnEntrega.descripcion}
              </div>
              <FilePicker archivos={archivos} onChange={setArchivos} />
              <div className="flex flex-col gap-2">
                <Label htmlFor="comentario">Comentario o nota (opcional)</Label>
                <Textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Agrega una nota si lo consideras necesario..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <Button variant="ghost" onClick={() => { setEntregandoTareaId(null); setArchivos([]); setComentario("") }}>
                  Cancelar
                </Button>
                <Button onClick={handleEntregar}>
                  <Upload className="size-4 mr-1.5" />
                  Entregar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Dialog ver entrega ── */}
      <Dialog open={!!viendeEntregaId} onOpenChange={(o) => { if (!o) setViendoEntregaId(null) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tu entrega</DialogTitle>
          </DialogHeader>
          {entregaViendose && (
            <div className="flex flex-col gap-4 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <EstadoBadge estado={entregaViendose.estado} />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Archivos adjuntos</p>
                <FileThumbnails archivos={entregaViendose.archivos} onView={setViewingFile} />
              </div>
              {entregaViendose.comentario && (
                <div>
                  <p className="text-sm font-medium">Tu comentario</p>
                  <p className="text-sm text-muted-foreground mt-1">{entregaViendose.comentario}</p>
                </div>
              )}
              {entregaViendose.comentarioRevisor && (
                <div className={`rounded-md px-3 py-2 text-sm ${entregaViendose.estado === "rechazado" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                  <span className="font-medium">Comentario del revisor:</span> {entregaViendose.comentarioRevisor}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Image/file viewer ── */}
      <Dialog open={!!viewingFile} onOpenChange={(o) => { if (!o) setViewingFile(null) }}>
        <DialogContent className="max-w-2xl p-2">
          {viewingFile && viewingFile.startsWith("data:image") && (
            <img src={viewingFile} alt="Archivo adjunto" className="w-full h-auto rounded max-h-[80vh] object-contain" />
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
