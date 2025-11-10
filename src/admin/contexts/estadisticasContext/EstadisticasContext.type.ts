import type {
  getEstadistica,
  ReporteClientes,
  ReporteEntrega,
  ReporteGeneral,
  EstadisticaHome,
} from "../../interface/estadisticas.interface";

export interface EstadisticasContextType {
  loading: boolean;
  estadisticaHome: EstadisticaHome | undefined;
  reporteEntrega: ReporteEntrega | undefined;
  reporteCliente: ReporteClientes | undefined;
  reporteGeneral: ReporteGeneral | undefined;
  getReporteEntregas: (data: getEstadistica) => void;
  getReporteClientes: (data: getEstadistica) => void;
  getReporteGeneral: (data: getEstadistica) => void;
  getEstadisticasHome: () => void;
  setResetReportes: () => void;
}
