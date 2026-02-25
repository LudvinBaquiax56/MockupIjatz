"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Wallet,
} from "lucide-react"
import {
  type Becario,
  actividades,
  formatTipoBeca,
  formatEstado,
  formatCategoria,
  formatNivel,
} from "@/lib/data"
import { useMockData } from "@/lib/mock-data-context"

const estadoStyles: Record<string, string> = {
  activo: "bg-primary/10 text-primary border-primary/20",
  inactivo: "bg-muted text-muted-foreground border-border",
  pendiente: "bg-chart-3/10 text-chart-3 border-chart-3/20",
}

export function BecarioDetail({
  becario,
  onBack,
}: {
  becario: Becario
  onBack: () => void
}) {
  const { getGastosByBecario, calcularGastoMensual, getMesActual } = useMockData()
  const becarioGastos = getGastosByBecario(becario.id)
  const becarioActividades = actividades.filter(
    (a) => a.becarioId === becario.id
  )
  const mesActual = getMesActual()
  const gastoTotal = calcularGastoMensual(becario.id, mesActual)
  const porcentaje = becario.presupuestoMensual > 0 ? Math.round((gastoTotal / becario.presupuestoMensual) * 100) : 0
  const saldoRestante = becario.presupuestoMensual - gastoTotal

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="w-fit gap-2 text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver a la lista
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar className="size-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {becario.nombre[0]}
                  {becario.apellido[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-bold">
                  {becario.nombre} {becario.apellido}
                </h2>
                <Badge
                  variant="outline"
                  className={`mt-1 ${estadoStyles[becario.estado] || ""}`}
                >
                  {formatEstado(becario.estado)}
                </Badge>
              </div>

              <Separator />

              <div className="flex w-full flex-col gap-3 text-left text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" />
                  <span className="truncate">{becario.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  <span>{becario.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="size-4" />
                  <span>
                    {becario.carrera} - {formatNivel(becario.nivel)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>
                    Desde{" "}
                    {new Date(becario.fechaInicio).toLocaleDateString("es-MX", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wallet className="size-4" />
                  <span>Beca {formatTipoBeca(becario.tipoBeca)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Budget card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Presupuesto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">
                      Q{gastoTotal.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      de Q{becario.presupuestoMensual.toLocaleString()} asignados
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">
                      Q{saldoRestante.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">disponible</p>
                  </div>
                </div>
                <Progress value={porcentaje} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {porcentaje}% utilizado
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent expenses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gastos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              {becarioGastos.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay gastos registrados
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {becarioGastos.slice(0, 5).map((g) => (
                    <div
                      key={g.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{g.concepto}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCategoria(g.categoria)} &middot;{" "}
                          {new Date(g.fecha).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        Q{g.monto.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actividades</CardTitle>
            </CardHeader>
            <CardContent>
              {becarioActividades.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay actividades registradas
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {becarioActividades.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{a.titulo}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(a.fecha).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                      <Badge
                        variant={a.completada ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {a.completada ? "Completada" : "Pendiente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
