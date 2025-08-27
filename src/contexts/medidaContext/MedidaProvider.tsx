import { useState, type ReactNode } from "react";
import { MedidaContext } from "./MedidaContext";
import type { MedidaContextType } from "./MedidaContext.type";
import type {
  CreateMedidaInterface,
  MedidainterfaceResponse,
  UpdateMedidaInterfece,
} from "../../interface/medida.interface";
import { MedidaService } from "../../services/medida.service";
import { useToaster } from "../../hook/hookUI/useToaster";
import type { UnidadInterfaceResponse } from "../../interface/unidad.interface";
import { UnidadService } from "../../services/unidad.service";
import { AxiosError } from "axios";

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
  const registerMedida = async (data: CreateMedidaInterface) => {
    setLoading(true);
    try {
      await MedidaService.createMedida(data);
      await getMedidas();
      showToast({
        title: "Medida registrada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.error(error);
      showToast({
        title: `Error: ${
          error.response?.data?.message || "al crear la medida."
        }`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMedida = async (data: UpdateMedidaInterfece) => {
    setLoading(true);
    try {
      await MedidaService.updateMedida(data);
      await getMedidas();
      showToast({
        title: "Medida modificada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.error(error);
      showToast({
        title: `Error: ${
          error.response?.data?.message || "al actualizar la medida."
        }`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteMedida = async (id: number) => {
    setLoading(true);
    try {
      await MedidaService.deleteMedida(id);
      await getMedidas();
      showToast({
        title: "Medida eliminada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al eliminar la medida.",
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
    registerMedida,
    deleteMedida,
    updateMedida,
  };
  return (
    <MedidaContext.Provider value={contextValue}>
      {children}
    </MedidaContext.Provider>
  );
};
