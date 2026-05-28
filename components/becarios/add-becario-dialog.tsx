"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NIVELES, type NivelEducativo } from "@/lib/data"
import { toast } from "sonner"

type NewBecarioInput = {
  nombre: string
  apellido: string
  email: string
  telefono: string
  carrera: string
  institucion: string
  nivel: NivelEducativo
  grado: string
  presupuestoMensual: number
}

export function AddBecarioDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: NewBecarioInput) => void
}) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [carrera, setCarrera] = useState("")
  const [institucion, setInstitucion] = useState("")
  const [nivel, setNivel] = useState<NivelEducativo | "">("")
  const [grado, setGrado] = useState("")
  const [presupuestoMensual, setPresupuestoMensual] = useState("")

  function reset() {
    setNombre("")
    setApellido("")
    setEmail("")
    setTelefono("")
    setCarrera("")
    setInstitucion("")
    setNivel("")
    setGrado("")
    setPresupuestoMensual("")
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!nivel) {
      toast.error("Selecciona el nivel educativo")
      return
    }
    const presupuesto = Number(presupuestoMensual)
    if (Number.isNaN(presupuesto) || presupuesto <= 0) {
      toast.error("Ingresa un presupuesto mensual valido")
      return
    }
    onSubmit({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      carrera: carrera.trim(),
      institucion: institucion.trim(),
      nivel,
      grado: grado.trim(),
      presupuestoMensual: presupuesto,
    })
    toast.success("Becario registrado exitosamente")
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
          <DialogTitle>Registrar Nuevo Becario</DialogTitle>
          <DialogDescription>Ingresa los datos del nuevo becario para registrarlo en el sistema.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Correo Electronico</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@instituto.edu" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="telefono">Telefono</Label>
              <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="5551-2345" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="institucion">Institucion</Label>
              <Input id="institucion" value={institucion} onChange={(e) => setInstitucion(e.target.value)} placeholder="Nombre de institucion" required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="carrera">Carrera</Label>
            <Input id="carrera" value={carrera} onChange={(e) => setCarrera(e.target.value)} placeholder="Ingenieria en Sistemas" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nivel">Nivel</Label>
              <Select value={nivel} onValueChange={(v) => setNivel(v as NivelEducativo)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  {NIVELES.map((n) => (
                    <SelectItem key={n.value} value={n.value}>
                      {n.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="grado">Grado</Label>
              <Input id="grado" value={grado} onChange={(e) => setGrado(e.target.value)} placeholder="6to Semestre / 3ro Basico" required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="presupuesto">Presupuesto Mensual (Q)</Label>
            <Input
              id="presupuesto"
              type="number"
              min="1"
              value={presupuestoMensual}
              onChange={(e) => setPresupuestoMensual(e.target.value)}
              placeholder="2000"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Registrar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
