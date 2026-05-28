// BecaControl - Data model with roles, niveles, ahorro, descuentos

// ── Types ──────────────────────────────────────────────────

export type Rol =
  | "director"
  | "encargada"
  | "secretaria"
  | "tesorero"
  | "becario";
export type NivelEducativo = "diversificado" | "universitario";
export type EstadoBecario = "activo" | "inactivo" | "pendiente";
export type CategoriaGasto =
  | "alimentacion"
  | "transporte"
  | "material_educativo"
  | "vivienda"
  | "salud"
  | "tecnologia";
export type EstadoPago = "pendiente" | "pagado" | "retenido";
export type TipoDocumento =
  | "tarea"
  | "informe"
  | "constancia"
  | "boleta"
  | "otro";
export type EstadoEntrega =
  | "pendiente"
  | "entregado"
  | "revisado"
  | "rechazado";

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  rol: Rol;
  email: string;
  username: string;
  becarioId?: string; // solo si rol === "becario"
}

export interface Becario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  carrera: string;
  institucion: string;
  nivel: NivelEducativo;
  grado: string; // "3ro Basico", "5to Diversificado", "6to Semestre", etc.
  estado: EstadoBecario;
  presupuestoMensual: number;
  fechaInicio: string;
  avatar?: string;
}

export interface Gasto {
  id: string;
  becarioId: string;
  becarioNombre: string;
  concepto: string;
  categoria: CategoriaGasto;
  monto: number;
  fecha: string;
  mes: string; // "2026-02" for grouping
  imagenes?: string[]; // base64 data URLs
}

export interface Descuento {
  id: string;
  becarioId: string;
  becarioNombre: string;
  motivo: string;
  tipo: "documentos" | "entrega" | "atraso" | "otro";
  monto: number;
  fecha: string;
  mesAplicado: string; // "2026-02"
}

export interface Pago {
  id: string;
  becarioId: string;
  becarioNombre: string;
  mes: string;
  montoBase: number;
  descuentos: number;
  montoNeto: number;
  estado: EstadoPago;
  fechaPago?: string;
}

export interface Actividad {
  id: string;
  becarioId: string;
  becarioNombre: string;
  tipo: "taller" | "reunion" | "entrega" | "evento";
  titulo: string;
  fecha: string;
  completada: boolean;
}

export interface Recordatorio {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo: "renovacion" | "documento" | "actividad" | "general";
  prioridad: "alta" | "media" | "baja";
  nivelDestino: NivelEducativo | "todos";
}

export interface TareaAsignada {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: TipoDocumento;
  fechaLimite: string;
  nivelDestino: NivelEducativo | "todos";
  creadaPor: string;
}

export interface EntregaDocumento {
  id: string;
  tareaId: string;
  becarioId: string;
  becarioNombre: string;
  archivos: string[];
  comentario?: string;
  fechaEntrega: string;
  estado: EstadoEntrega;
  comentarioRevisor?: string;
}

// ── Users (mock) ───────────────────────────────────────────

export const usuarios: Usuario[] = [
  {
    id: "u1",
    nombre: "Christian",
    apellido: "Stich",
    rol: "director",
    email: "director@fundacion.org",
    username: "director",
  },
  {
    id: "u2",
    nombre: "Irma",
    apellido: "",
    rol: "encargada",
    email: "encargada@fundacion.org",
    username: "encargada",
  },
  {
    id: "u3",
    nombre: "Carolina",
    apellido: "Us",
    rol: "secretaria",
    email: "secretaria@fundacion.org",
    username: "secretaria",
  },
  {
    id: "u4",
    nombre: "Alfredo",
    apellido: "",
    rol: "tesorero",
    email: "tesorero@fundacion.org",
    username: "tesorero",
  },
  {
    id: "u5",
    nombre: "Maria",
    apellido: "Lopez Gonzalez",
    rol: "becario",
    email: "maria.lopez@instituto.edu",
    username: "maria",
    becarioId: "1",
  },
  {
    id: "u6",
    nombre: "Carlos",
    apellido: "Martinez Ruiz",
    rol: "becario",
    email: "carlos.martinez@instituto.edu",
    username: "carlos",
    becarioId: "2",
  },
  {
    id: "u7",
    nombre: "Ana",
    apellido: "Garcia Herrera",
    rol: "becario",
    email: "ana.garcia@instituto.edu",
    username: "ana",
    becarioId: "3",
  },
  {
    id: "u8",
    nombre: "Luis",
    apellido: "Hernandez Pech",
    rol: "becario",
    email: "luis.hernandez@colegio.edu",
    username: "luis",
    becarioId: "4",
  },
  {
    id: "u9",
    nombre: "Sofia",
    apellido: "Chan Tun",
    rol: "becario",
    email: "sofia.chan@instituto.edu",
    username: "sofia",
    becarioId: "5",
  },
  {
    id: "u10",
    nombre: "Diego",
    apellido: "Ramirez Ku",
    rol: "becario",
    email: "diego.ramirez@instituto.edu",
    username: "diego",
    becarioId: "6",
  },
  {
    id: "u11",
    nombre: "Valeria",
    apellido: "Poot May",
    rol: "becario",
    email: "valeria.poot@escuela.edu",
    username: "valeria",
    becarioId: "7",
  },
  {
    id: "u12",
    nombre: "Jorge",
    apellido: "Canul Balam",
    rol: "becario",
    email: "jorge.canul@escuela.edu",
    username: "jorge",
    becarioId: "8",
  },
];

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
    nivel: "diversificado",
    grado: "3ro Basico",

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
    nivel: "diversificado",
    grado: "2do Basico",

    estado: "activo",
    presupuestoMensual: 800,
    fechaInicio: "2025-03-01",
  },
];

// ── Gastos ──────────────────────────────────────────────────

