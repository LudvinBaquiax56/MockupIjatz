"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readLS(key, initial))
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const
}
import {
  becarios as initialBecarios,
  gastos as initialGastos,
  recordatorios as initialRecordatorios,
  pagos as initialPagos,
  descuentos as initialDescuentos,
  tareasAsignadas as initialTareas,
  entregasDocumentos as initialEntregas,
  type Becario,
  type Descuento,
  type Gasto,
  type Pago,
  type Recordatorio,
  type TareaAsignada,
  type EntregaDocumento,
  type CategoriaGasto,
  type NivelEducativo,
  type EstadoBecario,
  type TipoDocumento,
} from "@/lib/data"

type AddGastoInput = {
  becarioId: string
  concepto: string
  categoria: CategoriaGasto
  monto: number
  fecha: string
  imagenes?: string[]
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

type AddTareaInput = {
  titulo: string
  descripcion: string
  tipo: TipoDocumento
  fechaLimite: string
  nivelDestino: NivelEducativo | "todos"
  creadaPor: string
}

type AddEntregaInput = {
  tareaId: string
  becarioId: string
  archivos: string[]
  comentario?: string
}

interface MockDataContextType {
  becarios: Becario[]
  gastos: Gasto[]
  recordatorios: Recordatorio[]
  pagos: Pago[]
  descuentos: Descuento[]
  tareas: TareaAsignada[]
  entregas: EntregaDocumento[]
  addGasto: (input: AddGastoInput) => void
  updateGasto: (id: string, data: Partial<Gasto>) => void
  deleteGasto: (id: string) => void
  addBecario: (input: AddBecarioInput) => void
  updateBecario: (id: string, data: Partial<Becario>) => void
  addRecordatorio: (input: AddRecordatorioInput) => void
  addTarea: (input: AddTareaInput) => void
  addEntrega: (input: AddEntregaInput) => void
  updateEntrega: (id: string, data: Partial<EntregaDocumento>) => void
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
  getEntregasByBecario: (becarioId: string) => EntregaDocumento[]
  getEntregasByTarea: (tareaId: string) => EntregaDocumento[]
  getTareasParaBecario: (nivel: NivelEducativo) => TareaAsignada[]
  getEntregaByTareaYBecario: (tareaId: string, becarioId: string) => EntregaDocumento | undefined
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
  const [becarios, setBecarios] = usePersistedState<Becario[]>("beca_becarios", initialBecarios)
  const [gastos, setGastos] = usePersistedState<Gasto[]>("beca_gastos", initialGastos)
  const [recordatorios, setRecordatorios] = usePersistedState<Recordatorio[]>("beca_recordatorios", initialRecordatorios)
  const [pagos, setPagos] = usePersistedState<Pago[]>("beca_pagos", initialPagos)
  const [descuentos] = useState<Descuento[]>(initialDescuentos)
  const [tareas, setTareas] = usePersistedState<TareaAsignada[]>("beca_tareas", initialTareas)
  const [entregas, setEntregas] = usePersistedState<EntregaDocumento[]>("beca_entregas", initialEntregas)

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
      imagenes: input.imagenes ?? [],
    }
    setGastos((prev) => [nuevo, ...prev])
  }

  function updateGasto(id: string, data: Partial<Gasto>) {
    setGastos((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)))
  }

  function deleteGasto(id: string) {
    setGastos((prev) => prev.filter((g) => g.id !== id))
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
      estado: input.estado ?? "activo",
      presupuestoMensual: input.presupuestoMensual,
      fechaInicio: new Date().toISOString().slice(0, 10),
    }
    setBecarios((prev) => [nuevo, ...prev])
  }

  function updateBecario(id: string, data: Partial<Becario>) {
    setBecarios((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)))
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

  function addTarea(input: AddTareaInput) {
    const nextId = `t${tareas.length + 1}`
    const nueva: TareaAsignada = {
      id: nextId,
      titulo: input.titulo,
      descripcion: input.descripcion,
      tipo: input.tipo,
      fechaLimite: input.fechaLimite,
      nivelDestino: input.nivelDestino,
      creadaPor: input.creadaPor,
    }
    setTareas((prev) => [nueva, ...prev])
  }

  function addEntrega(input: AddEntregaInput) {
    const becario = becarios.find((b) => b.id === input.becarioId)
    if (!becario) return
    const nextId = `e${entregas.length + 1}`
    const nueva: EntregaDocumento = {
      id: nextId,
      tareaId: input.tareaId,
      becarioId: input.becarioId,
      becarioNombre: `${becario.nombre} ${becario.apellido}`,
      archivos: input.archivos,
      comentario: input.comentario,
      fechaEntrega: new Date().toISOString().slice(0, 10),
      estado: "entregado",
    }
    setEntregas((prev) => [nueva, ...prev])
  }

  function updateEntrega(id: string, data: Partial<EntregaDocumento>) {
    setEntregas((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)))
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

  function getEntregasByBecario(becarioId: string) {
    return entregas.filter((e) => e.becarioId === becarioId)
  }

  function getEntregasByTarea(tareaId: string) {
    return entregas.filter((e) => e.tareaId === tareaId)
  }

  function getTareasParaBecario(nivel: NivelEducativo) {
    return tareas.filter((t) => t.nivelDestino === nivel || t.nivelDestino === "todos")
  }

  function getEntregaByTareaYBecario(tareaId: string, becarioId: string) {
    return entregas.find((e) => e.tareaId === tareaId && e.becarioId === becarioId)
  }

  const value = useMemo<MockDataContextType>(
    () => ({
      becarios,
      gastos,
      recordatorios,
      pagos,
      descuentos,
      tareas,
      entregas,
      addGasto,
      updateGasto,
      deleteGasto,
      addBecario,
      updateBecario,
      addRecordatorio,
      addTarea,
      addEntrega,
      updateEntrega,
      marcarPagoPagado,
      getBecarioById,
      getGastosByBecario,
      getGastosByBecarioMes,
      calcularGastoMensual,
      calcularAhorroMensual,
      calcularAhorroAcumulado,
      getHistorialAhorro,
      getMesActual,
      getEntregasByBecario,
      getEntregasByTarea,
      getTareasParaBecario,
      getEntregaByTareaYBecario,
    }),
    [becarios, gastos, recordatorios, pagos, descuentos, tareas, entregas]
  )

  return <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>
}

export function useMockData() {
  const ctx = useContext(MockDataContext)
  if (!ctx) throw new Error("useMockData must be used inside MockDataProvider")
  return ctx
}
