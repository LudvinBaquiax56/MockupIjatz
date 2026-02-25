// BecaControl - Data model with roles, niveles, ahorro, descuentos

// ── Types ──────────────────────────────────────────────────

export type Rol = "director" | "encargada" | "secretaria" | "tesorero" | "becario"
export type NivelEducativo = "medio" | "diversificado" | "universitario"
export type TipoBeca = "completa" | "parcial" | "investigacion"
export type EstadoBecario = "activo" | "inactivo" | "pendiente"
export type CategoriaGasto = "alimentacion" | "transporte" | "material_educativo" | "vivienda" | "salud" | "tecnologia"
export type EstadoGasto = "aprobado" | "pendiente" | "rechazado"
export type EstadoPago = "pendiente" | "pagado" | "retenido"

export interface Usuario {
  id: string
  nombre: string
  apellido: string
  rol: Rol
  email: string
  becarioId?: string // solo si rol === "becario"
}

export interface Becario {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  carrera: string
  institucion: string
  nivel: NivelEducativo
  grado: string // "3ro Basico", "5to Diversificado", "6to Semestre", etc.
  tipoBeca: TipoBeca
  estado: EstadoBecario
  presupuestoMensual: number
  fechaInicio: string
  avatar?: string
}

export interface Gasto {
  id: string
  becarioId: string
  becarioNombre: string
  concepto: string
  categoria: CategoriaGasto
  monto: number
  fecha: string
  estado?: EstadoGasto
  mes: string // "2026-02" for grouping
}

export interface Descuento {
  id: string
  becarioId: string
  becarioNombre: string
  motivo: string
  tipo: "documentos" | "entrega" | "atraso" | "otro"
  monto: number
  fecha: string
  mesAplicado: string // "2026-02"
}

export interface Pago {
  id: string
  becarioId: string
  becarioNombre: string
  mes: string
  montoBase: number
  descuentos: number
  montoNeto: number
  estado: EstadoPago
  fechaPago?: string
}

export interface Actividad {
  id: string
  becarioId: string
  becarioNombre: string
  tipo: "taller" | "reunion" | "entrega" | "evento"
  titulo: string
  fecha: string
  completada: boolean
}

export interface Recordatorio {
  id: string
  titulo: string
  descripcion: string
  fecha: string
  tipo: "renovacion" | "documento" | "actividad" | "general"
  prioridad: "alta" | "media" | "baja"
  nivelDestino: NivelEducativo | "todos"
}

// ── Users (mock) ───────────────────────────────────────────

export const usuarios: Usuario[] = [
  { id: "u1", nombre: "Roberto", apellido: "Mendez", rol: "director", email: "director@fundacion.org" },
  { id: "u2", nombre: "Lucia", apellido: "Ramirez", rol: "encargada", email: "encargada@fundacion.org" },
  { id: "u3", nombre: "Carmen", apellido: "Perez", rol: "secretaria", email: "secretaria@fundacion.org" },
  { id: "u4", nombre: "Fernando", apellido: "Gutierrez", rol: "tesorero", email: "tesorero@fundacion.org" },
  { id: "u5", nombre: "Maria", apellido: "Lopez Gonzalez", rol: "becario", email: "maria.lopez@instituto.edu", becarioId: "1" },
]

// ── Becarios ───────────────────────────────────────────────

