"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMockData } from "@/lib/mock-data-context"
import { Bell, FileText, CalendarDays, RefreshCw } from "lucide-react"

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

export function UpcomingReminders() {
  const { recordatorios } = useMockData()
  const sorted = [...recordatorios].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recordatorios Proximos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {sorted.slice(0, 5).map((rec) => {
            const Icon = tipoIcons[rec.tipo] || Bell
            return (
              <div key={rec.id} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md bg-muted p-1.5">
                  <Icon className="size-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">
                    {rec.titulo}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(rec.fecha).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`shrink-0 text-[10px] ${prioridadStyles[rec.prioridad] || ""}`}
                >
                  {rec.prioridad}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
