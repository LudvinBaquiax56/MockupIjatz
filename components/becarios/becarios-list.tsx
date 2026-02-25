"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type Becario, formatTipoBeca, formatEstado } from "@/lib/data"

const estadoStyles: Record<string, string> = {
  activo: "bg-primary/10 text-primary border-primary/20",
  inactivo: "bg-muted text-muted-foreground border-border",
  pendiente: "bg-chart-3/10 text-chart-3 border-chart-3/20",
}

export function BecariosList({
  becarios,
  onSelect,
  getGastoTotal,
}: {
  becarios: Becario[]
  onSelect: (b: Becario) => void
  getGastoTotal: (becarioId: string) => number
}) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Becario</TableHead>
            <TableHead className="hidden md:table-cell">Carrera</TableHead>
            <TableHead className="hidden sm:table-cell">Beca</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="hidden lg:table-cell">Presupuesto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {becarios.map((b) => {
            const gastoTotal = getGastoTotal(b.id)
            const porcentaje = b.presupuestoMensual > 0 ? Math.round((gastoTotal / b.presupuestoMensual) * 100) : 0
            return (
              <TableRow
                key={b.id}
                className="cursor-pointer"
                onClick={() => onSelect(b)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {b.nombre[0]}
                        {b.apellido[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {b.nombre} {b.apellido}
                      </p>
                      <p className="text-xs text-muted-foreground md:hidden">
                        {b.carrera}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">
                  {b.carrera}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="text-xs">
                    {formatTipoBeca(b.tipoBeca)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${estadoStyles[b.estado] || ""}`}
                  >
                    {formatEstado(b.estado)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Q{gastoTotal.toLocaleString()}
                      </span>
                      <span className="font-medium">{porcentaje}%</span>
                    </div>
                    <Progress value={porcentaje} className="h-1.5" />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
