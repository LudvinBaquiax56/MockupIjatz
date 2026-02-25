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
import { type Gasto, formatCategoria } from "@/lib/data"

export function GastosTable({ gastos }: { gastos: Gasto[] }) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead className="hidden sm:table-cell">Becario</TableHead>
            <TableHead className="hidden md:table-cell">Categoria</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead className="hidden md:table-cell">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gastos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No se encontraron gastos
              </TableCell>
            </TableRow>
          ) : (
            gastos.map((g) => (
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
