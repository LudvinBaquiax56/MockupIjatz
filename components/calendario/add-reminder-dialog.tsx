"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NIVELES, type NivelEducativo, type Recordatorio } from "@/lib/data"
import { toast } from "sonner"

type NewRecordatorioInput = {
  titulo: string
  descripcion: string
  tipo: Recordatorio["tipo"]
  prioridad: Recordatorio["prioridad"]
  fecha: string
  nivelDestino: NivelEducativo | "todos"
}

export function AddReminderDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: NewRecordatorioInput) => void
}) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState<Recordatorio["tipo"] | "">("")
  const [prioridad, setPrioridad] = useState<Recordatorio["prioridad"] | "">("")
  const [fecha, setFecha] = useState("")
  const [nivelDestino, setNivelDestino] = useState<NivelEducativo | "todos" | "">("")

  function reset() {
    setTitulo("")
    setDescripcion("")
    setTipo("")
    setPrioridad("")
    setFecha("")
    setNivelDestino("")
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!tipo || !prioridad || !nivelDestino) {
      toast.error("Completa tipo, prioridad y nivel destino")
      return
    }
    onSubmit({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      tipo,
      prioridad,
      fecha,
      nivelDestino,
    })
    toast.success("Recordatorio creado", {
      description: "Se ha agregado el recordatorio al calendario.",
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen)
        if (!nextOpen) reset()
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo Recordatorio</DialogTitle>
          <DialogDescription>Crea un recordatorio para el programa de becas.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="titulo">Titulo</Label>
            <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo del recordatorio" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="descripcion">Descripcion</Label>
            <Textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripcion del recordatorio..." rows={3} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={tipo} onValueChange={(v) => setTipo(v as Recordatorio["tipo"])} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renovacion">Renovacion</SelectItem>
                  <SelectItem value="documento">Documento</SelectItem>
                  <SelectItem value="actividad">Actividad</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="prioridad">Prioridad</Label>
              <Select value={prioridad} onValueChange={(v) => setPrioridad(v as Recordatorio["prioridad"])} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="nivelDestino">Nivel Destino</Label>
              <Select value={nivelDestino} onValueChange={(v) => setNivelDestino(v as NivelEducativo | "todos")} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {NIVELES.map((n) => (
                    <SelectItem key={n.value} value={n.value}>
                      {n.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Recordatorio</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
