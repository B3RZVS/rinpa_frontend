import { useState, type ReactNode } from "react";
import { MedidaContext } from "./MedidaContext";
import type { MedidaContextType } from "./MedidaContext.type";
import type { MedidainterfaceResponse } from "../../interface/medida.interface";
import { MedidaService } from "../../services/medida.service";
import { useToaster } from "../../hook/useToaster";
import type { UnidadInterfaceResponse } from "../../interface/unidad.interface";
import { UnidadService } from "../../services/unidad.service";

interface MedidaProviderProps {
  children: ReactNode;
}

export const MedidaProvider: React.FC<MedidaProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [medidas, setMedidas] = useState<MedidainterfaceResponse[]>([]);
  const [unidades, setUnidades] = useState<UnidadInterfaceResponse[]>([]);
  const { showToast } = useToaster();

  const getMedidas = async () => {
    setLoading(true);
    try {
      const response = await MedidaService.medidaGetAll();
      setMedidas(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener las medidas.",
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  const getUnidades = async () => {
    setLoading(true);
    try {
      const response = await UnidadService.unidadGetAll();
      setUnidades(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener las unidades.",
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  const contextValue: MedidaContextType = {
    loading,
    medidas,
    unidades,
    getUnidades,
    getMedidas,
  };
  return (
    <MedidaContext.Provider value={contextValue}>
      {children}
    </MedidaContext.Provider>
  );
};
