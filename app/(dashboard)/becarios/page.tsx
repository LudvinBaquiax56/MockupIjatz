"use client"

import { useState } from "react"
import { BecariosList } from "@/components/becarios/becarios-list"
import { BecarioDetail } from "@/components/becarios/becario-detail"
import { AddBecarioDialog } from "@/components/becarios/add-becario-dialog"
import { EditBecarioDialog } from "@/components/becarios/edit-becario-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useMockData } from "@/lib/mock-data-context"

export default function BecariosPage() {
  const { becarios, addBecario, getMesActual, calcularGastoMensual } = useMockData()
  const [search, setSearch] = useState("")
  const [selectedBecarioId, setSelectedBecarioId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const selectedBecario = selectedBecarioId
    ? becarios.find((b) => b.id === selectedBecarioId) ?? null
    : null

  const filtered = becarios.filter(
    (b) =>
      b.nombre.toLowerCase().includes(search.toLowerCase()) ||
      b.apellido.toLowerCase().includes(search.toLowerCase()) ||
      b.carrera.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Becarios
          </h1>
          <p className="text-sm text-muted-foreground">
            Gestion y seguimiento de becarios registrados
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2">
          <Plus className="size-4" />
          Nuevo Becario
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o carrera..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {selectedBecario ? (
        <BecarioDetail
          becario={selectedBecario}
          onBack={() => setSelectedBecarioId(null)}
          onEdit={() => setShowEdit(true)}
        />
      ) : (
        <BecariosList
          becarios={filtered}
          onSelect={(b) => setSelectedBecarioId(b.id)}
          getGastoTotal={(becarioId) => calcularGastoMensual(becarioId, getMesActual())}
        />
      )}

      <AddBecarioDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        onSubmit={(data) => {
          addBecario(data)
        }}
      />

      {selectedBecario && (
        <EditBecarioDialog
          becario={selectedBecario}
          open={showEdit}
          onOpenChange={setShowEdit}
        />
      )}
    </div>
  )
}
