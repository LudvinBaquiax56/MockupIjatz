"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { actividades, NIVELES } from "@/lib/data"
import { useMockData } from "@/lib/mock-data-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  FileText,
  CalendarDays,
  RefreshCw,
  Plus,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { AddReminderDialog } from "@/components/calendario/add-reminder-dialog"

const tipoIcons: Record<string, React.ElementType> = {
  renovacion: RefreshCw,
  documento: FileText,
  actividad: CalendarDays,
  general: Bell,
}

const prioridadStyles: Record<string, string> = {
  alta: "bg-destructive/10 text-destructive border-destructive/20",
  media: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  baja: "bg-chart-2/10 text-chart-2 border-chart-2/20",
}

export default function CalendarioPage() {
  const { recordatorios, addRecordatorio } = useMockData()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showAdd, setShowAdd] = useState(false)
  const [filtroNivel, setFiltroNivel] = useState<string>("todos")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")

  // Combine reminders and activities for date highlights
  const eventDates = [
    ...recordatorios.map((r) => new Date(r.fecha)),
    ...actividades.map((a) => new Date(a.fecha)),
  ]

  const sortedReminders = [...recordatorios]
    .filter((r) => (filtroNivel === "todos" ? true : r.nivelDestino === filtroNivel || r.nivelDestino === "todos"))
    .filter((r) => (filtroTipo === "todos" ? true : r.tipo === filtroTipo))
    .sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    )

  const sortedActividades = [...actividades].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Calendario
          </h1>
          <p className="text-sm text-muted-foreground">
            Recordatorios, actividades y eventos del programa
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2">
          <Plus className="size-4" />
          Nuevo Recordatorio
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        {/* Calendar widget */}
        <Card>
          <CardContent className="pt-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={{
                event: eventDates,
              }}
              modifiersClassNames={{
                event: "bg-primary/20 font-bold text-primary",
              }}
              className="rounded-md"
            />
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="size-3 rounded-full bg-primary/20" />
              <span>Dias con eventos programados</span>
            </div>
          </CardContent>
        </Card>

        {/* Events list */}
        <div className="flex flex-col gap-6">
          {/* Reminders */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-base">Recordatorios</CardTitle>
                <div className="flex gap-2">
                  <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                    <SelectTrigger className="w-[180px] h-8">
                      <SelectValue placeholder="Filtrar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los niveles</SelectItem>
                      {NIVELES.map((n) => (
                        <SelectItem key={n.value} value={n.value}>
                          {n.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-[160px] h-8">
                      <SelectValue placeholder="Filtrar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los tipos</SelectItem>
                      <SelectItem value="renovacion">Renovacion</SelectItem>
                      <SelectItem value="documento">Documento</SelectItem>
                      <SelectItem value="actividad">Actividad</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {sortedReminders.map((rec) => {
                  const Icon = tipoIcons[rec.tipo] || Bell
                  return (
                    <div
                      key={rec.id}
                      className="flex items-start gap-3 rounded-lg border p-3"
                    >
                      <div className="rounded-md bg-muted p-2">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">{rec.titulo}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {rec.descripcion}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`shrink-0 text-[10px] ${prioridadStyles[rec.prioridad] || ""}`}
                          >
                            {rec.prioridad}
                          </Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {new Date(rec.fecha).toLocaleDateString("es-MX", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          Nivel: {rec.nivelDestino === "todos" ? "Todos" : rec.nivelDestino}
                        </p>
                      </div>
                    </div>
                  )
                })}
                {sortedReminders.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    No hay recordatorios para el filtro seleccionado
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Proximas Actividades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {sortedActividades.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    {act.completada ? (
                      <CheckCircle2 className="size-5 text-primary shrink-0" />
                    ) : (
                      <Clock className="size-5 text-muted-foreground shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{act.titulo}</p>
                      <p className="text-xs text-muted-foreground">
                        {act.becarioNombre} &middot;{" "}
                        {new Date(act.fecha).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <Badge
                      variant={act.completada ? "default" : "secondary"}
                      className="shrink-0 text-xs"
                    >
                      {act.completada ? "Completada" : act.tipo}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddReminderDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        onSubmit={(data) => {
          addRecordatorio(data)
        }}
      />
    </div>
  )
}
