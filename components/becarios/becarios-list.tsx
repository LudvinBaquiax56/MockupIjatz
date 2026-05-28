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
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"
import { type Becario, formatEstado } from "@/lib/data"
import { usePagination } from "@/lib/use-pagination"

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
  const { page, setPage, totalPages, paginatedItems } = usePagination(becarios, 10)

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Becario</TableHead>
              <TableHead className="hidden md:table-cell">Carrera</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden lg:table-cell">Presupuesto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No se encontraron becarios
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((b) => {
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
                          <span className={`font-medium flex items-center gap-1 ${porcentaje >= 80 ? "text-destructive" : ""}`}>
                            {porcentaje >= 80 && <AlertTriangle className="size-3" />}
                            {porcentaje}%
                          </span>
                        </div>
                        <Progress
                          value={porcentaje}
                          className={`h-1.5 ${porcentaje >= 80 ? "[&>div]:bg-destructive" : ""}`}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
          <span>{becarios.length} becario{becarios.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="px-2 text-xs">{page} / {totalPages}</span>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
