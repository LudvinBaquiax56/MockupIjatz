"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import {
  becarios as initialBecarios,
  gastos as initialGastos,
  recordatorios as initialRecordatorios,
  pagos as initialPagos,
  descuentos as initialDescuentos,
  type Becario,
  type Descuento,
  type Gasto,
  type Pago,
  type Recordatorio,
  type CategoriaGasto,
  type NivelEducativo,
  type TipoBeca,
  type EstadoBecario,
} from "@/lib/data"

type AddGastoInput = {
  becarioId: string
  concepto: string
  categoria: CategoriaGasto
  monto: number
  fecha: string
}

type AddBecarioInput = {
  nombre: string
  apellido: string
  email: string
  telefono: string
  carrera: string
  institucion: string
  nivel: NivelEducativo
  grado: string
  tipoBeca: TipoBeca
  presupuestoMensual: number
  estado?: EstadoBecario
}

type AddRecordatorioInput = {
  titulo: string
  descripcion: string
  fecha: string
  tipo: Recordatorio["tipo"]
  prioridad: Recordatorio["prioridad"]
  nivelDestino: NivelEducativo | "todos"
}

interface MockDataContextType {
  becarios: Becario[]
  gastos: Gasto[]
  recordatorios: Recordatorio[]
  pagos: Pago[]
  descuentos: Descuento[]
  addGasto: (input: AddGastoInput) => void
  addBecario: (input: AddBecarioInput) => void
  addRecordatorio: (input: AddRecordatorioInput) => void
  marcarPagoPagado: (pagoId: string, fechaPago?: string) => void
  getBecarioById: (becarioId?: string) => Becario | undefined
  getGastosByBecario: (becarioId: string) => Gasto[]
  getGastosByBecarioMes: (becarioId: string, mes: string) => Gasto[]
  calcularGastoMensual: (becarioId: string, mes: string) => number
  calcularAhorroMensual: (becarioId: string, mes: string) => number
  calcularAhorroAcumulado: (becarioId: string) => number
  getHistorialAhorro: (becarioId: string) => {
    mes: string
    label: string
    presupuesto: number
    gastado: number
    ahorro: number
  }[]
  getMesActual: () => string
}

const MockDataContext = createContext<MockDataContextType | null>(null)

function getMesFromFecha(fecha: string) {
  return fecha.slice(0, 7)
}

function getMesActual() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${now.getFullYear()}-${month}`
}

function toMonthLabel(mes: string) {
  const [y, m] = mes.split("-")
  const nombres = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  return `${nombres[Math.max(0, parseInt(m, 10) - 1)]} ${y}`
}

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [becarios, setBecarios] = useState<Becario[]>(initialBecarios)
  const [gastos, setGastos] = useState<Gasto[]>(initialGastos)
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>(initialRecordatorios)
  const [pagos, setPagos] = useState<Pago[]>(initialPagos)
  const [descuentos] = useState<Descuento[]>(initialDescuentos)

  function addGasto(input: AddGastoInput) {
    const becario = becarios.find((b) => b.id === input.becarioId)
    if (!becario) return
    const nextId = `g${gastos.length + 1}`
    const nuevo: Gasto = {
      id: nextId,
      becarioId: input.becarioId,
      becarioNombre: `${becario.nombre} ${becario.apellido}`,
      concepto: input.concepto,
      categoria: input.categoria,
      monto: input.monto,
      fecha: input.fecha,
      mes: getMesFromFecha(input.fecha),
    }
    setGastos((prev) => [nuevo, ...prev])
  }

  function addBecario(input: AddBecarioInput) {
    const nextId = String(Math.max(...becarios.map((b) => parseInt(b.id, 10)), 0) + 1)
    const nuevo: Becario = {
      id: nextId,
      nombre: input.nombre,
      apellido: input.apellido,
      email: input.email,
      telefono: input.telefono,
      carrera: input.carrera,
      institucion: input.institucion,
      nivel: input.nivel,
      grado: input.grado,
      tipoBeca: input.tipoBeca,
      estado: input.estado ?? "activo",
      presupuestoMensual: input.presupuestoMensual,
      fechaInicio: new Date().toISOString().slice(0, 10),
    }
    setBecarios((prev) => [nuevo, ...prev])
  }

  function addRecordatorio(input: AddRecordatorioInput) {
    const nextId = `r${recordatorios.length + 1}`
    const nuevo: Recordatorio = {
      id: nextId,
      titulo: input.titulo,
      descripcion: input.descripcion,
      fecha: input.fecha,
      tipo: input.tipo,
      prioridad: input.prioridad,
      nivelDestino: input.nivelDestino,
    }
    setRecordatorios((prev) => [nuevo, ...prev])
  }

  function marcarPagoPagado(pagoId: string, fechaPago?: string) {
    const fecha = fechaPago ?? new Date().toISOString().slice(0, 10)
    setPagos((prev) =>
      prev.map((p) =>
        p.id === pagoId ? { ...p, estado: "pagado", fechaPago: p.fechaPago ?? fecha } : p
      )
    )
  }

  function getBecarioById(becarioId?: string) {
    if (!becarioId) return undefined
    return becarios.find((b) => b.id === becarioId)
  }

  function getGastosByBecario(becarioId: string) {
    return gastos.filter((g) => g.becarioId === becarioId)
  }

  function getGastosByBecarioMes(becarioId: string, mes: string) {
    return gastos.filter((g) => g.becarioId === becarioId && g.mes === mes)
  }

  function calcularGastoMensual(becarioId: string, mes: string) {
    return getGastosByBecarioMes(becarioId, mes).reduce((sum, g) => sum + g.monto, 0)
  }

  function calcularAhorroMensual(becarioId: string, mes: string) {
    const becario = getBecarioById(becarioId)
    if (!becario) return 0
    return Math.max(0, becario.presupuestoMensual - calcularGastoMensual(becarioId, mes))
  }

  function calcularAhorroAcumulado(becarioId: string) {
    const meses = Array.from(new Set(getGastosByBecario(becarioId).map((g) => g.mes))).sort()
    if (meses.length === 0) {
      return calcularAhorroMensual(becarioId, getMesActual())
    }
    return meses.reduce((total, mes) => total + calcularAhorroMensual(becarioId, mes), 0)
  }

  function getHistorialAhorro(becarioId: string) {
    const becario = getBecarioById(becarioId)
    if (!becario) return []
    const meses = Array.from(new Set(getGastosByBecario(becarioId).map((g) => g.mes))).sort()
    const baseMeses = meses.length > 0 ? meses : [getMesActual()]
    return baseMeses.map((mes) => {
      const gastado = calcularGastoMensual(becarioId, mes)
      const ahorro = Math.max(0, becario.presupuestoMensual - gastado)
      return {
        mes,
        label: toMonthLabel(mes),
        presupuesto: becario.presupuestoMensual,
        gastado,
        ahorro,
      }
    })
  }

  const value = useMemo<MockDataContextType>(
    () => ({
      becarios,
      gastos,
      recordatorios,
      pagos,
      descuentos,
      addGasto,
      addBecario,
      addRecordatorio,
      marcarPagoPagado,
      getBecarioById,
      getGastosByBecario,
      getGastosByBecarioMes,
      calcularGastoMensual,
      calcularAhorroMensual,
      calcularAhorroAcumulado,
      getHistorialAhorro,
      getMesActual,
    }),
    [becarios, gastos, recordatorios, pagos, descuentos]
  )

  return <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>
}

export function useMockData() {
  const ctx = useContext(MockDataContext)
  if (!ctx) throw new Error("useMockData must be used inside MockDataProvider")
  return ctx
}
