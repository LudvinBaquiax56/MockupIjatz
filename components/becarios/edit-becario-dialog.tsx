"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type Becario, type NivelEducativo } from "@/lib/data"
import { useMockData } from "@/lib/mock-data-context"

interface EditBecarioDialogProps {
  becario: Becario
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBecarioDialog({ becario, open, onOpenChange }: EditBecarioDialogProps) {
  const { updateBecario } = useMockData()

  const [email, setEmail] = useState(becario.email)
  const [telefono, setTelefono] = useState(becario.telefono)
  const [carrera, setCarrera] = useState(becario.carrera)
  const [institucion, setInstitucion] = useState(becario.institucion)
  const [nivel, setNivel] = useState<NivelEducativo>(becario.nivel)
  const [grado, setGrado] = useState(becario.grado)

  useEffect(() => {
    if (open) {
      setEmail(becario.email)
      setTelefono(becario.telefono)
      setCarrera(becario.carrera)
      setInstitucion(becario.institucion)
      setNivel(becario.nivel)
      setGrado(becario.grado)
    }
  }, [open, becario])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateBecario(becario.id, {
      email: email.trim(),
      telefono: telefono.trim(),
      carrera: carrera.trim(),
      institucion: institucion.trim(),
      nivel,
      grado: grado.trim(),
    })
    toast.success("Datos actualizados correctamente")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar mis datos</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="telefono">Telefono</Label>
              <Input
                id="telefono"
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="carrera">Carrera</Label>
            <Input
              id="carrera"
              type="text"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="institucion">Institucion</Label>
            <Input
              id="institucion"
              type="text"
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nivel">Nivel educativo</Label>
              <Select value={nivel} onValueChange={(v) => setNivel(v as NivelEducativo)}>
                <SelectTrigger id="nivel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diversificado">Diversificado</SelectItem>
                  <SelectItem value="universitario">Universitario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="grado">Grado / Semestre</Label>
              <Input
                id="grado"
                type="text"
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
                placeholder="Ej: 6to Semestre"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
