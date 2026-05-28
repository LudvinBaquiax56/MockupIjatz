"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { type Gasto, formatCategoria } from "@/lib/data"
import { usePagination } from "@/lib/use-pagination"

export function GastosTable({
  gastos,
  onDelete,
}: {
  gastos: Gasto[]
  onDelete?: (id: string) => void
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { page, setPage, totalPages, paginatedItems } = usePagination(gastos, 15)

  return (
    <>
      <div className="flex flex-col gap-3">
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead className="hidden sm:table-cell">Becario</TableHead>
              <TableHead className="hidden md:table-cell">Categoria</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              {onDelete && <TableHead className="w-10" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={onDelete ? 6 : 5} className="h-24 text-center text-muted-foreground">
                  No se encontraron gastos
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{g.concepto}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {g.becarioNombre}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {g.becarioNombre}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="text-xs">
                      {formatCategoria(g.categoria)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-semibold">
                    Q{g.monto.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {new Date(g.fecha).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  {onDelete && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeletingId(g.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
          <span>{gastos.length} gasto{gastos.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-8" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="size-4" />
            </Button>
            <span className="px-2 text-xs">{page} / {totalPages}</span>
            <Button variant="outline" size="icon" className="size-8" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
      </div>

      <AlertDialog open={!!deletingId} onOpenChange={(o) => { if (!o) setDeletingId(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar gasto</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede deshacer. El gasto sera eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deletingId) onDelete?.(deletingId)
                setDeletingId(null)
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