export const becarios: Becario[] = [
  {
    id: "1",
    nombre: "Maria",
    apellido: "Lopez Gonzalez",
    email: "maria.lopez@instituto.edu",
    telefono: "5551-2345",
    carrera: "Ingenieria en Sistemas",
    institucion: "Universidad del Valle",
    nivel: "universitario",
    grado: "6to Semestre",
    tipoBeca: "completa",
    estado: "activo",
    presupuestoMensual: 2000,
    fechaInicio: "2025-01-15",
  },
  {
    id: "2",
    nombre: "Carlos",
    apellido: "Martinez Ruiz",
    email: "carlos.martinez@instituto.edu",
    telefono: "5559-8765",
    carrera: "Medicina",
    institucion: "Universidad San Carlos",
    nivel: "universitario",
    grado: "8vo Semestre",
    tipoBeca: "completa",
    estado: "activo",
    presupuestoMensual: 2500,
    fechaInicio: "2024-08-20",
  },
  {
    id: "3",
    nombre: "Ana",
    apellido: "Garcia Herrera",
    email: "ana.garcia@instituto.edu",
    telefono: "5554-5678",
    carrera: "Derecho",
    institucion: "Universidad Mariano Galvez",
    nivel: "universitario",
    grado: "4to Semestre",
    tipoBeca: "parcial",
    estado: "activo",
    presupuestoMensual: 1500,
    fechaInicio: "2025-02-01",
  },
  {
    id: "4",
    nombre: "Luis",
    apellido: "Hernandez Pech",
    email: "luis.hernandez@colegio.edu",
    telefono: "5556-7890",
    carrera: "Bachillerato en Ciencias",
    institucion: "Colegio Americano",
    nivel: "diversificado",
    grado: "5to Bachillerato",
    tipoBeca: "completa",
    estado: "activo",
    presupuestoMensual: 1200,
    fechaInicio: "2025-01-10",
  },
  {
    id: "5",
    nombre: "Sofia",
    apellido: "Chan Tun",
    email: "sofia.chan@instituto.edu",
    telefono: "5553-4567",
    carrera: "Perito Contador",
    institucion: "Instituto Tecnico Vocacional",
    nivel: "diversificado",
    grado: "4to Perito",
    tipoBeca: "parcial",
    estado: "pendiente",
    presupuestoMensual: 1000,
    fechaInicio: "2026-01-20",
  },
  {
    id: "6",
    nombre: "Diego",
    apellido: "Ramirez Ku",
    email: "diego.ramirez@instituto.edu",
    telefono: "5558-9012",
    carrera: "Ingenieria Civil",
    institucion: "Universidad Rafael Landivar",
    nivel: "universitario",
    grado: "7mo Semestre",
    tipoBeca: "completa",
    estado: "activo",
    presupuestoMensual: 2000,
    fechaInicio: "2024-09-01",
  },
  {
    id: "7",
    nombre: "Valeria",
    apellido: "Poot May",
    email: "valeria.poot@escuela.edu",
    telefono: "5552-3456",
    carrera: "Tercero Basico",
    institucion: "Escuela Nacional Central",
    nivel: "medio",
    grado: "3ro Basico",
    tipoBeca: "parcial",
    estado: "activo",
    presupuestoMensual: 800,
    fechaInicio: "2025-01-15",
  },
  {
    id: "8",
    nombre: "Jorge",
    apellido: "Canul Balam",
    email: "jorge.canul@escuela.edu",
    telefono: "5557-8901",
    carrera: "Segundo Basico",
    institucion: "Instituto Nacional Mixto",
    nivel: "medio",
    grado: "2do Basico",
    tipoBeca: "completa",
    estado: "activo",
    presupuestoMensual: 800,
    fechaInicio: "2025-03-01",
  },
]

// ── Gastos ──────────────────────────────────────────────────

