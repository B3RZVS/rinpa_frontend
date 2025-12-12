import { useState, type ReactNode } from "react";
import { EstadisticasContext } from "./EstadisticasContext";
import type { EstadisticasContextType } from "./EstadisticasContext.type";
import { EstadisticasService } from "../../services/estadisticas.service";
import { useToaster } from "../../../shared/hooks/useToaster";

import type {
  getEstadistica,
  ReporteClientes,
  ReporteEntrega,
  ReporteGeneral,
  EstadisticaHome,
} from "../../interface/estadisticas.interface";

interface EstadisticasProviderProps {
  children: ReactNode;
}

export const EstadisticasProvider: React.FC<EstadisticasProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [estadisticaHome, setEstadisticaHome] = useState<EstadisticaHome>();
  const [reporteEntrega, setReporteEntrega] = useState<ReporteEntrega>();
  const [reporteCliente, setReporteCliente] = useState<ReporteClientes>();
  const [reporteGeneral, setReporteGeneral] = useState<ReporteGeneral>();
  const { showToast } = useToaster();

  const getEstadisticasHome = async () => {
    setLoading(true);
    try {
      const response =
        await EstadisticasService.getEstaditicaEstadisticasHome();
      setEstadisticaHome(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener las estadisticas.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const getReporteGeneral = async (data: getEstadistica) => {
    setLoading(true);
    try {
      const response = await EstadisticasService.getEstaditicaReporteGeneral(
        data
      );
      setReporteGeneral(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener el reporte general.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const getReporteEntregas = async (data: getEstadistica) => {
    setLoading(true);
    try {
      const response = await EstadisticasService.getEstaditicaReporteEntregas(
        data
      );
      setReporteEntrega(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener el reporte de entregas.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const getReporteClientes = async (data: getEstadistica) => {
    setLoading(true);
    try {
      const response = await EstadisticasService.getEstaditicaReporteClientes(
        data
      );
      setReporteCliente(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener el reporte de clientes.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const setResetReportes = () => {
    setReporteCliente(undefined);
    setReporteEntrega(undefined);
    setReporteGeneral(undefined);
  };

  const contextValue: EstadisticasContextType = {
    loading,
    reporteCliente,
    reporteEntrega,
    reporteGeneral,
    estadisticaHome,
    getReporteClientes,
    getReporteEntregas,
    getReporteGeneral,
    setResetReportes,
    getEstadisticasHome,
  };
  return (
    <EstadisticasContext.Provider value={contextValue}>
      {children}
    </EstadisticasContext.Provider>
  );
};
