import { useState, type ReactNode } from "react";
import { MedidaContext } from "./MedidaContext";
import type { MedidaContextType } from "./MedidaContext.type";
import type { MedidainterfaceResponse } from "../../interface/medida.interface";
import { MedidaService } from "../../services/medida.service";
import { useToaster } from "../../hook/useToaster";

interface MedidaProviderProps {
  children: ReactNode;
}

export const MedidaProvider: React.FC<MedidaProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [medidas, setMedidas] = useState<MedidainterfaceResponse[]>([]);
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
  const contextValue: MedidaContextType = {
    loading,
    medidas,
    getMedidas,
  };
  return (
    <MedidaContext.Provider value={contextValue}>
      {children}
    </MedidaContext.Provider>
  );
};