export const gastos: Gasto[] = [
  { id: "g1", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Almuerzo en la universidad", categoria: "alimentacion", monto: 150, fecha: "2026-02-20", estado: "aprobado", mes: "2026-02" },
  { id: "g2", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje de bus mensual", categoria: "transporte", monto: 300, fecha: "2026-02-18", estado: "aprobado", mes: "2026-02" },
  { id: "g3", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Libros de programacion", categoria: "material_educativo", monto: 450, fecha: "2026-02-10", estado: "aprobado", mes: "2026-02" },
  { id: "g4", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Cuota de internet", categoria: "tecnologia", monto: 200, fecha: "2026-02-05", estado: "aprobado", mes: "2026-02" },
  { id: "g5", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Comida mes anterior", categoria: "alimentacion", monto: 400, fecha: "2026-01-15", estado: "aprobado", mes: "2026-01" },
  { id: "g6", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte enero", categoria: "transporte", monto: 280, fecha: "2026-01-10", estado: "aprobado", mes: "2026-01" },
  { id: "g7", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Utiles diciembre", categoria: "material_educativo", monto: 350, fecha: "2025-12-12", estado: "aprobado", mes: "2025-12" },
  { id: "g8", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Instrumental medico", categoria: "material_educativo", monto: 800, fecha: "2026-02-22", estado: "aprobado", mes: "2026-02" },
  { id: "g9", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion febrero", categoria: "alimentacion", monto: 600, fecha: "2026-02-19", estado: "aprobado", mes: "2026-02" },
  { id: "g10", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Consulta medica", categoria: "salud", monto: 250, fecha: "2026-02-15", estado: "pendiente", mes: "2026-02" },
  { id: "g11", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Codigos y leyes", categoria: "material_educativo", monto: 350, fecha: "2026-02-21", estado: "aprobado", mes: "2026-02" },
  { id: "g12", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta habitacion", categoria: "vivienda", monto: 500, fecha: "2026-02-01", estado: "aprobado", mes: "2026-02" },
  { id: "g13", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Materiales de dibujo tecnico", categoria: "material_educativo", monto: 200, fecha: "2026-02-23", estado: "aprobado", mes: "2026-02" },
  { id: "g14", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Almuerzo en colegio", categoria: "alimentacion", monto: 180, fecha: "2026-02-15", estado: "aprobado", mes: "2026-02" },
  { id: "g15", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas durante practicas", categoria: "alimentacion", monto: 400, fecha: "2026-02-24", estado: "pendiente", mes: "2026-02" },
  { id: "g16", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte a obra", categoria: "transporte", monto: 250, fecha: "2026-02-12", estado: "aprobado", mes: "2026-02" },
  { id: "g17", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Utiles escolares", categoria: "material_educativo", monto: 150, fecha: "2026-02-08", estado: "aprobado", mes: "2026-02" },
  { id: "g18", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje de bus", categoria: "transporte", monto: 100, fecha: "2026-02-10", estado: "aprobado", mes: "2026-02" },
  { id: "g19", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Cuadernos y lapices", categoria: "material_educativo", monto: 120, fecha: "2026-02-17", estado: "aprobado", mes: "2026-02" },
  { id: "g20", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Refaccion escolar", categoria: "alimentacion", monto: 80, fecha: "2026-02-20", estado: "aprobado", mes: "2026-02" },
]

// ── Descuentos ──────────────────────────────────────────────

export const descuentos: Descuento[] = [
  { id: "d1", becarioId: "2", becarioNombre: "Carlos Martinez", motivo: "Entrega tardia de constancia de inscripcion", tipo: "documentos", monto: 200, fecha: "2026-02-10", mesAplicado: "2026-02" },
  { id: "d2", becarioId: "6", becarioNombre: "Diego Ramirez", motivo: "No asistio al taller obligatorio", tipo: "atraso", monto: 150, fecha: "2026-02-15", mesAplicado: "2026-02" },
  { id: "d3", becarioId: "4", becarioNombre: "Luis Hernandez", motivo: "Informe mensual entregado incompleto", tipo: "entrega", monto: 100, fecha: "2026-01-28", mesAplicado: "2026-01" },
]

// ── Pagos ────────────────────────────────────────────────────

export const pagos: Pago[] = [
  { id: "p1", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2026-02", montoBase: 2000, descuentos: 0, montoNeto: 2000, estado: "pagado", fechaPago: "2026-02-05" },
  { id: "p2", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2026-02", montoBase: 2500, descuentos: 200, montoNeto: 2300, estado: "pendiente" },
  { id: "p3", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2026-02", montoBase: 1500, descuentos: 0, montoNeto: 1500, estado: "pagado", fechaPago: "2026-02-05" },
  { id: "p4", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2026-02", montoBase: 1200, descuentos: 0, montoNeto: 1200, estado: "pendiente" },
  { id: "p5", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2026-02", montoBase: 2000, descuentos: 150, montoNeto: 1850, estado: "retenido" },
  { id: "p6", becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2026-02", montoBase: 800, descuentos: 0, montoNeto: 800, estado: "pagado", fechaPago: "2026-02-05" },
  { id: "p7", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2026-02", montoBase: 800, descuentos: 0, montoNeto: 800, estado: "pendiente" },
]

// ── Actividades ─────────────────────────────────────────────

export const actividades: Actividad[] = [
  { id: "a1", becarioId: "1", becarioNombre: "Maria Lopez", tipo: "taller", titulo: "Taller de liderazgo", fecha: "2026-02-25", completada: false },
  { id: "a2", becarioId: "2", becarioNombre: "Carlos Martinez", tipo: "entrega", titulo: "Entrega de informe mensual", fecha: "2026-02-28", completada: false },
  { id: "a3", becarioId: "3", becarioNombre: "Ana Garcia", tipo: "reunion", titulo: "Reunion con tutor", fecha: "2026-02-26", completada: false },
  { id: "a4", becarioId: "4", becarioNombre: "Luis Hernandez", tipo: "evento", titulo: "Expo estudiantil", fecha: "2026-03-01", completada: false },
  { id: "a5", becarioId: "1", becarioNombre: "Maria Lopez", tipo: "entrega", titulo: "Entrega de reporte de gastos", fecha: "2026-02-20", completada: true },
  { id: "a6", becarioId: "6", becarioNombre: "Diego Ramirez", tipo: "taller", titulo: "Taller de seguridad laboral", fecha: "2026-03-05", completada: false },
  { id: "a7", becarioId: "7", becarioNombre: "Valeria Poot", tipo: "entrega", titulo: "Boleta de calificaciones", fecha: "2026-03-02", completada: false },
  { id: "a8", becarioId: "8", becarioNombre: "Jorge Canul", tipo: "reunion", titulo: "Reunion con padres", fecha: "2026-03-08", completada: false },
]

// ── Recordatorios ───────────────────────────────────────────

export const recordatorios: Recordatorio[] = [
  { id: "r1", titulo: "Renovacion de becas universitarias", descripcion: "Renovacion semestral para becarios universitarios. Solicitar documentacion.", fecha: "2026-03-15", tipo: "renovacion", prioridad: "alta", nivelDestino: "universitario" },
  { id: "r2", titulo: "Entrega de constancia - Carlos Martinez", descripcion: "Carlos debe entregar su constancia de inscripcion actualizada.", fecha: "2026-02-28", tipo: "documento", prioridad: "alta", nivelDestino: "universitario" },
  { id: "r3", titulo: "Taller obligatorio de valores", descripcion: "Taller obligatorio para todos los becarios de nivel medio y diversificado.", fecha: "2026-03-10", tipo: "actividad", prioridad: "media", nivelDestino: "medio" },
  { id: "r4", titulo: "Revision trimestral de presupuestos", descripcion: "Revision trimestral de presupuestos asignados a cada becario.", fecha: "2026-03-20", tipo: "general", prioridad: "media", nivelDestino: "todos" },
  { id: "r5", titulo: "Boletas de calificaciones nivel medio", descripcion: "Todos los becarios de nivel medio deben entregar boletas de calificaciones.", fecha: "2026-03-05", tipo: "documento", prioridad: "alta", nivelDestino: "medio" },
  { id: "r6", titulo: "Inscripcion diversificado", descripcion: "Periodo de inscripcion para becarios de diversificado. Verificar papeleria.", fecha: "2026-03-12", tipo: "documento", prioridad: "media", nivelDestino: "diversificado" },
]

// ── Helper functions ────────────────────────────────────────

export function getGastosByBecario(becarioId: string): Gasto[] {
  return gastos.filter((g) => g.becarioId === becarioId)
}

export function getGastosByBecarioMes(becarioId: string, mes: string): Gasto[] {
  return gastos.filter((g) => g.becarioId === becarioId && g.mes === mes)
}

export function calcularGastoMensual(becarioId: string, mes: string): number {
  return getGastosByBecarioMes(becarioId, mes).reduce((sum, g) => sum + g.monto, 0)
}

export function calcularAhorroMensual(becarioId: string, mes: string): number {
  const becario = becarios.find((b) => b.id === becarioId)
  if (!becario) return 0
  const gastado = calcularGastoMensual(becarioId, mes)
  return Math.max(0, becario.presupuestoMensual - gastado)
}

export function calcularAhorroAcumulado(becarioId: string): number {
  const meses = ["2025-12", "2026-01", "2026-02"]
  return meses.reduce((total, mes) => total + calcularAhorroMensual(becarioId, mes), 0)
}

export function getDescuentosByBecario(becarioId: string): Descuento[] {
  return descuentos.filter((d) => d.becarioId === becarioId)
}

export function getDescuentosMes(becarioId: string, mes: string): number {
  return descuentos.filter((d) => d.becarioId === becarioId && d.mesAplicado === mes).reduce((sum, d) => sum + d.monto, 0)
}

export function getHistorialAhorro(becarioId: string) {
  const meses = [
    { mes: "2025-10", label: "Oct 2025" },
    { mes: "2025-11", label: "Nov 2025" },
    { mes: "2025-12", label: "Dic 2025" },
    { mes: "2026-01", label: "Ene 2026" },
    { mes: "2026-02", label: "Feb 2026" },
  ]
  const becario = becarios.find((b) => b.id === becarioId)
  if (!becario) return []
  return meses.map((m) => {
    const gastado = calcularGastoMensual(becarioId, m.mes)
    const ahorro = Math.max(0, becario.presupuestoMensual - gastado)
    return { ...m, presupuesto: becario.presupuestoMensual, gastado, ahorro }
  })
}

export function getGastosPorCategoria(becarioId?: string) {
  const filtered = becarioId ? gastos.filter((g) => g.becarioId === becarioId) : gastos
  const categorias: Record<string, number> = {}
  filtered.forEach((g) => {
    categorias[g.categoria] = (categorias[g.categoria] || 0) + g.monto
  })
  return Object.entries(categorias).map(([name, value]) => ({ name: formatCategoria(name), value }))
}

export function getGastosPorMes() {
  return [
    { mes: "Oct", monto: 4200 },
    { mes: "Nov", monto: 5800 },
    { mes: "Dic", monto: 3900 },
    { mes: "Ene", monto: 6300 },
    { mes: "Feb", monto: 7280 },
  ]
}

export function formatCategoria(cat: string): string {
  const map: Record<string, string> = {
    alimentacion: "Alimentacion",
    transporte: "Transporte",
    material_educativo: "Material Educativo",
    vivienda: "Vivienda",
    salud: "Salud",
    tecnologia: "Tecnologia",
  }
  return map[cat] || cat
}

export function formatNivel(nivel: string): string {
  const map: Record<string, string> = {
    medio: "Nivel Medio",
    diversificado: "Diversificado",
    universitario: "Universitario",
  }
  return map[nivel] || nivel
}

export function formatTipoBeca(tipo: string): string {
  const map: Record<string, string> = {
    completa: "Completa",
    parcial: "Parcial",
    investigacion: "Investigacion",
  }
  return map[tipo] || tipo
}

export function formatEstado(estado: string): string {
  const map: Record<string, string> = {
    activo: "Activo",
    inactivo: "Inactivo",
    pendiente: "Pendiente",
    aprobado: "Aprobado",
    rechazado: "Rechazado",
    pagado: "Pagado",
    retenido: "Retenido",
  }
  return map[estado] || estado
}

export function formatRol(rol: Rol): string {
  const map: Record<string, string> = {
    director: "Director General",
    encargada: "Encargada de Becarios",
    secretaria: "Secretaria",
    tesorero: "Tesorero",
    becario: "Becario",
  }
  return map[rol] || rol
}

export const CATEGORIAS_GASTO: { value: CategoriaGasto; label: string }[] = [
  { value: "alimentacion", label: "Alimentacion" },
  { value: "transporte", label: "Transporte" },
  { value: "material_educativo", label: "Material Educativo" },
  { value: "vivienda", label: "Vivienda" },
  { value: "salud", label: "Salud" },
  { value: "tecnologia", label: "Tecnologia" },
]

export const NIVELES: { value: NivelEducativo; label: string }[] = [
  { value: "medio", label: "Nivel Medio" },
  { value: "diversificado", label: "Diversificado" },
  { value: "universitario", label: "Universitario" },
]

export function formatMes(mes: string): string {
  const [y, m] = mes.split("-")
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  return `${meses[parseInt(m) - 1]} ${y}`
}
