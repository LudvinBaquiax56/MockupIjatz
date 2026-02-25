import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { actividades } from "@/lib/data"
import { CheckCircle2, Clock } from "lucide-react"

const tipoColors: Record<string, string> = {
  taller: "bg-chart-1/10 text-chart-1",
  reunion: "bg-chart-2/10 text-chart-2",
  entrega: "bg-chart-4/10 text-chart-4",
  evento: "bg-chart-5/10 text-chart-5",
}

export function RecentActivity() {
  const sorted = [...actividades].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {sorted.slice(0, 5).map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3"
            >
              <div className="mt-0.5">
                {act.completada ? (
                  <CheckCircle2 className="size-4 text-primary" />
                ) : (
                  <Clock className="size-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight truncate">
                  {act.titulo}
                </p>
                <p className="text-xs text-muted-foreground">
                  {act.becarioNombre} &middot;{" "}
                  {new Date(act.fecha).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
              <Badge variant="secondary" className={`shrink-0 text-[10px] ${tipoColors[act.tipo] || ""}`}>
                {act.tipo}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
