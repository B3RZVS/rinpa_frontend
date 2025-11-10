//Estadisica Home
export interface EstadisticaHome {
  cantClientes: number;
  cantProducto: number;
  cantEntregas: number;
}

//Reporte Semanal
export interface ReporteGeneral {
  concepto: string;
  detalle: string;
  fechaEmision: string;
  periodo: string;
  totalEntregas: number;
  productosEntregados: string[];
  clientesConEntrega: ClienteConEntrega[];
  consumoTotalNafta: number;
  costoTotalNafta: number;
}

// Representa un cliente que tuvo entregas en el período
export interface ClienteConEntrega {
  cliente: Cliente;
}

// Representa los datos básicos del cliente
export interface Cliente {
  nombre: string;
  apellido: string;
}

//Reporte Entrega
// Reporte de entregas de un día o período específico
export interface ReporteEntrega {
  periodo: string;
  entregas: Entrega[];
  totalGeneral: TotalGeneral;
}

// Representa una entrega individual a un cliente
export interface Entrega {
  numeroEntrega: string;
  fecha: string; // formato ISO, puede parsearse a Date
  cliente: string;
  productos: string; // descripción formateada; si luego querés detalle, podés modelarlo como array
  cantidadProductosEntregados: number;
  costoUnitarioPromedio: number;
  subtotal: number;
  naftaConsumida: number;
  costoNafta: number;
  total: number;
}

// Totales agregados de todas las entregas del período
export interface TotalGeneral {
  cantidadProductosEntregados: number;
  subtotal: number;
  litrosNafta: number;
  costoNafta: number;
  total: number;
}

//Reporte Cliente
export interface ReporteClientes {
  periodo: string;
  clientes: ClienteReporte[];
}

// Información agregada de un cliente en el período
export interface ClienteReporte {
  nombre: string;
  entregasRealizadas: number;
  productoMasPedido: string;
  totalFacturado: number;
}

export interface getEstadistica {
  fechaInicio: string;
  fechaFin: string;
}
