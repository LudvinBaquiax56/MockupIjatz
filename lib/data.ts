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
  const meses = ["2025-12", "2026-01", "2026-02"];
  return meses.reduce(
    (total, mes) => total + calcularAhorroMensual(becarioId, mes),
    0,
  );
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
  const meses = [
    { mes: "2025-10", label: "Oct 2025" },
    { mes: "2025-11", label: "Nov 2025" },
    { mes: "2025-12", label: "Dic 2025" },
    { mes: "2026-01", label: "Ene 2026" },
    { mes: "2026-02", label: "Feb 2026" },
  ];
  const becario = becarios.find((b) => b.id === becarioId);
  if (!becario) return [];
  return meses.map((m) => {
    const gastado = calcularGastoMensual(becarioId, m.mes);
    const ahorro = Math.max(0, becario.presupuestoMensual - gastado);
    return { ...m, presupuesto: becario.presupuestoMensual, gastado, ahorro };
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
  return [
    { mes: "Oct", monto: 4200 },
    { mes: "Nov", monto: 5800 },
    { mes: "Dic", monto: 3900 },
    { mes: "Ene", monto: 6300 },
    { mes: "Feb", monto: 7280 },
  ];
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
