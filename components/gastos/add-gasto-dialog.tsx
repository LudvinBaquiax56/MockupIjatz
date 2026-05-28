"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIAS_GASTO, type Becario, type CategoriaGasto } from "@/lib/data"
import { useMockData } from "@/lib/mock-data-context"
import { toast } from "sonner"

type NewGastoInput = {
  becarioId: string
  concepto: string
  categoria: CategoriaGasto
  monto: number
  fecha: string
}

export function AddGastoDialog({
  open,
  onOpenChange,
  becarios,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  becarios: Becario[]
  onSubmit: (data: NewGastoInput) => void
}) {
  const { calcularGastoMensual } = useMockData()
  const becariosActivos = becarios.filter((b) => b.estado === "activo")
  const [becarioId, setBecarioId] = useState("")
  const [concepto, setConcepto] = useState("")
  const [categoria, setCategoria] = useState<CategoriaGasto | "">("")
  const [monto, setMonto] = useState("")
  const [fecha, setFecha] = useState("")

  function reset() {
    setBecarioId("")
    setConcepto("")
    setCategoria("")
    setMonto("")
    setFecha("")
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!becarioId || !categoria) {
      toast.error("Completa becario y categoria")
      return
    }
    const montoNum = Number(monto)
    if (Number.isNaN(montoNum) || montoNum <= 0) {
      toast.error("Ingresa un monto valido")
      return
    }
    const mesFecha = fecha.slice(0, 7)
    const gastoAcumulado = calcularGastoMensual(becarioId, mesFecha)
    const becario = becarios.find((b) => b.id === becarioId)
    const presupuesto = becario?.presupuestoMensual ?? 0
    const totalConNuevo = gastoAcumulado + montoNum

    onSubmit({
      becarioId,
      concepto: concepto.trim(),
      categoria,
      monto: montoNum,
      fecha,
    })

    if (presupuesto > 0 && totalConNuevo > presupuesto) {
      toast.warning("Este gasto supera el presupuesto mensual del becario")
    } else if (presupuesto > 0 && totalConNuevo / presupuesto >= 0.8) {
      toast.warning("El becario ha superado el 80% de su presupuesto este mes")
    } else {
      toast.success("Gasto registrado exitosamente")
    }
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
          <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
          <DialogDescription>Ingresa los detalles del gasto para el control del programa.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="becario">Becario</Label>
            <Select value={becarioId} onValueChange={setBecarioId} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar becario" />
              </SelectTrigger>
              <SelectContent>
                {becariosActivos.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.nombre} {b.apellido}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="concepto">Concepto</Label>
            <Textarea id="concepto" value={concepto} onChange={(e) => setConcepto(e.target.value)} placeholder="Describe el gasto..." required rows={2} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
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
              <Input id="monto" type="number" min="0.01" step="0.01" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="100.00" required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Registrar Gasto</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