export const gastos: Gasto[] = [
  {
    id: "g1",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    concepto: "Almuerzo en la universidad",
    categoria: "alimentacion",
    monto: 150,
    fecha: "2026-02-20",
    mes: "2026-02",
  },
  {
    id: "g2",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    concepto: "Pasaje de bus mensual",
    categoria: "transporte",
    monto: 300,
    fecha: "2026-02-18",
    mes: "2026-02",
  },
  {
    id: "g3",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    concepto: "Libros de programacion",
    categoria: "material_educativo",
    monto: 450,
    fecha: "2026-02-10",
    mes: "2026-02",
  },
  {
    id: "g4",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    concepto: "Cuota de internet",
    categoria: "tecnologia",
    monto: 200,
    fecha: "2026-02-05",
    mes: "2026-02",
  },
  {
    id: "g5",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    concepto: "Comida mes anterior",
    categoria: "alimentacion",
    monto: 400,
    fecha: "2026-01-15",
    mes: "2026-01",
  },
  {
    id: "g6",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    concepto: "Transporte enero",
    categoria: "transporte",
    monto: 280,
    fecha: "2026-01-10",
    mes: "2026-01",
  },
  {
    id: "g7",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    concepto: "Utiles diciembre",
    categoria: "material_educativo",
    monto: 350,
    fecha: "2025-12-12",
    mes: "2025-12",
  },
  {
    id: "g8",
    becarioId: "2",
    becarioNombre: "Carlos Martinez",
    concepto: "Instrumental medico",
    categoria: "material_educativo",
    monto: 800,
    fecha: "2026-02-22",
    mes: "2026-02",
  },
  {
    id: "g9",
    becarioId: "2",
    becarioNombre: "Carlos Martinez",
    concepto: "Alimentacion febrero",
    categoria: "alimentacion",
    monto: 600,
    fecha: "2026-02-19",
    mes: "2026-02",
  },
  {
    id: "g10",
    becarioId: "2",
    becarioNombre: "Carlos Martinez",
    concepto: "Consulta medica",
    categoria: "salud",
    monto: 250,
    fecha: "2026-02-15",
    mes: "2026-02",
  },
  {
    id: "g11",
    becarioId: "3",
    becarioNombre: "Ana Garcia",
    concepto: "Codigos y leyes",
    categoria: "material_educativo",
    monto: 350,
    fecha: "2026-02-21",
    mes: "2026-02",
  },
  {
    id: "g12",
    becarioId: "3",
    becarioNombre: "Ana Garcia",
    concepto: "Renta habitacion",
    categoria: "vivienda",
    monto: 500,
    fecha: "2026-02-01",
    mes: "2026-02",
  },
  {
    id: "g13",
    becarioId: "4",
    becarioNombre: "Luis Hernandez",
    concepto: "Materiales de dibujo tecnico",
    categoria: "material_educativo",
    monto: 200,
    fecha: "2026-02-23",
    mes: "2026-02",
  },
  {
    id: "g14",
    becarioId: "4",
    becarioNombre: "Luis Hernandez",
    concepto: "Almuerzo en colegio",
    categoria: "alimentacion",
    monto: 180,
    fecha: "2026-02-15",
    mes: "2026-02",
  },
  {
    id: "g15",
    becarioId: "6",
    becarioNombre: "Diego Ramirez",
    concepto: "Comidas durante practicas",
    categoria: "alimentacion",
    monto: 400,
    fecha: "2026-02-24",
    mes: "2026-02",
  },
  {
    id: "g16",
    becarioId: "6",
    becarioNombre: "Diego Ramirez",
    concepto: "Transporte a obra",
    categoria: "transporte",
    monto: 250,
    fecha: "2026-02-12",
    mes: "2026-02",
  },
  {
    id: "g17",
    becarioId: "7",
    becarioNombre: "Valeria Poot",
    concepto: "Utiles escolares",
    categoria: "material_educativo",
    monto: 150,
    fecha: "2026-02-08",
    mes: "2026-02",
  },
  {
    id: "g18",
    becarioId: "7",
    becarioNombre: "Valeria Poot",
    concepto: "Pasaje de bus",
    categoria: "transporte",
    monto: 100,
    fecha: "2026-02-10",
    mes: "2026-02",
  },
  {
    id: "g19",
    becarioId: "8",
    becarioNombre: "Jorge Canul",
    concepto: "Cuadernos y lapices",
    categoria: "material_educativo",
    monto: 120,
    fecha: "2026-02-17",
    mes: "2026-02",
  },
  {
    id: "g20",
    becarioId: "8",
    becarioNombre: "Jorge Canul",
    concepto: "Refaccion escolar",
    categoria: "alimentacion",
    monto: 80,
    fecha: "2026-02-20",
    mes: "2026-02",
  },
  // ── B1: Maria Lopez — Ene-Nov 2025 ──
  { id: "g21", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Alimentacion en campus enero", categoria: "alimentacion", monto: 500, fecha: "2025-01-15", mes: "2025-01" },
  { id: "g22", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje de bus enero", categoria: "transporte", monto: 300, fecha: "2025-01-10", mes: "2025-01" },
  { id: "g23", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Libros de ingenieria", categoria: "material_educativo", monto: 400, fecha: "2025-01-05", mes: "2025-01" },
  { id: "g24", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Almuerzo universitario febrero", categoria: "alimentacion", monto: 450, fecha: "2025-02-15", mes: "2025-02" },
  { id: "g25", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje de bus febrero", categoria: "transporte", monto: 280, fecha: "2025-02-10", mes: "2025-02" },
  { id: "g26", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Material de laboratorio", categoria: "material_educativo", monto: 350, fecha: "2025-02-05", mes: "2025-02" },
  { id: "g27", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Comidas en campus marzo", categoria: "alimentacion", monto: 550, fecha: "2025-03-15", mes: "2025-03" },
  { id: "g28", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte marzo", categoria: "transporte", monto: 300, fecha: "2025-03-10", mes: "2025-03" },
  { id: "g29", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Consulta medica general", categoria: "salud", monto: 200, fecha: "2025-03-20", mes: "2025-03" },
  { id: "g30", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Alimentacion abril", categoria: "alimentacion", monto: 600, fecha: "2025-04-15", mes: "2025-04" },
  { id: "g31", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje mensual abril", categoria: "transporte", monto: 320, fecha: "2025-04-10", mes: "2025-04" },
  { id: "g32", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Software y licencias", categoria: "material_educativo", monto: 500, fecha: "2025-04-05", mes: "2025-04" },
  { id: "g33", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Comidas mayo", categoria: "alimentacion", monto: 450, fecha: "2025-05-15", mes: "2025-05" },
  { id: "g34", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte mayo", categoria: "transporte", monto: 280, fecha: "2025-05-10", mes: "2025-05" },
  { id: "g35", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Cuota de internet mayo", categoria: "tecnologia", monto: 250, fecha: "2025-05-08", mes: "2025-05" },
  { id: "g36", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Alimentacion junio", categoria: "alimentacion", monto: 700, fecha: "2025-06-15", mes: "2025-06" },
  { id: "g37", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje junio", categoria: "transporte", monto: 350, fecha: "2025-06-10", mes: "2025-06" },
  { id: "g38", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Libros de estructuras de datos", categoria: "material_educativo", monto: 600, fecha: "2025-06-05", mes: "2025-06" },
  { id: "g39", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Almuerzo julio", categoria: "alimentacion", monto: 500, fecha: "2025-07-15", mes: "2025-07" },
  { id: "g40", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte julio", categoria: "transporte", monto: 300, fecha: "2025-07-10", mes: "2025-07" },
  { id: "g41", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Medicamentos", categoria: "salud", monto: 180, fecha: "2025-07-20", mes: "2025-07" },
  { id: "g42", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Comidas agosto", categoria: "alimentacion", monto: 550, fecha: "2025-08-15", mes: "2025-08" },
  { id: "g43", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje agosto", categoria: "transporte", monto: 280, fecha: "2025-08-10", mes: "2025-08" },
  { id: "g44", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Materiales de proyecto final", categoria: "material_educativo", monto: 450, fecha: "2025-08-05", mes: "2025-08" },
  { id: "g45", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Alimentacion septiembre", categoria: "alimentacion", monto: 600, fecha: "2025-09-15", mes: "2025-09" },
  { id: "g46", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte septiembre", categoria: "transporte", monto: 320, fecha: "2025-09-10", mes: "2025-09" },
  { id: "g47", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Reparacion de laptop", categoria: "tecnologia", monto: 300, fecha: "2025-09-08", mes: "2025-09" },
  { id: "g48", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Comidas octubre", categoria: "alimentacion", monto: 700, fecha: "2025-10-15", mes: "2025-10" },
  { id: "g49", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje octubre", categoria: "transporte", monto: 350, fecha: "2025-10-10", mes: "2025-10" },
  { id: "g50", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Libros y utiles octubre", categoria: "material_educativo", monto: 700, fecha: "2025-10-05", mes: "2025-10" },
  { id: "g51", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Alimentacion noviembre", categoria: "alimentacion", monto: 500, fecha: "2025-11-15", mes: "2025-11" },
  { id: "g52", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte noviembre", categoria: "transporte", monto: 300, fecha: "2025-11-10", mes: "2025-11" },
  { id: "g53", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Copias y utiles", categoria: "material_educativo", monto: 400, fecha: "2025-11-05", mes: "2025-11" },
  // ── B1: Maria Lopez — Jan 2026 (completa el mes) ──
  { id: "g342", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Libros del 6to semestre", categoria: "material_educativo", monto: 380, fecha: "2026-01-05", mes: "2026-01" },
  // ── B1: Maria Lopez — Mar-May 2026 ──
  { id: "g54", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Comidas en campus marzo 2026", categoria: "alimentacion", monto: 550, fecha: "2026-03-15", mes: "2026-03" },
  { id: "g55", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte marzo 2026", categoria: "transporte", monto: 280, fecha: "2026-03-10", mes: "2026-03" },
  { id: "g56", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Cuota de internet marzo", categoria: "tecnologia", monto: 220, fecha: "2026-03-08", mes: "2026-03" },
  { id: "g57", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Alimentacion abril 2026", categoria: "alimentacion", monto: 600, fecha: "2026-04-15", mes: "2026-04" },
  { id: "g58", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Pasaje de bus abril", categoria: "transporte", monto: 300, fecha: "2026-04-10", mes: "2026-04" },
  { id: "g59", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Libros del ultimo semestre", categoria: "material_educativo", monto: 500, fecha: "2026-04-05", mes: "2026-04" },
  { id: "g60", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Comidas mayo 2026", categoria: "alimentacion", monto: 650, fecha: "2026-05-15", mes: "2026-05" },
  { id: "g61", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Transporte mayo", categoria: "transporte", monto: 350, fecha: "2026-05-10", mes: "2026-05" },
  { id: "g62", becarioId: "1", becarioNombre: "Maria Lopez", concepto: "Revision medica semestral", categoria: "salud", monto: 250, fecha: "2026-05-20", mes: "2026-05" },
  // ── B2: Carlos Martinez — Ene 2025-Ene 2026, Mar-May 2026 ──
  { id: "g63", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion en hospital enero", categoria: "alimentacion", monto: 700, fecha: "2025-01-15", mes: "2025-01" },
  { id: "g64", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Atlas de anatomia", categoria: "material_educativo", monto: 600, fecha: "2025-01-05", mes: "2025-01" },
  { id: "g65", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte al hospital", categoria: "transporte", monto: 300, fecha: "2025-01-10", mes: "2025-01" },
  { id: "g66", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas en practicas febrero", categoria: "alimentacion", monto: 650, fecha: "2025-02-15", mes: "2025-02" },
  { id: "g67", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Material de laboratorio clinico", categoria: "material_educativo", monto: 550, fecha: "2025-02-05", mes: "2025-02" },
  { id: "g68", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Vacuna hepatitis B", categoria: "salud", monto: 280, fecha: "2025-02-20", mes: "2025-02" },
  { id: "g69", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion durante rotaciones", categoria: "alimentacion", monto: 800, fecha: "2025-03-15", mes: "2025-03" },
  { id: "g70", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Libros de patologia", categoria: "material_educativo", monto: 700, fecha: "2025-03-05", mes: "2025-03" },
  { id: "g71", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte a hospital marzo", categoria: "transporte", monto: 350, fecha: "2025-03-10", mes: "2025-03" },
  { id: "g72", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas abril", categoria: "alimentacion", monto: 600, fecha: "2025-04-15", mes: "2025-04" },
  { id: "g73", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Estetoscopio y accesorios", categoria: "material_educativo", monto: 500, fecha: "2025-04-05", mes: "2025-04" },
  { id: "g74", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Consulta con especialista", categoria: "salud", monto: 200, fecha: "2025-04-20", mes: "2025-04" },
  { id: "g75", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion mayo", categoria: "alimentacion", monto: 750, fecha: "2025-05-15", mes: "2025-05" },
  { id: "g76", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Libros de farmacologia", categoria: "material_educativo", monto: 650, fecha: "2025-05-05", mes: "2025-05" },
  { id: "g77", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte mayo", categoria: "transporte", monto: 300, fecha: "2025-05-10", mes: "2025-05" },
  { id: "g78", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas en practicas junio", categoria: "alimentacion", monto: 900, fecha: "2025-06-15", mes: "2025-06" },
  { id: "g79", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Material clinico 2do semestre", categoria: "material_educativo", monto: 800, fecha: "2025-06-05", mes: "2025-06" },
  { id: "g80", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Examen medico rutinario", categoria: "salud", monto: 350, fecha: "2025-06-20", mes: "2025-06" },
  { id: "g81", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion julio", categoria: "alimentacion", monto: 700, fecha: "2025-07-15", mes: "2025-07" },
  { id: "g82", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Libros de cirugia basica", categoria: "material_educativo", monto: 600, fecha: "2025-07-05", mes: "2025-07" },
  { id: "g83", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte julio", categoria: "transporte", monto: 280, fecha: "2025-07-10", mes: "2025-07" },
  { id: "g84", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas en rotaciones agosto", categoria: "alimentacion", monto: 800, fecha: "2025-08-15", mes: "2025-08" },
  { id: "g85", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Bata y materiales clinicos", categoria: "material_educativo", monto: 700, fecha: "2025-08-05", mes: "2025-08" },
  { id: "g86", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Analisis de laboratorio personal", categoria: "salud", monto: 400, fecha: "2025-08-20", mes: "2025-08" },
  { id: "g87", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion septiembre", categoria: "alimentacion", monto: 600, fecha: "2025-09-15", mes: "2025-09" },
  { id: "g88", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Material de obstetricia", categoria: "material_educativo", monto: 500, fecha: "2025-09-05", mes: "2025-09" },
  { id: "g89", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte septiembre", categoria: "transporte", monto: 300, fecha: "2025-09-10", mes: "2025-09" },
  { id: "g90", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas en practicas hospitalarias", categoria: "alimentacion", monto: 850, fecha: "2025-10-15", mes: "2025-10" },
  { id: "g91", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Libros de pediatria", categoria: "material_educativo", monto: 750, fecha: "2025-10-05", mes: "2025-10" },
  { id: "g92", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Vacunas requeridas por rotacion", categoria: "salud", monto: 300, fecha: "2025-10-20", mes: "2025-10" },
  { id: "g93", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion noviembre", categoria: "alimentacion", monto: 700, fecha: "2025-11-15", mes: "2025-11" },
  { id: "g94", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Material de emergenciologia", categoria: "material_educativo", monto: 650, fecha: "2025-11-05", mes: "2025-11" },
  { id: "g95", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte noviembre", categoria: "transporte", monto: 350, fecha: "2025-11-10", mes: "2025-11" },
  { id: "g96", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas diciembre", categoria: "alimentacion", monto: 900, fecha: "2025-12-15", mes: "2025-12" },
  { id: "g97", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Libros y atlas para 2026", categoria: "material_educativo", monto: 800, fecha: "2025-12-05", mes: "2025-12" },
  { id: "g98", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Examen fisico semestral", categoria: "salud", monto: 380, fecha: "2025-12-20", mes: "2025-12" },
  { id: "g99", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion enero 2026", categoria: "alimentacion", monto: 750, fecha: "2026-01-15", mes: "2026-01" },
  { id: "g100", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Material del 8vo semestre", categoria: "material_educativo", monto: 700, fecha: "2026-01-05", mes: "2026-01" },
  { id: "g101", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte enero 2026", categoria: "transporte", monto: 300, fecha: "2026-01-10", mes: "2026-01" },
  { id: "g102", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas marzo 2026", categoria: "alimentacion", monto: 800, fecha: "2026-03-15", mes: "2026-03" },
  { id: "g103", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Instrumental medico nuevo", categoria: "material_educativo", monto: 700, fecha: "2026-03-05", mes: "2026-03" },
  { id: "g104", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Consulta medica especializada", categoria: "salud", monto: 350, fecha: "2026-03-20", mes: "2026-03" },
  { id: "g105", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Alimentacion abril 2026", categoria: "alimentacion", monto: 650, fecha: "2026-04-15", mes: "2026-04" },
  { id: "g106", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Libros del 2do semestre 2026", categoria: "material_educativo", monto: 600, fecha: "2026-04-05", mes: "2026-04" },
  { id: "g107", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Transporte abril", categoria: "transporte", monto: 280, fecha: "2026-04-10", mes: "2026-04" },
  { id: "g108", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Comidas mayo 2026", categoria: "alimentacion", monto: 700, fecha: "2026-05-15", mes: "2026-05" },
  { id: "g109", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Material de fin de ciclo", categoria: "material_educativo", monto: 650, fecha: "2026-05-05", mes: "2026-05" },
  { id: "g110", becarioId: "2", becarioNombre: "Carlos Martinez", concepto: "Examen medico mayo", categoria: "salud", monto: 300, fecha: "2026-05-20", mes: "2026-05" },
  // ── B3: Ana Garcia — Feb 2025-Ene 2026, Mar-May 2026 ──
  { id: "g111", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion febrero", categoria: "vivienda", monto: 500, fecha: "2025-02-01", mes: "2025-02" },
  { id: "g112", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Codigos y leyes", categoria: "material_educativo", monto: 350, fecha: "2025-02-05", mes: "2025-02" },
  { id: "g113", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion febrero", categoria: "alimentacion", monto: 280, fecha: "2025-02-15", mes: "2025-02" },
  { id: "g114", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion marzo", categoria: "vivienda", monto: 500, fecha: "2025-03-01", mes: "2025-03" },
  { id: "g115", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Libros de procesal civil", categoria: "material_educativo", monto: 300, fecha: "2025-03-05", mes: "2025-03" },
  { id: "g116", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Transporte al juzgado", categoria: "transporte", monto: 200, fecha: "2025-03-10", mes: "2025-03" },
  { id: "g117", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion abril", categoria: "vivienda", monto: 500, fecha: "2025-04-01", mes: "2025-04" },
  { id: "g118", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Recopilacion de leyes", categoria: "material_educativo", monto: 280, fecha: "2025-04-05", mes: "2025-04" },
  { id: "g119", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion abril", categoria: "alimentacion", monto: 250, fecha: "2025-04-15", mes: "2025-04" },
  { id: "g120", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion mayo", categoria: "vivienda", monto: 500, fecha: "2025-05-01", mes: "2025-05" },
  { id: "g121", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Libros de derecho constitucional", categoria: "material_educativo", monto: 350, fecha: "2025-05-05", mes: "2025-05" },
  { id: "g122", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Comidas mayo", categoria: "alimentacion", monto: 300, fecha: "2025-05-15", mes: "2025-05" },
  { id: "g123", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion junio", categoria: "vivienda", monto: 500, fecha: "2025-06-01", mes: "2025-06" },
  { id: "g124", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Material de practicas juridicas", categoria: "material_educativo", monto: 400, fecha: "2025-06-05", mes: "2025-06" },
  { id: "g125", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Transporte junio", categoria: "transporte", monto: 220, fecha: "2025-06-10", mes: "2025-06" },
  { id: "g126", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion julio", categoria: "vivienda", monto: 500, fecha: "2025-07-01", mes: "2025-07" },
  { id: "g127", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion julio", categoria: "alimentacion", monto: 380, fecha: "2025-07-15", mes: "2025-07" },
  { id: "g128", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Transporte julio", categoria: "transporte", monto: 200, fecha: "2025-07-10", mes: "2025-07" },
  { id: "g129", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion agosto", categoria: "vivienda", monto: 500, fecha: "2025-08-01", mes: "2025-08" },
  { id: "g130", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Libros de derecho mercantil", categoria: "material_educativo", monto: 350, fecha: "2025-08-05", mes: "2025-08" },
  { id: "g131", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion agosto", categoria: "alimentacion", monto: 300, fecha: "2025-08-15", mes: "2025-08" },
  { id: "g132", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion septiembre", categoria: "vivienda", monto: 500, fecha: "2025-09-01", mes: "2025-09" },
  { id: "g133", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Material de procesal penal", categoria: "material_educativo", monto: 300, fecha: "2025-09-05", mes: "2025-09" },
  { id: "g134", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Transporte septiembre", categoria: "transporte", monto: 180, fecha: "2025-09-10", mes: "2025-09" },
  { id: "g135", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion octubre", categoria: "vivienda", monto: 500, fecha: "2025-10-01", mes: "2025-10" },
  { id: "g136", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Libros de notariado", categoria: "material_educativo", monto: 400, fecha: "2025-10-05", mes: "2025-10" },
  { id: "g137", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion octubre", categoria: "alimentacion", monto: 350, fecha: "2025-10-15", mes: "2025-10" },
  { id: "g138", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion noviembre", categoria: "vivienda", monto: 500, fecha: "2025-11-01", mes: "2025-11" },
  { id: "g139", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Comidas noviembre", categoria: "alimentacion", monto: 350, fecha: "2025-11-15", mes: "2025-11" },
  { id: "g140", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Transporte noviembre", categoria: "transporte", monto: 200, fecha: "2025-11-10", mes: "2025-11" },
  { id: "g141", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion diciembre", categoria: "vivienda", monto: 500, fecha: "2025-12-01", mes: "2025-12" },
  { id: "g142", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Libros para nuevo semestre", categoria: "material_educativo", monto: 380, fecha: "2025-12-05", mes: "2025-12" },
  { id: "g143", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion diciembre", categoria: "alimentacion", monto: 320, fecha: "2025-12-15", mes: "2025-12" },
  { id: "g144", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion enero 2026", categoria: "vivienda", monto: 500, fecha: "2026-01-01", mes: "2026-01" },
  { id: "g145", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Libros 4to semestre", categoria: "material_educativo", monto: 350, fecha: "2026-01-05", mes: "2026-01" },
  { id: "g146", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Transporte enero 2026", categoria: "transporte", monto: 200, fecha: "2026-01-10", mes: "2026-01" },
  { id: "g147", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion marzo 2026", categoria: "vivienda", monto: 500, fecha: "2026-03-01", mes: "2026-03" },
  { id: "g148", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Material de derecho laboral", categoria: "material_educativo", monto: 400, fecha: "2026-03-05", mes: "2026-03" },
  { id: "g149", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion marzo", categoria: "alimentacion", monto: 350, fecha: "2026-03-15", mes: "2026-03" },
  { id: "g150", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion abril 2026", categoria: "vivienda", monto: 500, fecha: "2026-04-01", mes: "2026-04" },
  { id: "g151", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Copias y materiales abril", categoria: "material_educativo", monto: 280, fecha: "2026-04-05", mes: "2026-04" },
  { id: "g152", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion abril", categoria: "alimentacion", monto: 250, fecha: "2026-04-15", mes: "2026-04" },
  { id: "g153", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Renta de habitacion mayo 2026", categoria: "vivienda", monto: 500, fecha: "2026-05-01", mes: "2026-05" },
  { id: "g154", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Comidas mayo", categoria: "alimentacion", monto: 380, fecha: "2026-05-15", mes: "2026-05" },
  { id: "g155", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Transporte mayo", categoria: "transporte", monto: 220, fecha: "2026-05-10", mes: "2026-05" },
  // ── B4: Luis Hernandez — Ene 2025-Ene 2026, Mar-May 2026 ──
  { id: "g156", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Utiles escolares enero", categoria: "material_educativo", monto: 250, fecha: "2025-01-05", mes: "2025-01" },
  { id: "g157", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion enero", categoria: "alimentacion", monto: 220, fecha: "2025-01-15", mes: "2025-01" },
  { id: "g158", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje enero", categoria: "transporte", monto: 150, fecha: "2025-01-10", mes: "2025-01" },
  { id: "g159", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Cuadernos y lapices febrero", categoria: "material_educativo", monto: 200, fecha: "2025-02-05", mes: "2025-02" },
  { id: "g160", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Almuerzo escolar", categoria: "alimentacion", monto: 180, fecha: "2025-02-15", mes: "2025-02" },
  { id: "g161", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje febrero", categoria: "transporte", monto: 120, fecha: "2025-02-10", mes: "2025-02" },
  { id: "g162", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Libro de matematicas", categoria: "material_educativo", monto: 280, fecha: "2025-03-05", mes: "2025-03" },
  { id: "g163", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Refaccion mensual", categoria: "alimentacion", monto: 220, fecha: "2025-03-15", mes: "2025-03" },
  { id: "g164", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte marzo", categoria: "transporte", monto: 160, fecha: "2025-03-10", mes: "2025-03" },
  { id: "g165", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Materiales de ciencias", categoria: "material_educativo", monto: 300, fecha: "2025-04-05", mes: "2025-04" },
  { id: "g166", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion abril", categoria: "alimentacion", monto: 250, fecha: "2025-04-15", mes: "2025-04" },
  { id: "g167", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje abril", categoria: "transporte", monto: 150, fecha: "2025-04-10", mes: "2025-04" },
  { id: "g168", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Libro de fisica", categoria: "material_educativo", monto: 350, fecha: "2025-05-05", mes: "2025-05" },
  { id: "g169", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Comidas mayo", categoria: "alimentacion", monto: 280, fecha: "2025-05-15", mes: "2025-05" },
  { id: "g170", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte mayo", categoria: "transporte", monto: 180, fecha: "2025-05-10", mes: "2025-05" },
  { id: "g171", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Material de laboratorio", categoria: "material_educativo", monto: 400, fecha: "2025-06-05", mes: "2025-06" },
  { id: "g172", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion junio", categoria: "alimentacion", monto: 300, fecha: "2025-06-15", mes: "2025-06" },
  { id: "g173", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje junio", categoria: "transporte", monto: 200, fecha: "2025-06-10", mes: "2025-06" },
  { id: "g174", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Utiles 2do semestre", categoria: "material_educativo", monto: 250, fecha: "2025-07-05", mes: "2025-07" },
  { id: "g175", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Refaccion julio", categoria: "alimentacion", monto: 220, fecha: "2025-07-15", mes: "2025-07" },
  { id: "g176", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte julio", categoria: "transporte", monto: 150, fecha: "2025-07-10", mes: "2025-07" },
  { id: "g177", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Materiales de dibujo tecnico", categoria: "material_educativo", monto: 280, fecha: "2025-08-05", mes: "2025-08" },
  { id: "g178", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion agosto", categoria: "alimentacion", monto: 230, fecha: "2025-08-15", mes: "2025-08" },
  { id: "g179", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje agosto", categoria: "transporte", monto: 160, fecha: "2025-08-10", mes: "2025-08" },
  { id: "g180", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Libros de quimica", categoria: "material_educativo", monto: 350, fecha: "2025-09-05", mes: "2025-09" },
  { id: "g181", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Comidas septiembre", categoria: "alimentacion", monto: 270, fecha: "2025-09-15", mes: "2025-09" },
  { id: "g182", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte septiembre", categoria: "transporte", monto: 180, fecha: "2025-09-10", mes: "2025-09" },
  { id: "g183", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Material de proyecto bachillerato", categoria: "material_educativo", monto: 400, fecha: "2025-10-05", mes: "2025-10" },
  { id: "g184", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion octubre", categoria: "alimentacion", monto: 300, fecha: "2025-10-15", mes: "2025-10" },
  { id: "g185", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje octubre", categoria: "transporte", monto: 180, fecha: "2025-10-10", mes: "2025-10" },
  { id: "g186", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Utiles noviembre", categoria: "material_educativo", monto: 300, fecha: "2025-11-05", mes: "2025-11" },
  { id: "g187", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Comidas noviembre", categoria: "alimentacion", monto: 250, fecha: "2025-11-15", mes: "2025-11" },
  { id: "g188", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte noviembre", categoria: "transporte", monto: 160, fecha: "2025-11-10", mes: "2025-11" },
  { id: "g189", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Cuadernos nuevos", categoria: "material_educativo", monto: 250, fecha: "2025-12-05", mes: "2025-12" },
  { id: "g190", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion diciembre", categoria: "alimentacion", monto: 200, fecha: "2025-12-15", mes: "2025-12" },
  { id: "g191", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje diciembre", categoria: "transporte", monto: 130, fecha: "2025-12-10", mes: "2025-12" },
  { id: "g192", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Material escolar enero 2026", categoria: "material_educativo", monto: 320, fecha: "2026-01-05", mes: "2026-01" },
  { id: "g193", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion enero 2026", categoria: "alimentacion", monto: 260, fecha: "2026-01-15", mes: "2026-01" },
  { id: "g194", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte enero 2026", categoria: "transporte", monto: 170, fecha: "2026-01-10", mes: "2026-01" },
  { id: "g195", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Libros del 5to bachillerato", categoria: "material_educativo", monto: 350, fecha: "2026-03-05", mes: "2026-03" },
  { id: "g196", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Comidas marzo", categoria: "alimentacion", monto: 280, fecha: "2026-03-15", mes: "2026-03" },
  { id: "g197", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte marzo", categoria: "transporte", monto: 180, fecha: "2026-03-10", mes: "2026-03" },
  { id: "g198", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Material de ciencias naturales", categoria: "material_educativo", monto: 300, fecha: "2026-04-05", mes: "2026-04" },
  { id: "g199", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Alimentacion abril 2026", categoria: "alimentacion", monto: 250, fecha: "2026-04-15", mes: "2026-04" },
  { id: "g200", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje abril", categoria: "transporte", monto: 160, fecha: "2026-04-10", mes: "2026-04" },
  { id: "g201", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Utiles mayo", categoria: "material_educativo", monto: 350, fecha: "2026-05-05", mes: "2026-05" },
  { id: "g202", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Comidas mayo", categoria: "alimentacion", monto: 290, fecha: "2026-05-15", mes: "2026-05" },
  { id: "g203", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Transporte mayo", categoria: "transporte", monto: 180, fecha: "2026-05-10", mes: "2026-05" },
  // ── B6: Diego Ramirez — Ene 2025-Ene 2026, Mar-May 2026 ──
  { id: "g204", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion enero", categoria: "alimentacion", monto: 450, fecha: "2025-01-15", mes: "2025-01" },
  { id: "g205", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte a obras enero", categoria: "transporte", monto: 300, fecha: "2025-01-10", mes: "2025-01" },
  { id: "g206", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Libros de resistencia de materiales", categoria: "material_educativo", monto: 380, fecha: "2025-01-05", mes: "2025-01" },
  { id: "g207", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas febrero", categoria: "alimentacion", monto: 500, fecha: "2025-02-15", mes: "2025-02" },
  { id: "g208", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Pasaje febrero", categoria: "transporte", monto: 280, fecha: "2025-02-10", mes: "2025-02" },
  { id: "g209", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Material de topografia", categoria: "material_educativo", monto: 400, fecha: "2025-02-05", mes: "2025-02" },
  { id: "g210", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion en practicas", categoria: "alimentacion", monto: 550, fecha: "2025-03-15", mes: "2025-03" },
  { id: "g211", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte a sitio de obra", categoria: "transporte", monto: 320, fecha: "2025-03-10", mes: "2025-03" },
  { id: "g212", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Instrumentos de medicion", categoria: "material_educativo", monto: 450, fecha: "2025-03-05", mes: "2025-03" },
  { id: "g213", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas durante rotacion", categoria: "alimentacion", monto: 600, fecha: "2025-04-15", mes: "2025-04" },
  { id: "g214", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte abril", categoria: "transporte", monto: 350, fecha: "2025-04-10", mes: "2025-04" },
  { id: "g215", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Libros de hormigon armado", categoria: "material_educativo", monto: 500, fecha: "2025-04-05", mes: "2025-04" },
  { id: "g216", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion mayo", categoria: "alimentacion", monto: 450, fecha: "2025-05-15", mes: "2025-05" },
  { id: "g217", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Pasaje mayo", categoria: "transporte", monto: 280, fecha: "2025-05-10", mes: "2025-05" },
  { id: "g218", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Material de dibujo tecnico", categoria: "material_educativo", monto: 380, fecha: "2025-05-05", mes: "2025-05" },
  { id: "g219", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas en practicas junio", categoria: "alimentacion", monto: 700, fecha: "2025-06-15", mes: "2025-06" },
  { id: "g220", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte a obras junio", categoria: "transporte", monto: 380, fecha: "2025-06-10", mes: "2025-06" },
  { id: "g221", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Software de CAD", categoria: "material_educativo", monto: 600, fecha: "2025-06-05", mes: "2025-06" },
  { id: "g222", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion julio", categoria: "alimentacion", monto: 500, fecha: "2025-07-15", mes: "2025-07" },
  { id: "g223", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte julio", categoria: "transporte", monto: 300, fecha: "2025-07-10", mes: "2025-07" },
  { id: "g224", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Libros de instalaciones", categoria: "material_educativo", monto: 400, fecha: "2025-07-05", mes: "2025-07" },
  { id: "g225", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas agosto", categoria: "alimentacion", monto: 550, fecha: "2025-08-15", mes: "2025-08" },
  { id: "g226", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte a obra agosto", categoria: "transporte", monto: 320, fecha: "2025-08-10", mes: "2025-08" },
  { id: "g227", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Material de suelos", categoria: "material_educativo", monto: 450, fecha: "2025-08-05", mes: "2025-08" },
  { id: "g228", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion septiembre", categoria: "alimentacion", monto: 600, fecha: "2025-09-15", mes: "2025-09" },
  { id: "g229", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte septiembre", categoria: "transporte", monto: 350, fecha: "2025-09-10", mes: "2025-09" },
  { id: "g230", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Libros de hidraulica", categoria: "material_educativo", monto: 500, fecha: "2025-09-05", mes: "2025-09" },
  { id: "g231", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas en practicas octubre", categoria: "alimentacion", monto: 700, fecha: "2025-10-15", mes: "2025-10" },
  { id: "g232", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte octubre", categoria: "transporte", monto: 380, fecha: "2025-10-10", mes: "2025-10" },
  { id: "g233", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Material final de semestre", categoria: "material_educativo", monto: 600, fecha: "2025-10-05", mes: "2025-10" },
  { id: "g234", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion noviembre", categoria: "alimentacion", monto: 500, fecha: "2025-11-15", mes: "2025-11" },
  { id: "g235", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte noviembre", categoria: "transporte", monto: 300, fecha: "2025-11-10", mes: "2025-11" },
  { id: "g236", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Libros de pavimentos", categoria: "material_educativo", monto: 380, fecha: "2025-11-05", mes: "2025-11" },
  { id: "g237", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas diciembre", categoria: "alimentacion", monto: 600, fecha: "2025-12-15", mes: "2025-12" },
  { id: "g238", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte diciembre", categoria: "transporte", monto: 350, fecha: "2025-12-10", mes: "2025-12" },
  { id: "g239", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Material para tesis", categoria: "material_educativo", monto: 550, fecha: "2025-12-05", mes: "2025-12" },
  { id: "g240", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion enero 2026", categoria: "alimentacion", monto: 550, fecha: "2026-01-15", mes: "2026-01" },
  { id: "g241", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte enero 2026", categoria: "transporte", monto: 320, fecha: "2026-01-10", mes: "2026-01" },
  { id: "g242", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Libros del 7mo semestre", categoria: "material_educativo", monto: 480, fecha: "2026-01-05", mes: "2026-01" },
  { id: "g243", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas marzo 2026", categoria: "alimentacion", monto: 600, fecha: "2026-03-15", mes: "2026-03" },
  { id: "g244", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte a obras marzo", categoria: "transporte", monto: 350, fecha: "2026-03-10", mes: "2026-03" },
  { id: "g245", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Material de graduacion", categoria: "material_educativo", monto: 500, fecha: "2026-03-05", mes: "2026-03" },
  { id: "g246", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Alimentacion abril 2026", categoria: "alimentacion", monto: 650, fecha: "2026-04-15", mes: "2026-04" },
  { id: "g247", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte abril", categoria: "transporte", monto: 380, fecha: "2026-04-10", mes: "2026-04" },
  { id: "g248", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Materiales de tesis", categoria: "material_educativo", monto: 550, fecha: "2026-04-05", mes: "2026-04" },
  { id: "g249", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Comidas mayo 2026", categoria: "alimentacion", monto: 500, fecha: "2026-05-15", mes: "2026-05" },
  { id: "g250", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Transporte mayo", categoria: "transporte", monto: 300, fecha: "2026-05-10", mes: "2026-05" },
  { id: "g251", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Ultima revision de tesis", categoria: "material_educativo", monto: 400, fecha: "2026-05-05", mes: "2026-05" },
  // ── B7: Valeria Poot — Ene 2025-Ene 2026, Mar-May 2026 ──
  { id: "g252", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Cuadernos y lapices enero", categoria: "material_educativo", monto: 180, fecha: "2025-01-05", mes: "2025-01" },
  { id: "g253", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje enero", categoria: "transporte", monto: 120, fecha: "2025-01-10", mes: "2025-01" },
  { id: "g254", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Refaccion enero", categoria: "alimentacion", monto: 120, fecha: "2025-01-15", mes: "2025-01" },
  { id: "g255", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Libro de comunicacion", categoria: "material_educativo", monto: 150, fecha: "2025-02-05", mes: "2025-02" },
  { id: "g256", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje febrero", categoria: "transporte", monto: 100, fecha: "2025-02-10", mes: "2025-02" },
  { id: "g257", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Almuerzo escolar", categoria: "alimentacion", monto: 100, fecha: "2025-02-15", mes: "2025-02" },
  { id: "g258", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Utiles de marzo", categoria: "material_educativo", monto: 200, fecha: "2025-03-05", mes: "2025-03" },
  { id: "g259", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje marzo", categoria: "transporte", monto: 120, fecha: "2025-03-10", mes: "2025-03" },
  { id: "g260", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Refaccion mensual", categoria: "alimentacion", monto: 130, fecha: "2025-03-15", mes: "2025-03" },
  { id: "g261", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Libro de matematicas", categoria: "material_educativo", monto: 220, fecha: "2025-04-05", mes: "2025-04" },
  { id: "g262", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Transporte abril", categoria: "transporte", monto: 130, fecha: "2025-04-10", mes: "2025-04" },
  { id: "g263", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion abril", categoria: "alimentacion", monto: 140, fecha: "2025-04-15", mes: "2025-04" },
  { id: "g264", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Material del semestre", categoria: "material_educativo", monto: 250, fecha: "2025-05-05", mes: "2025-05" },
  { id: "g265", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje mayo", categoria: "transporte", monto: 140, fecha: "2025-05-10", mes: "2025-05" },
  { id: "g266", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Comidas mayo", categoria: "alimentacion", monto: 150, fecha: "2025-05-15", mes: "2025-05" },
  { id: "g267", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Libros de ciencias naturales", categoria: "material_educativo", monto: 300, fecha: "2025-06-05", mes: "2025-06" },
  { id: "g268", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Transporte junio", categoria: "transporte", monto: 150, fecha: "2025-06-10", mes: "2025-06" },
  { id: "g269", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion junio", categoria: "alimentacion", monto: 160, fecha: "2025-06-15", mes: "2025-06" },
  { id: "g270", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Utiles escolares julio", categoria: "material_educativo", monto: 200, fecha: "2025-07-05", mes: "2025-07" },
  { id: "g271", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje julio", categoria: "transporte", monto: 120, fecha: "2025-07-10", mes: "2025-07" },
  { id: "g272", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Refaccion julio", categoria: "alimentacion", monto: 130, fecha: "2025-07-15", mes: "2025-07" },
  { id: "g273", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Material de laboratorio", categoria: "material_educativo", monto: 220, fecha: "2025-08-05", mes: "2025-08" },
  { id: "g274", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Transporte agosto", categoria: "transporte", monto: 130, fecha: "2025-08-10", mes: "2025-08" },
  { id: "g275", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion agosto", categoria: "alimentacion", monto: 140, fecha: "2025-08-15", mes: "2025-08" },
  { id: "g276", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Libros de historia", categoria: "material_educativo", monto: 250, fecha: "2025-09-05", mes: "2025-09" },
  { id: "g277", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje septiembre", categoria: "transporte", monto: 140, fecha: "2025-09-10", mes: "2025-09" },
  { id: "g278", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Comidas septiembre", categoria: "alimentacion", monto: 150, fecha: "2025-09-15", mes: "2025-09" },
  { id: "g279", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Material de proyecto", categoria: "material_educativo", monto: 280, fecha: "2025-10-05", mes: "2025-10" },
  { id: "g280", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Transporte octubre", categoria: "transporte", monto: 150, fecha: "2025-10-10", mes: "2025-10" },
  { id: "g281", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion octubre", categoria: "alimentacion", monto: 160, fecha: "2025-10-15", mes: "2025-10" },
  { id: "g282", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Utiles noviembre", categoria: "material_educativo", monto: 200, fecha: "2025-11-05", mes: "2025-11" },
  { id: "g283", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje noviembre", categoria: "transporte", monto: 120, fecha: "2025-11-10", mes: "2025-11" },
  { id: "g284", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Refaccion noviembre", categoria: "alimentacion", monto: 130, fecha: "2025-11-15", mes: "2025-11" },
  { id: "g285", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Cuadernos nuevos", categoria: "material_educativo", monto: 180, fecha: "2025-12-05", mes: "2025-12" },
  { id: "g286", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje diciembre", categoria: "transporte", monto: 110, fecha: "2025-12-10", mes: "2025-12" },
  { id: "g287", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion diciembre", categoria: "alimentacion", monto: 120, fecha: "2025-12-15", mes: "2025-12" },
  { id: "g288", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Utiles enero 2026", categoria: "material_educativo", monto: 220, fecha: "2026-01-05", mes: "2026-01" },
  { id: "g289", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje enero 2026", categoria: "transporte", monto: 130, fecha: "2026-01-10", mes: "2026-01" },
  { id: "g290", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion enero 2026", categoria: "alimentacion", monto: 140, fecha: "2026-01-15", mes: "2026-01" },
  { id: "g291", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Material de 3ro basico", categoria: "material_educativo", monto: 250, fecha: "2026-03-05", mes: "2026-03" },
  { id: "g292", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Transporte marzo", categoria: "transporte", monto: 140, fecha: "2026-03-10", mes: "2026-03" },
  { id: "g293", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Comidas marzo", categoria: "alimentacion", monto: 150, fecha: "2026-03-15", mes: "2026-03" },
  { id: "g294", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Libros nuevos", categoria: "material_educativo", monto: 300, fecha: "2026-04-05", mes: "2026-04" },
  { id: "g295", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Pasaje abril", categoria: "transporte", monto: 150, fecha: "2026-04-10", mes: "2026-04" },
  { id: "g296", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion abril", categoria: "alimentacion", monto: 160, fecha: "2026-04-15", mes: "2026-04" },
  { id: "g297", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Utiles mayo", categoria: "material_educativo", monto: 230, fecha: "2026-05-05", mes: "2026-05" },
  { id: "g298", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Transporte mayo", categoria: "transporte", monto: 130, fecha: "2026-05-10", mes: "2026-05" },
  { id: "g299", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Comidas mayo", categoria: "alimentacion", monto: 140, fecha: "2026-05-15", mes: "2026-05" },
  // ── B8: Jorge Canul — Mar 2025-Ene 2026, Mar-May 2026 ──
  { id: "g300", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Libros nuevos", categoria: "material_educativo", monto: 150, fecha: "2025-03-05", mes: "2025-03" },
  { id: "g301", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Refaccion escolar", categoria: "alimentacion", monto: 100, fecha: "2025-03-15", mes: "2025-03" },
  { id: "g302", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje marzo", categoria: "transporte", monto: 100, fecha: "2025-03-10", mes: "2025-03" },
  { id: "g303", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Cuadernos y lapices", categoria: "material_educativo", monto: 180, fecha: "2025-04-05", mes: "2025-04" },
  { id: "g304", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Comidas escolares", categoria: "alimentacion", monto: 120, fecha: "2025-04-15", mes: "2025-04" },
  { id: "g305", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje abril", categoria: "transporte", monto: 110, fecha: "2025-04-10", mes: "2025-04" },
  { id: "g306", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Material didactico", categoria: "material_educativo", monto: 200, fecha: "2025-05-05", mes: "2025-05" },
  { id: "g307", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Refaccion mayo", categoria: "alimentacion", monto: 130, fecha: "2025-05-15", mes: "2025-05" },
  { id: "g308", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Transporte mayo", categoria: "transporte", monto: 120, fecha: "2025-05-10", mes: "2025-05" },
  { id: "g309", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Libros de idioma", categoria: "material_educativo", monto: 230, fecha: "2025-06-05", mes: "2025-06" },
  { id: "g310", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Alimentacion junio", categoria: "alimentacion", monto: 140, fecha: "2025-06-15", mes: "2025-06" },
  { id: "g311", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje junio", categoria: "transporte", monto: 130, fecha: "2025-06-10", mes: "2025-06" },
  { id: "g312", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Utiles del 2do semestre", categoria: "material_educativo", monto: 180, fecha: "2025-07-05", mes: "2025-07" },
  { id: "g313", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Refaccion julio", categoria: "alimentacion", monto: 120, fecha: "2025-07-15", mes: "2025-07" },
  { id: "g314", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Transporte julio", categoria: "transporte", monto: 110, fecha: "2025-07-10", mes: "2025-07" },
  { id: "g315", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Material escolar agosto", categoria: "material_educativo", monto: 200, fecha: "2025-08-05", mes: "2025-08" },
  { id: "g316", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Alimentacion agosto", categoria: "alimentacion", monto: 130, fecha: "2025-08-15", mes: "2025-08" },
  { id: "g317", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje agosto", categoria: "transporte", monto: 120, fecha: "2025-08-10", mes: "2025-08" },
  { id: "g318", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Libros de computacion", categoria: "material_educativo", monto: 220, fecha: "2025-09-05", mes: "2025-09" },
  { id: "g319", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Comidas septiembre", categoria: "alimentacion", monto: 140, fecha: "2025-09-15", mes: "2025-09" },
  { id: "g320", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Transporte septiembre", categoria: "transporte", monto: 130, fecha: "2025-09-10", mes: "2025-09" },
  { id: "g321", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Material de proyecto", categoria: "material_educativo", monto: 250, fecha: "2025-10-05", mes: "2025-10" },
  { id: "g322", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Alimentacion octubre", categoria: "alimentacion", monto: 150, fecha: "2025-10-15", mes: "2025-10" },
  { id: "g323", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje octubre", categoria: "transporte", monto: 130, fecha: "2025-10-10", mes: "2025-10" },
  { id: "g324", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Utiles noviembre", categoria: "material_educativo", monto: 200, fecha: "2025-11-05", mes: "2025-11" },
  { id: "g325", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Refaccion noviembre", categoria: "alimentacion", monto: 130, fecha: "2025-11-15", mes: "2025-11" },
  { id: "g326", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Transporte noviembre", categoria: "transporte", monto: 120, fecha: "2025-11-10", mes: "2025-11" },
  { id: "g327", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Cuadernos nuevos para 2026", categoria: "material_educativo", monto: 180, fecha: "2025-12-05", mes: "2025-12" },
  { id: "g328", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Alimentacion diciembre", categoria: "alimentacion", monto: 120, fecha: "2025-12-15", mes: "2025-12" },
  { id: "g329", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje diciembre", categoria: "transporte", monto: 110, fecha: "2025-12-10", mes: "2025-12" },
  { id: "g330", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Material escolar enero 2026", categoria: "material_educativo", monto: 220, fecha: "2026-01-05", mes: "2026-01" },
  { id: "g331", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Comidas enero", categoria: "alimentacion", monto: 140, fecha: "2026-01-15", mes: "2026-01" },
  { id: "g332", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje enero 2026", categoria: "transporte", monto: 130, fecha: "2026-01-10", mes: "2026-01" },
  { id: "g333", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Libros de 2do basico", categoria: "material_educativo", monto: 200, fecha: "2026-03-05", mes: "2026-03" },
  { id: "g334", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Alimentacion marzo", categoria: "alimentacion", monto: 130, fecha: "2026-03-15", mes: "2026-03" },
  { id: "g335", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Transporte marzo", categoria: "transporte", monto: 120, fecha: "2026-03-10", mes: "2026-03" },
  { id: "g336", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Utiles escolares", categoria: "material_educativo", monto: 230, fecha: "2026-04-05", mes: "2026-04" },
  { id: "g337", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Comidas abril", categoria: "alimentacion", monto: 140, fecha: "2026-04-15", mes: "2026-04" },
  { id: "g338", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje abril", categoria: "transporte", monto: 130, fecha: "2026-04-10", mes: "2026-04" },
  { id: "g339", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Material de mayo", categoria: "material_educativo", monto: 210, fecha: "2026-05-05", mes: "2026-05" },
  { id: "g340", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Alimentacion mayo", categoria: "alimentacion", monto: 130, fecha: "2026-05-15", mes: "2026-05" },
  { id: "g341", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Transporte mayo", categoria: "transporte", monto: 120, fecha: "2026-05-10", mes: "2026-05" },
  // ── Completar Feb 2026 (3er gasto faltante para B3/B4/B6/B7/B8) ──
  { id: "g343", becarioId: "3", becarioNombre: "Ana Garcia", concepto: "Alimentacion febrero", categoria: "alimentacion", monto: 280, fecha: "2026-02-15", mes: "2026-02" },
  { id: "g344", becarioId: "4", becarioNombre: "Luis Hernandez", concepto: "Pasaje febrero", categoria: "transporte", monto: 150, fecha: "2026-02-10", mes: "2026-02" },
  { id: "g345", becarioId: "6", becarioNombre: "Diego Ramirez", concepto: "Material de estructuras", categoria: "material_educativo", monto: 420, fecha: "2026-02-05", mes: "2026-02" },
  { id: "g346", becarioId: "7", becarioNombre: "Valeria Poot", concepto: "Alimentacion febrero", categoria: "alimentacion", monto: 160, fecha: "2026-02-15", mes: "2026-02" },
  { id: "g347", becarioId: "8", becarioNombre: "Jorge Canul", concepto: "Pasaje febrero", categoria: "transporte", monto: 130, fecha: "2026-02-10", mes: "2026-02" },
];

// ── Descuentos ──────────────────────────────────────────────

export const descuentos: Descuento[] = [
  {
    id: "d1",
    becarioId: "2",
    becarioNombre: "Carlos Martinez",
    motivo: "Entrega tardia de constancia de inscripcion",
    tipo: "documentos",
    monto: 200,
    fecha: "2026-02-10",
    mesAplicado: "2026-02",
  },
  {
    id: "d2",
    becarioId: "6",
    becarioNombre: "Diego Ramirez",
    motivo: "No asistio al taller obligatorio",
    tipo: "atraso",
    monto: 150,
    fecha: "2026-02-15",
    mesAplicado: "2026-02",
  },
  {
    id: "d3",
    becarioId: "4",
    becarioNombre: "Luis Hernandez",
    motivo: "Informe mensual entregado incompleto",
    tipo: "entrega",
    monto: 100,
    fecha: "2026-01-28",
    mesAplicado: "2026-01",
  },
  { id: "d4", becarioId: "1", becarioNombre: "Maria Lopez", motivo: "Reporte trimestral entregado fuera de fecha", tipo: "entrega", monto: 100, fecha: "2025-04-28", mesAplicado: "2025-04" },
  { id: "d5", becarioId: "3", becarioNombre: "Ana Garcia", motivo: "Constancia de inscripcion no presentada a tiempo", tipo: "documentos", monto: 150, fecha: "2025-06-25", mesAplicado: "2025-06" },
  { id: "d6", becarioId: "6", becarioNombre: "Diego Ramirez", motivo: "Inasistencia a taller obligatorio de seguridad", tipo: "atraso", monto: 200, fecha: "2025-07-20", mesAplicado: "2025-07" },
  { id: "d7", becarioId: "4", becarioNombre: "Luis Hernandez", motivo: "Informe mensual entregado incompleto agosto", tipo: "entrega", monto: 100, fecha: "2025-08-28", mesAplicado: "2025-08" },
  { id: "d8", becarioId: "2", becarioNombre: "Carlos Martinez", motivo: "Constancia de notas del semestre no entregada", tipo: "documentos", monto: 250, fecha: "2025-09-25", mesAplicado: "2025-09" },
  { id: "d9", becarioId: "7", becarioNombre: "Valeria Poot", motivo: "Incumplimiento de actividad extracurricular", tipo: "otro", monto: 80, fecha: "2025-10-20", mesAplicado: "2025-10" },
  { id: "d10", becarioId: "1", becarioNombre: "Maria Lopez", motivo: "Reporte de gastos no presentado", tipo: "entrega", monto: 150, fecha: "2025-11-28", mesAplicado: "2025-11" },
  { id: "d11", becarioId: "8", becarioNombre: "Jorge Canul", motivo: "Entrega de boleta fuera del plazo establecido", tipo: "atraso", monto: 100, fecha: "2025-12-20", mesAplicado: "2025-12" },
  { id: "d12", becarioId: "6", becarioNombre: "Diego Ramirez", motivo: "Constancia de inscripcion 2026 entregada tarde", tipo: "documentos", monto: 180, fecha: "2026-01-25", mesAplicado: "2026-01" },
  { id: "d13", becarioId: "3", becarioNombre: "Ana Garcia", motivo: "Informe trimestral con errores, requiere nueva entrega", tipo: "entrega", monto: 200, fecha: "2026-03-28", mesAplicado: "2026-03" },
  { id: "d14", becarioId: "4", becarioNombre: "Luis Hernandez", motivo: "Inasistencia a taller de orientacion vocacional", tipo: "otro", monto: 100, fecha: "2026-04-20", mesAplicado: "2026-04" },
  { id: "d15", becarioId: "2", becarioNombre: "Carlos Martinez", motivo: "Documentos de renovacion de beca incompletos", tipo: "documentos", monto: 150, fecha: "2026-05-20", mesAplicado: "2026-05" },
];

// ── Pagos ────────────────────────────────────────────────────

export const pagos: Pago[] = [
  {
    id: "p1",
    becarioId: "1",
    becarioNombre: "Maria Lopez Gonzalez",
    mes: "2026-02",
    montoBase: 2000,
    descuentos: 0,
    montoNeto: 2000,
    estado: "pagado",
    fechaPago: "2026-02-05",
  },
  {
    id: "p2",
    becarioId: "2",
    becarioNombre: "Carlos Martinez Ruiz",
    mes: "2026-02",
    montoBase: 2500,
    descuentos: 200,
    montoNeto: 2300,
    estado: "pendiente",
  },
  {
    id: "p3",
    becarioId: "3",
    becarioNombre: "Ana Garcia Herrera",
    mes: "2026-02",
    montoBase: 1500,
    descuentos: 0,
    montoNeto: 1500,
    estado: "pagado",
    fechaPago: "2026-02-05",
  },
  {
    id: "p4",
    becarioId: "4",
    becarioNombre: "Luis Hernandez Pech",
    mes: "2026-02",
    montoBase: 1200,
    descuentos: 0,
    montoNeto: 1200,
    estado: "pendiente",
  },
  {
    id: "p5",
    becarioId: "6",
    becarioNombre: "Diego Ramirez Ku",
    mes: "2026-02",
    montoBase: 2000,
    descuentos: 150,
    montoNeto: 1850,
    estado: "retenido",
  },
  {
    id: "p6",
    becarioId: "7",
    becarioNombre: "Valeria Poot May",
    mes: "2026-02",
    montoBase: 800,
    descuentos: 0,
    montoNeto: 800,
    estado: "pagado",
    fechaPago: "2026-02-05",
  },
  {
    id: "p7",
    becarioId: "8",
    becarioNombre: "Jorge Canul Balam",
    mes: "2026-02",
    montoBase: 800,
    descuentos: 0,
    montoNeto: 800,
    estado: "pendiente",
  },
  // ── B1: Maria Lopez ──
  { id: "p8",  becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-01", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-01-05" },
  { id: "p9",  becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-02", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-02-05" },
  { id: "p10", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-03", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-03-05" },
  { id: "p11", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-04", montoBase: 2000, descuentos: 100, montoNeto: 1900, estado: "pagado", fechaPago: "2025-04-05" },
  { id: "p12", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-05", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-05-05" },
  { id: "p13", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-06", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-06-05" },
  { id: "p14", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-07", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-07-05" },
  { id: "p15", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-08", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-08-05" },
  { id: "p16", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-09", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-09-05" },
  { id: "p17", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-10", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-10-05" },
  { id: "p18", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-11", montoBase: 2000, descuentos: 150, montoNeto: 1850, estado: "pagado", fechaPago: "2025-11-05" },
  { id: "p19", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2025-12", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-12-05" },
  { id: "p20", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2026-01", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2026-01-05" },
  { id: "p21", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2026-03", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pendiente" },
  { id: "p22", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2026-04", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pendiente" },
  { id: "p23", becarioId: "1", becarioNombre: "Maria Lopez Gonzalez", mes: "2026-05", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pendiente" },
  // ── B2: Carlos Martinez ──
  { id: "p24", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-01", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-01-05" },
  { id: "p25", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-02", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-02-05" },
  { id: "p26", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-03", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-03-05" },
  { id: "p27", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-04", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-04-05" },
  { id: "p28", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-05", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-05-05" },
  { id: "p29", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-06", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-06-05" },
  { id: "p30", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-07", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-07-05" },
  { id: "p31", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-08", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-08-05" },
  { id: "p32", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-09", montoBase: 2500, descuentos: 250, montoNeto: 2250, estado: "retenido" },
  { id: "p33", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-10", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-10-05" },
  { id: "p34", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-11", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-11-05" },
  { id: "p35", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2025-12", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2025-12-05" },
  { id: "p36", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2026-01", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pagado", fechaPago: "2026-01-05" },
  { id: "p37", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2026-03", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pendiente" },
  { id: "p38", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2026-04", montoBase: 2500, descuentos: 0,   montoNeto: 2500, estado: "pendiente" },
  { id: "p39", becarioId: "2", becarioNombre: "Carlos Martinez Ruiz", mes: "2026-05", montoBase: 2500, descuentos: 150, montoNeto: 2350, estado: "pendiente" },
  // ── B3: Ana Garcia ──
  { id: "p40", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-02", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-02-05" },
  { id: "p41", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-03", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-03-05" },
  { id: "p42", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-04", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-04-05" },
  { id: "p43", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-05", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-05-05" },
  { id: "p44", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-06", montoBase: 1500, descuentos: 150, montoNeto: 1350, estado: "pagado", fechaPago: "2025-06-05" },
  { id: "p45", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-07", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-07-05" },
  { id: "p46", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-08", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-08-05" },
  { id: "p47", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-09", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-09-05" },
  { id: "p48", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-10", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-10-05" },
  { id: "p49", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-11", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-11-05" },
  { id: "p50", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2025-12", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2025-12-05" },
  { id: "p51", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2026-01", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pagado", fechaPago: "2026-01-05" },
  { id: "p52", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2026-03", montoBase: 1500, descuentos: 200, montoNeto: 1300, estado: "pendiente" },
  { id: "p53", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2026-04", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pendiente" },
  { id: "p54", becarioId: "3", becarioNombre: "Ana Garcia Herrera", mes: "2026-05", montoBase: 1500, descuentos: 0,   montoNeto: 1500, estado: "pendiente" },
  // ── B4: Luis Hernandez ──
  { id: "p55", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-01", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-01-05" },
  { id: "p56", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-02", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-02-05" },
  { id: "p57", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-03", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-03-05" },
  { id: "p58", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-04", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-04-05" },
  { id: "p59", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-05", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-05-05" },
  { id: "p60", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-06", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-06-05" },
  { id: "p61", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-07", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-07-05" },
  { id: "p62", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-08", montoBase: 1200, descuentos: 100, montoNeto: 1100, estado: "pagado", fechaPago: "2025-08-05" },
  { id: "p63", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-09", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-09-05" },
  { id: "p64", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-10", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-10-05" },
  { id: "p65", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-11", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-11-05" },
  { id: "p66", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2025-12", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pagado", fechaPago: "2025-12-05" },
  { id: "p67", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2026-01", montoBase: 1200, descuentos: 100, montoNeto: 1100, estado: "pagado", fechaPago: "2026-01-05" },
  { id: "p68", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2026-03", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pendiente" },
  { id: "p69", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2026-04", montoBase: 1200, descuentos: 100, montoNeto: 1100, estado: "pendiente" },
  { id: "p70", becarioId: "4", becarioNombre: "Luis Hernandez Pech", mes: "2026-05", montoBase: 1200, descuentos: 0,   montoNeto: 1200, estado: "pendiente" },
  // ── B6: Diego Ramirez ──
  { id: "p71", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-01", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-01-05" },
  { id: "p72", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-02", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-02-05" },
  { id: "p73", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-03", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-03-05" },
  { id: "p74", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-04", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-04-05" },
  { id: "p75", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-05", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-05-05" },
  { id: "p76", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-06", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-06-05" },
  { id: "p77", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-07", montoBase: 2000, descuentos: 200, montoNeto: 1800, estado: "retenido" },
  { id: "p78", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-08", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-08-05" },
  { id: "p79", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-09", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-09-05" },
  { id: "p80", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-10", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-10-05" },
  { id: "p81", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-11", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-11-05" },
  { id: "p82", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2025-12", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pagado", fechaPago: "2025-12-05" },
  { id: "p83", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2026-01", montoBase: 2000, descuentos: 180, montoNeto: 1820, estado: "retenido" },
  { id: "p84", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2026-03", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pendiente" },
  { id: "p85", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2026-04", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pendiente" },
  { id: "p86", becarioId: "6", becarioNombre: "Diego Ramirez Ku", mes: "2026-05", montoBase: 2000, descuentos: 0,   montoNeto: 2000, estado: "pendiente" },
  // ── B7: Valeria Poot ──
  { id: "p87",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-01", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-01-05" },
  { id: "p88",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-02", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-02-05" },
  { id: "p89",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-03", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-03-05" },
  { id: "p90",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-04", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-04-05" },
  { id: "p91",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-05", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-05-05" },
  { id: "p92",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-06", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-06-05" },
  { id: "p93",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-07", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-07-05" },
  { id: "p94",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-08", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-08-05" },
  { id: "p95",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-09", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-09-05" },
  { id: "p96",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-10", montoBase: 800, descuentos: 80, montoNeto: 720, estado: "pagado", fechaPago: "2025-10-05" },
  { id: "p97",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-11", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-11-05" },
  { id: "p98",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2025-12", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2025-12-05" },
  { id: "p99",  becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2026-01", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pagado", fechaPago: "2026-01-05" },
  { id: "p100", becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2026-03", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pendiente" },
  { id: "p101", becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2026-04", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pendiente" },
  { id: "p102", becarioId: "7", becarioNombre: "Valeria Poot May", mes: "2026-05", montoBase: 800, descuentos: 0,  montoNeto: 800, estado: "pendiente" },
  // ── B8: Jorge Canul ──
  { id: "p103", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-03", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-03-05" },
  { id: "p104", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-04", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-04-05" },
  { id: "p105", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-05", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-05-05" },
  { id: "p106", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-06", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-06-05" },
  { id: "p107", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-07", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-07-05" },
  { id: "p108", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-08", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-08-05" },
  { id: "p109", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-09", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-09-05" },
  { id: "p110", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-10", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-10-05" },
  { id: "p111", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-11", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2025-11-05" },
  { id: "p112", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2025-12", montoBase: 800, descuentos: 100, montoNeto: 700, estado: "pagado", fechaPago: "2025-12-05" },
  { id: "p113", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2026-01", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pagado", fechaPago: "2026-01-05" },
  { id: "p114", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2026-03", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pendiente" },
  { id: "p115", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2026-04", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pendiente" },
  { id: "p116", becarioId: "8", becarioNombre: "Jorge Canul Balam", mes: "2026-05", montoBase: 800, descuentos: 0,   montoNeto: 800, estado: "pendiente" },
];

// ── Actividades ─────────────────────────────────────────────

export const actividades: Actividad[] = [
  {
    id: "a1",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    tipo: "taller",
    titulo: "Taller de liderazgo",
    fecha: "2026-02-25",
    completada: false,
  },
  {
    id: "a2",
    becarioId: "2",
    becarioNombre: "Carlos Martinez",
    tipo: "entrega",
    titulo: "Entrega de informe mensual",
    fecha: "2026-02-28",
    completada: false,
  },
  {
    id: "a3",
    becarioId: "3",
    becarioNombre: "Ana Garcia",
    tipo: "reunion",
    titulo: "Reunion con tutor",
    fecha: "2026-02-26",
    completada: false,
  },
  {
    id: "a4",
    becarioId: "4",
    becarioNombre: "Luis Hernandez",
    tipo: "evento",
    titulo: "Expo estudiantil",
    fecha: "2026-03-01",
    completada: false,
  },
  {
    id: "a5",
    becarioId: "1",
    becarioNombre: "Maria Lopez",
    tipo: "entrega",
    titulo: "Entrega de reporte de gastos",
    fecha: "2026-02-20",
    completada: true,
  },
  {
    id: "a6",
    becarioId: "6",
    becarioNombre: "Diego Ramirez",
    tipo: "taller",
    titulo: "Taller de seguridad laboral",
    fecha: "2026-03-05",
    completada: false,
  },
  {
    id: "a7",
    becarioId: "7",
    becarioNombre: "Valeria Poot",
    tipo: "entrega",
    titulo: "Boleta de calificaciones",
    fecha: "2026-03-02",
    completada: false,
  },
  {
    id: "a8",
    becarioId: "8",
    becarioNombre: "Jorge Canul",
    tipo: "reunion",
    titulo: "Reunion con padres",
    fecha: "2026-03-08",
    completada: false,
  },
  { id: "a9",  becarioId: "1", becarioNombre: "Maria Lopez",    tipo: "taller",  titulo: "Taller de finanzas personales",          fecha: "2025-03-15", completada: true },
  { id: "a10", becarioId: "2", becarioNombre: "Carlos Martinez", tipo: "reunion", titulo: "Reunion de seguimiento academico",        fecha: "2025-04-20", completada: true },
  { id: "a11", becarioId: "3", becarioNombre: "Ana Garcia",      tipo: "entrega", titulo: "Entrega informe 1er trimestre",           fecha: "2025-03-28", completada: true },
  { id: "a12", becarioId: "6", becarioNombre: "Diego Ramirez",   tipo: "evento",  titulo: "Feria vocacional universitaria",          fecha: "2025-05-10", completada: true },
  { id: "a13", becarioId: "4", becarioNombre: "Luis Hernandez",  tipo: "taller",  titulo: "Taller de metodologia de estudio",        fecha: "2025-06-05", completada: true },
  { id: "a14", becarioId: "7", becarioNombre: "Valeria Poot",    tipo: "reunion", titulo: "Reunion semestral de becarios",           fecha: "2025-07-12", completada: true },
  { id: "a15", becarioId: "1", becarioNombre: "Maria Lopez",     tipo: "entrega", titulo: "Entrega de constancia semestral",         fecha: "2025-08-10", completada: true },
  { id: "a16", becarioId: "8", becarioNombre: "Jorge Canul",     tipo: "taller",  titulo: "Taller de liderazgo juvenil",             fecha: "2025-09-20", completada: true },
  { id: "a17", becarioId: "2", becarioNombre: "Carlos Martinez", tipo: "evento",  titulo: "Jornada academica anual",                 fecha: "2025-10-05", completada: true },
  { id: "a18", becarioId: "3", becarioNombre: "Ana Garcia",      tipo: "reunion", titulo: "Reunion de evaluacion trimestral",        fecha: "2025-11-15", completada: true },
  { id: "a19", becarioId: "4", becarioNombre: "Luis Hernandez",  tipo: "entrega", titulo: "Entrega de boleta 3er bimestre",          fecha: "2025-10-10", completada: true },
  { id: "a20", becarioId: "6", becarioNombre: "Diego Ramirez",   tipo: "taller",  titulo: "Taller de elaboracion de CV",             fecha: "2025-11-22", completada: true },
  { id: "a21", becarioId: "7", becarioNombre: "Valeria Poot",    tipo: "evento",  titulo: "Clausura academica 2025",                 fecha: "2025-12-10", completada: true },
  { id: "a22", becarioId: "8", becarioNombre: "Jorge Canul",     tipo: "reunion", titulo: "Reunion de inicio de ciclo 2026",         fecha: "2026-01-15", completada: true },
  { id: "a23", becarioId: "1", becarioNombre: "Maria Lopez",     tipo: "taller",  titulo: "Taller de redaccion academica",           fecha: "2026-02-12", completada: true },
  { id: "a24", becarioId: "2", becarioNombre: "Carlos Martinez", tipo: "entrega", titulo: "Entrega de informe 1er trimestre 2026",   fecha: "2026-03-25", completada: false },
  { id: "a25", becarioId: "6", becarioNombre: "Diego Ramirez",   tipo: "reunion", titulo: "Reunion de seguimiento mayo 2026",        fecha: "2026-04-18", completada: false },
  { id: "a26", becarioId: "3", becarioNombre: "Ana Garcia",      tipo: "evento",  titulo: "Feria de becas comunitaria",              fecha: "2026-05-15", completada: false },
];

// ── Recordatorios ───────────────────────────────────────────

export const recordatorios: Recordatorio[] = [
  {
    id: "r1",
    titulo: "Renovacion de becas universitarias",
    descripcion:
      "Renovacion semestral para becarios universitarios. Solicitar documentacion.",
    fecha: "2026-03-15",
    tipo: "renovacion",
    prioridad: "alta",
    nivelDestino: "universitario",
  },
  {
    id: "r2",
    titulo: "Entrega de constancia - Carlos Martinez",
    descripcion:
      "Carlos debe entregar su constancia de inscripcion actualizada.",
    fecha: "2026-02-28",
    tipo: "documento",
    prioridad: "alta",
    nivelDestino: "universitario",
  },
  {
    id: "r3",
    titulo: "Taller obligatorio de valores",
    descripcion: "Taller obligatorio para todos los becarios de diversificado.",
    fecha: "2026-03-10",
    tipo: "actividad",
    prioridad: "media",
    nivelDestino: "diversificado",
  },
  {
    id: "r4",
    titulo: "Revision trimestral de presupuestos",
    descripcion:
      "Revision trimestral de presupuestos asignados a cada becario.",
    fecha: "2026-03-20",
    tipo: "general",
    prioridad: "media",
    nivelDestino: "todos",
  },
  {
    id: "r5",
    titulo: "Boletas de calificaciones diversificado",
    descripcion:
      "Todos los becarios de diversificado deben entregar boletas de calificaciones.",
    fecha: "2026-03-05",
    tipo: "documento",
    prioridad: "alta",
    nivelDestino: "diversificado",
  },
  {
    id: "r6",
    titulo: "Inscripcion diversificado",
    descripcion:
      "Periodo de inscripcion para becarios de diversificado. Verificar papeleria.",
    fecha: "2026-03-12",
    tipo: "documento",
    prioridad: "media",
    nivelDestino: "diversificado",
  },
];

// ── Tareas Asignadas ────────────────────────────────────────

export const tareasAsignadas: TareaAsignada[] = [
  // Informes trimestrales (todos)
  {
    id: "t1",
    titulo: "Informe trimestral enero-marzo 2025",
    descripcion:
      "Redacta un informe con las actividades academicas del primer trimestre del ciclo 2025. Incluye asistencia, calificaciones parciales y proyectos en curso.",
    tipo: "informe",
    fechaLimite: "2025-03-31",
    nivelDestino: "todos",
    creadaPor: "u2",
  },
  {
    id: "t2",
    titulo: "Informe trimestral abril-junio 2025",
    descripcion:
      "Informe de actividades del segundo trimestre 2025. Detalla tu desempeno academico y actividades extracurriculares del periodo.",
    tipo: "informe",
    fechaLimite: "2025-06-30",
    nivelDestino: "todos",
    creadaPor: "u2",
  },
  {
    id: "t3",
    titulo: "Informe trimestral julio-septiembre 2025",
    descripcion:
      "Informe de cierre del tercer trimestre 2025. Incluye resultados de evaluaciones y actividades del periodo.",
    tipo: "informe",
    fechaLimite: "2025-09-30",
    nivelDestino: "todos",
    creadaPor: "u2",
  },
  {
    id: "t4",
    titulo: "Informe trimestral enero-marzo 2026",
    descripcion:
      "Informe de actividades del primer trimestre 2026. Detalla avances academicos, asistencia y proyectos del periodo.",
    tipo: "informe",
    fechaLimite: "2026-03-31",
    nivelDestino: "todos",
    creadaPor: "u2",
  },
  // Boletas bimestrales (diversificado)
  {
    id: "t5",
    titulo: "Boleta del 1er bimestre 2025",
    descripcion:
      "Entrega la boleta de calificaciones del primer bimestre del ciclo escolar 2025. Debe estar firmada y sellada por el director del establecimiento.",
    tipo: "boleta",
    fechaLimite: "2025-04-15",
    nivelDestino: "diversificado",
    creadaPor: "u1",
  },
  {
    id: "t6",
    titulo: "Boleta del 2do bimestre 2025",
    descripcion:
      "Entrega la boleta de calificaciones del segundo bimestre 2025. Debe estar firmada y sellada por el director del establecimiento.",
    tipo: "boleta",
    fechaLimite: "2025-07-15",
    nivelDestino: "diversificado",
    creadaPor: "u1",
  },
  {
    id: "t7",
    titulo: "Boleta del 3er bimestre 2025",
    descripcion:
      "Entrega la boleta de calificaciones del tercer bimestre 2025. Debe estar firmada y sellada por el director del establecimiento.",
    tipo: "boleta",
    fechaLimite: "2025-10-15",
    nivelDestino: "diversificado",
    creadaPor: "u1",
  },
  {
    id: "t8",
    titulo: "Boleta del 4to bimestre 2025",
    descripcion:
      "Entrega la boleta de calificaciones del cuarto bimestre del ciclo 2025. Debe incluir el promedio final del año.",
    tipo: "boleta",
    fechaLimite: "2026-01-15",
    nivelDestino: "diversificado",
    creadaPor: "u1",
  },
  {
    id: "t9",
    titulo: "Boleta del 1er bimestre 2026",
    descripcion:
      "Entrega la boleta de calificaciones del primer bimestre del ciclo escolar 2026. Debe estar firmada y sellada por el director del establecimiento.",
    tipo: "boleta",
    fechaLimite: "2026-04-15",
    nivelDestino: "diversificado",
    creadaPor: "u1",
  },
  // Constancias de inscripcion (universitario)
  {
    id: "t10",
    titulo: "Constancia de inscripcion 1er semestre 2025",
    descripcion:
      "Sube tu constancia de inscripcion vigente del primer semestre 2025. Puede ser digital o escaneada con firma del coordinador de registro.",
    tipo: "constancia",
    fechaLimite: "2025-01-31",
    nivelDestino: "universitario",
    creadaPor: "u2",
  },
  {
    id: "t11",
    titulo: "Constancia de inscripcion 2do semestre 2025",
    descripcion:
      "Sube tu constancia de inscripcion del segundo semestre 2025, incluyendo el pensum de materias inscritas.",
    tipo: "constancia",
    fechaLimite: "2025-08-15",
    nivelDestino: "universitario",
    creadaPor: "u2",
  },
  {
    id: "t12",
    titulo: "Constancia de inscripcion 1er semestre 2026",
    descripcion:
      "Sube tu constancia de inscripcion vigente del primer semestre 2026. Puede ser digital o escaneada con firma del coordinador de registro.",
    tipo: "constancia",
    fechaLimite: "2026-01-31",
    nivelDestino: "universitario",
    creadaPor: "u2",
  },
  // Constancias de notas (universitario)
  {
    id: "t13",
    titulo: "Constancia de notas 1er semestre 2025",
    descripcion:
      "Entrega la constancia oficial de notas del primer semestre 2025, emitida por el registro academico de tu universidad.",
    tipo: "constancia",
    fechaLimite: "2025-07-15",
    nivelDestino: "universitario",
    creadaPor: "u2",
  },
  {
    id: "t14",
    titulo: "Constancia de notas 2do semestre 2025",
    descripcion:
      "Entrega la constancia oficial de notas del segundo semestre 2025, emitida por el registro academico de tu universidad.",
    tipo: "constancia",
    fechaLimite: "2026-01-20",
    nivelDestino: "universitario",
    creadaPor: "u2",
  },
  {
    id: "t15",
    titulo: "Constancia de notas 1er semestre 2026",
    descripcion:
      "Entrega la constancia oficial de notas del primer semestre 2026, emitida por el registro academico de tu universidad.",
    tipo: "constancia",
    fechaLimite: "2026-07-15",
    nivelDestino: "universitario",
    creadaPor: "u2",
  },
  // Tareas especificas
  {
    id: "t16",
    titulo: "Tarea: impacto social de las becas",
    descripcion:
      "Investiga sobre el impacto de las becas en el desarrollo comunitario y personal. Minimo 3 paginas con referencias bibliograficas.",
    tipo: "tarea",
    fechaLimite: "2025-06-15",
    nivelDestino: "todos",
    creadaPor: "u3",
  },
  {
    id: "t17",
    titulo: "Reporte de practica profesional 2026",
    descripcion:
      "Entrega el reporte de tu practica supervisada con firma del coordinador de la institucion donde la realizaste.",
    tipo: "informe",
    fechaLimite: "2026-07-01",
    nivelDestino: "universitario",
    creadaPor: "u1",
  },
];

// ── Entregas de Documentos ───────────────────────────────────

export const entregasDocumentos: EntregaDocumento[] = [
  // t1 — Informe trimestral ene-mar 2025 (todos activos: 1,2,3,4,6,7,8)
  {
    id: "e1",
    tareaId: "t1",
    becarioId: "1",
    becarioNombre: "Maria Lopez Gonzalez",
    archivos: [],
    comentario: "Adjunto informe de actividades del primer trimestre.",
    fechaEntrega: "2025-03-28",
    estado: "revisado",
    comentarioRevisor: "Informe completo y bien estructurado.",
  },
  {
    id: "e2",
    tareaId: "t1",
    becarioId: "2",
    becarioNombre: "Carlos Martinez Ruiz",
    archivos: [],
    comentario: "Informe del primer trimestre adjunto.",
    fechaEntrega: "2025-03-29",
    estado: "revisado",
    comentarioRevisor: "Recibido correctamente.",
  },
  {
    id: "e3",
    tareaId: "t1",
    becarioId: "3",
    becarioNombre: "Ana Garcia Herrera",
    archivos: [],
    comentario: "Informe trimestral primer cuatrimestre.",
    fechaEntrega: "2025-03-30",
    estado: "revisado",
    comentarioRevisor: "Aprobado.",
  },
  {
    id: "e4",
    tareaId: "t1",
    becarioId: "4",
    becarioNombre: "Luis Hernandez Pech",
    archivos: [],
    comentario: "Informe de mis actividades del trimestre.",
    fechaEntrega: "2025-03-20",
    estado: "rechazado",
    comentarioRevisor: "Informe muy breve, falta informacion de actividades academicas.",
  },
  {
    id: "e5",
    tareaId: "t1",
    becarioId: "6",
    becarioNombre: "Diego Ramirez Ku",
    archivos: [],
    comentario: "Informe de actividades academicas primer trimestre.",
    fechaEntrega: "2025-03-31",
    estado: "revisado",
    comentarioRevisor: "Bien redactado.",
  },
  {
    id: "e6",
    tareaId: "t1",
    becarioId: "7",
    becarioNombre: "Valeria Poot May",
    archivos: [],
    comentario: "Primer informe trimestral.",
    fechaEntrega: "2025-03-27",
    estado: "revisado",
    comentarioRevisor: "Completo.",
  },
  {
    id: "e7",
    tareaId: "t1",
    becarioId: "8",
    becarioNombre: "Jorge Canul Balam",
    archivos: [],
    comentario: "Informe del primer trimestre escolar.",
    fechaEntrega: "2025-03-25",
    estado: "revisado",
    comentarioRevisor: "En regla.",
  },
  // t3 — Informe trimestral jul-sep 2025 (todos: 1,2,3,4,6,7,8)
  {
    id: "e8",
    tareaId: "t3",
    becarioId: "1",
    becarioNombre: "Maria Lopez Gonzalez",
    archivos: [],
    comentario: "Informe del tercer trimestre con detalle de examenes parciales.",
    fechaEntrega: "2025-09-28",
    estado: "revisado",
    comentarioRevisor: "Excelente seguimiento de actividades.",
  },
  {
    id: "e9",
    tareaId: "t3",
    becarioId: "2",
    becarioNombre: "Carlos Martinez Ruiz",
    archivos: [],
    comentario: "Informe trimestral julio-septiembre.",
    fechaEntrega: "2025-09-29",
    estado: "revisado",
    comentarioRevisor: "Correcto.",
  },
  {
    id: "e10",
    tareaId: "t3",
    becarioId: "3",
    becarioNombre: "Ana Garcia Herrera",
    archivos: [],
    comentario: "Adjunto informe de tercer trimestre.",
    fechaEntrega: "2025-09-30",
    estado: "rechazado",
    comentarioRevisor: "Falta el apartado de metas del siguiente trimestre.",
  },
  {
    id: "e11",
    tareaId: "t3",
    becarioId: "4",
    becarioNombre: "Luis Hernandez Pech",
    archivos: [],
    comentario: "Informe del tercer trimestre escolar.",
    fechaEntrega: "2025-09-25",
    estado: "revisado",
    comentarioRevisor: "Recibido.",
  },
  {
    id: "e12",
    tareaId: "t3",
    becarioId: "6",
    becarioNombre: "Diego Ramirez Ku",
    archivos: [],
    comentario: "Informe de actividades julio-septiembre.",
    fechaEntrega: "2025-09-30",
    estado: "revisado",
    comentarioRevisor: "Completo.",
  },
  {
    id: "e13",
    tareaId: "t3",
    becarioId: "7",
    becarioNombre: "Valeria Poot May",
    archivos: [],
    comentario: "Tercer informe trimestral.",
    fechaEntrega: "2025-09-27",
    estado: "revisado",
    comentarioRevisor: "Archivado.",
  },
  {
    id: "e14",
    tareaId: "t3",
    becarioId: "8",
    becarioNombre: "Jorge Canul Balam",
    archivos: [],
    comentario: "Informe de tercer trimestre.",
    fechaEntrega: "2025-09-26",
    estado: "revisado",
    comentarioRevisor: "En orden.",
  },
  // t4 — Informe trimestral ene-mar 2026 (todos: 1,2,3,4,6,7) — Jorge no entrego
  {
    id: "e15",
    tareaId: "t4",
    becarioId: "1",
    becarioNombre: "Maria Lopez Gonzalez",
    archivos: [],
    comentario: "Informe del primer trimestre 2026.",
    fechaEntrega: "2026-03-29",
    estado: "revisado",
    comentarioRevisor: "Perfecto, sigue asi.",
  },
  {
    id: "e16",
    tareaId: "t4",
    becarioId: "2",
    becarioNombre: "Carlos Martinez Ruiz",
    archivos: [],
    comentario: "Primer informe trimestral del ciclo 2026.",
    fechaEntrega: "2026-03-30",
    estado: "revisado",
    comentarioRevisor: "Aprobado.",
  },
  {
    id: "e17",
    tareaId: "t4",
    becarioId: "3",
    becarioNombre: "Ana Garcia Herrera",
    archivos: [],
    comentario: "Informe de actividades enero-marzo 2026.",
    fechaEntrega: "2026-03-28",
    estado: "entregado",
  },
  {
    id: "e18",
    tareaId: "t4",
    becarioId: "4",
    becarioNombre: "Luis Hernandez Pech",
    archivos: [],
    comentario: "Informe primer trimestre 2026.",
    fechaEntrega: "2026-03-31",
    estado: "revisado",
    comentarioRevisor: "Recibido correctamente.",
  },
  {
    id: "e19",
    tareaId: "t4",
    becarioId: "6",
    becarioNombre: "Diego Ramirez Ku",
    archivos: [],
    comentario: "Adjunto informe trimestral.",
    fechaEntrega: "2026-03-27",
    estado: "revisado",
    comentarioRevisor: "Bien.",
  },
  {
    id: "e20",
    tareaId: "t4",
    becarioId: "7",
    becarioNombre: "Valeria Poot May",
    archivos: [],
    comentario: "Informe del primer trimestre 2026.",
    fechaEntrega: "2026-03-30",
    estado: "entregado",
  },
  // t10 — Constancia de inscripcion 1er semestre 2025 (universitario: 1,2,3,6)
  {
    id: "e21",
    tareaId: "t10",
    becarioId: "1",
    becarioNombre: "Maria Lopez Gonzalez",
    archivos: [],
    comentario: "Constancia de inscripcion 1er semestre 2025 firmada.",
    fechaEntrega: "2025-01-28",
    estado: "revisado",
    comentarioRevisor: "Constancia verificada. Todo en orden.",
  },
  {
    id: "e22",
    tareaId: "t10",
    becarioId: "2",
    becarioNombre: "Carlos Martinez Ruiz",
    archivos: [],
    comentario: "Constancia de inscripcion primer semestre.",
    fechaEntrega: "2025-01-29",
    estado: "revisado",
    comentarioRevisor: "Documento correcto.",
  },
  {
    id: "e23",
    tareaId: "t10",
    becarioId: "3",
    becarioNombre: "Ana Garcia Herrera",
    archivos: [],
    comentario: "Adjunto constancia de inscripcion semestre 1.",
    fechaEntrega: "2025-01-30",
    estado: "revisado",
    comentarioRevisor: "Aprobado.",
  },
  {
    id: "e24",
    tareaId: "t10",
    becarioId: "6",
    becarioNombre: "Diego Ramirez Ku",
    archivos: [],
    comentario: "Constancia de inscripcion primer semestre 2025.",
    fechaEntrega: "2025-01-20",
    estado: "rechazado",
    comentarioRevisor: "Falta firma del coordinador de registro. Vuelve a enviar.",
  },
  // t11 — Constancia de inscripcion 2do semestre 2025 (universitario: 1,2,3)
  {
    id: "e25",
    tareaId: "t11",
    becarioId: "1",
    becarioNombre: "Maria Lopez Gonzalez",
    archivos: [],
    comentario: "Constancia de inscripcion 2do semestre con pensum adjunto.",
    fechaEntrega: "2025-05-10",
    estado: "revisado",
    comentarioRevisor: "Pensum correcto, 6to semestre confirmado.",
  },
  {
    id: "e26",
    tareaId: "t11",
    becarioId: "2",
    becarioNombre: "Carlos Martinez Ruiz",
    archivos: [],
    comentario: "Constancia de inscripcion segundo semestre.",
    fechaEntrega: "2025-05-13",
    estado: "revisado",
    comentarioRevisor: "Aprobado.",
  },
  {
    id: "e27",
    tareaId: "t11",
    becarioId: "3",
    becarioNombre: "Ana Garcia Herrera",
    archivos: [],
    comentario: "Inscripcion 2do semestre confirmada.",
    fechaEntrega: "2025-05-14",
    estado: "revisado",
    comentarioRevisor: "En orden.",
  },
  // t12 — Constancia de inscripcion 1er semestre 2026 (universitario: 1,2,3,6)
  {
    id: "e28",
    tareaId: "t12",
    becarioId: "1",
    becarioNombre: "Maria Lopez Gonzalez",
    archivos: [],
    comentario: "Constancia de inscripcion 1er semestre 2026.",
    fechaEntrega: "2026-01-28",
    estado: "revisado",
    comentarioRevisor: "Constancia vigente verificada.",
  },
  {
    id: "e29",
    tareaId: "t12",
    becarioId: "2",
    becarioNombre: "Carlos Martinez Ruiz",
    archivos: [],
    comentario: "Constancia de inscripcion semestre 1 ciclo 2026.",
    fechaEntrega: "2026-01-29",
    estado: "revisado",
    comentarioRevisor: "Aprobado.",
  },
  {
    id: "e30",
    tareaId: "t12",
    becarioId: "3",
    becarioNombre: "Ana Garcia Herrera",
    archivos: [],
    comentario: "Adjunto constancia primer semestre 2026.",
    fechaEntrega: "2026-01-25",
    estado: "rechazado",
    comentarioRevisor: "El documento no tiene fecha ni sello de registro. Vuelve a enviar.",
  },
  {
    id: "e31",
    tareaId: "t12",
    becarioId: "6",
    becarioNombre: "Diego Ramirez Ku",
    archivos: [],
    comentario: "Constancia de inscripcion ciclo 2026.",
    fechaEntrega: "2026-01-30",
    estado: "revisado",
    comentarioRevisor: "Correcto.",
  },
  // t5 — Boleta 1er bimestre 2025 (diversificado: 4,7,8)
  {
    id: "e32",
    tareaId: "t5",
    becarioId: "4",
    becarioNombre: "Luis Hernandez Pech",
    archivos: [],
    comentario: "Boleta primer bimestre firmada por director.",
    fechaEntrega: "2025-04-10",
    estado: "revisado",
    comentarioRevisor: "Calificaciones recibidas y archivadas.",
  },
  {
    id: "e33",
    tareaId: "t5",
    becarioId: "7",
    becarioNombre: "Valeria Poot May",
    archivos: [],
    comentario: "Boleta del primer bimestre.",
    fechaEntrega: "2025-04-12",
    estado: "revisado",
    comentarioRevisor: "Correcto.",
  },
  {
    id: "e34",
    tareaId: "t5",
    becarioId: "8",
    becarioNombre: "Jorge Canul Balam",
    archivos: [],
    comentario: "Boleta bimestral adjunta.",
    fechaEntrega: "2025-04-14",
    estado: "revisado",
    comentarioRevisor: "Recibido.",
  },
  // t6 — Boleta 2do bimestre 2025 (diversificado: 4,7,8) — entrega tardia
  {
    id: "e35",
    tareaId: "t6",
    becarioId: "4",
    becarioNombre: "Luis Hernandez Pech",
    archivos: [],
    comentario: "Boleta segundo bimestre, disculpe el retraso.",
    fechaEntrega: "2025-09-25",
    estado: "revisado",
    comentarioRevisor: "Recibido.",
  },
  {
    id: "e36",
    tareaId: "t6",
    becarioId: "7",
    becarioNombre: "Valeria Poot May",
    archivos: [],
    comentario: "Boleta del 2do bimestre.",
    fechaEntrega: "2025-09-28",
    estado: "revisado",
    comentarioRevisor: "Archivado.",
  },
  {
    id: "e37",
    tareaId: "t6",
    becarioId: "8",
    becarioNombre: "Jorge Canul Balam",
    archivos: [],
    comentario: "Adjunto boleta del segundo bimestre.",
    fechaEntrega: "2025-09-29",
    estado: "revisado",
    comentarioRevisor: "En regla.",
  },
];

// ── Helper functions ────────────────────────────────────────

export function getGastosByBecario(becarioId: string): Gasto[] {
  return gastos.filter((g) => g.becarioId === becarioId);
}

export function getGastosByBecarioMes(becarioId: string, mes: string): Gasto[] {
  return gastos.filter((g) => g.becarioId === becarioId && g.mes === mes);
}

export function calcularGastoMensual(becarioId: string, mes: string): number {
  return getGastosByBecarioMes(becarioId, mes).reduce(
    (sum, g) => sum + g.monto,
    0,
  );
}

export function calcularAhorroMensual(becarioId: string, mes: string): number {
  const becario = becarios.find((b) => b.id === becarioId);
  if (!becario) return 0;
  const gastado = calcularGastoMensual(becarioId, mes);
  return Math.max(0, becario.presupuestoMensual - gastado);
}

export function calcularAhorroAcumulado(becarioId: string): number {
  const meses = Array.from(
    new Set(gastos.filter((g) => g.becarioId === becarioId).map((g) => g.mes)),
  ).sort();
  return meses.reduce((total, mes) => total + calcularAhorroMensual(becarioId, mes), 0);
}

export function getDescuentosByBecario(becarioId: string): Descuento[] {
  return descuentos.filter((d) => d.becarioId === becarioId);
}

export function getDescuentosMes(becarioId: string, mes: string): number {
  return descuentos
    .filter((d) => d.becarioId === becarioId && d.mesAplicado === mes)
    .reduce((sum, d) => sum + d.monto, 0);
}

export function getHistorialAhorro(becarioId: string) {
  const becario = becarios.find((b) => b.id === becarioId);
  if (!becario) return [];
  const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const meses = Array.from(
    new Set(gastos.filter((g) => g.becarioId === becarioId).map((g) => g.mes)),
  ).sort();
  return meses.map((mes) => {
    const [year, month] = mes.split("-");
    const label = `${labels[parseInt(month) - 1]} ${year}`;
    const gastado = calcularGastoMensual(becarioId, mes);
    const ahorro = Math.max(0, becario.presupuestoMensual - gastado);
    return { mes, label, presupuesto: becario.presupuestoMensual, gastado, ahorro };
  });
}

export function getGastosPorCategoria(becarioId?: string) {
  const filtered = becarioId
    ? gastos.filter((g) => g.becarioId === becarioId)
    : gastos;
  const categorias: Record<string, number> = {};
  filtered.forEach((g) => {
    categorias[g.categoria] = (categorias[g.categoria] || 0) + g.monto;
  });
  return Object.entries(categorias).map(([name, value]) => ({
    name: formatCategoria(name),
    value,
  }));
}

export function getGastosPorMes() {
  const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const porMes: Record<string, number> = {};
  gastos.forEach((g) => { porMes[g.mes] = (porMes[g.mes] || 0) + g.monto; });
  return Object.keys(porMes).sort().map((mes) => {
    const [year, month] = mes.split("-");
    return { mes: `${labels[parseInt(month) - 1]} ${year}`, monto: porMes[mes] };
  });
}

export function formatCategoria(cat: string): string {
  const map: Record<string, string> = {
    alimentacion: "Alimentacion",
    transporte: "Transporte",
    material_educativo: "Material Educativo",
    vivienda: "Vivienda",
    salud: "Salud",
    tecnologia: "Tecnologia",
  };
  return map[cat] || cat;
}

export function formatNivel(nivel: string): string {
  const map: Record<string, string> = {
    diversificado: "Diversificado",
    universitario: "Universitario",
  };
  return map[nivel] || nivel;
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
  };
  return map[estado] || estado;
}

export function formatRol(rol: Rol): string {
  const map: Record<string, string> = {
    director: "Director General",
    encargada: "Encargada de Becarios",
    secretaria: "Secretaria",
    tesorero: "Tesorero",
    becario: "Becario",
  };
  return map[rol] || rol;
}

export const CATEGORIAS_GASTO: { value: CategoriaGasto; label: string }[] = [
  { value: "alimentacion", label: "Alimentacion" },
  { value: "transporte", label: "Transporte" },
  { value: "material_educativo", label: "Material Educativo" },
  { value: "vivienda", label: "Vivienda" },
  { value: "salud", label: "Salud" },
  { value: "tecnologia", label: "Tecnologia" },
];

export const NIVELES: { value: NivelEducativo; label: string }[] = [
  { value: "diversificado", label: "Diversificado" },
  { value: "universitario", label: "Universitario" },
];

export function formatTipoDocumento(tipo: string): string {
  const map: Record<string, string> = {
    tarea: "Tarea",
    informe: "Informe mensual",
    constancia: "Constancia",
    boleta: "Boleta de calificaciones",
    otro: "Otro",
  };
  return map[tipo] || tipo;
}

export function formatEstadoEntrega(estado: string): string {
  const map: Record<string, string> = {
    pendiente: "Pendiente",
    entregado: "Entregado",
    revisado: "Revisado",
    rechazado: "Rechazado",
  };
  return map[estado] || estado;
}

export const TIPOS_DOCUMENTO: { value: TipoDocumento; label: string }[] = [
  { value: "tarea", label: "Tarea" },
  { value: "informe", label: "Informe mensual" },
  { value: "constancia", label: "Constancia" },
  { value: "boleta", label: "Boleta de calificaciones" },
  { value: "otro", label: "Otro" },
];

export function formatMes(mes: string): string {
  const [y, m] = mes.split("-");
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  return `${meses[parseInt(m) - 1]} ${y}`;
}
