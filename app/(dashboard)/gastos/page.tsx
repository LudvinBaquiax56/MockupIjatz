"use client"

import { useState } from "react"
import { GastosTable } from "@/components/gastos/gastos-table"
import { AddGastoDialog } from "@/components/gastos/add-gasto-dialog"
import { GastosSummary } from "@/components/gastos/gastos-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search } from "lucide-react"
import { useMockData } from "@/lib/mock-data-context"
import { CATEGORIAS_GASTO } from "@/lib/data"

export default function GastosPage() {
  const { gastos, becarios, addGasto } = useMockData()
  const [search, setSearch] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState("todas")
  const [showAdd, setShowAdd] = useState(false)

  const filtered = gastos.filter((g) => {
    const matchSearch =
      g.concepto.toLowerCase().includes(search.toLowerCase()) ||
      g.becarioNombre.toLowerCase().includes(search.toLowerCase())
    const matchCategoria =
      filtroCategoria === "todas" || g.categoria === filtroCategoria
    return matchSearch && matchCategoria
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Control de Gastos
          </h1>
          <p className="text-sm text-muted-foreground">
            Registro y seguimiento de gastos de becarios
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2">
          <Plus className="size-4" />
          Registrar Gasto
        </Button>
      </div>

      <GastosSummary />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar gasto o becario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorias</SelectItem>
            {CATEGORIAS_GASTO.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <GastosTable gastos={filtered} />
      <AddGastoDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        becarios={becarios}
        onSubmit={(data) => addGasto(data)}
      />
    </div>
  )
}
