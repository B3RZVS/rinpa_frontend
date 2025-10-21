import { useState, type ReactNode } from "react";
import { EntregaContext } from "./EntregaContext";
import type { EntregaContextType } from "./EntregaContext.type";
import { useToaster } from "../../../shared/hooks/useToaster";
import { AxiosError } from "axios";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type {
  CreateEntregaInterface,
  EntregaInterfaceResponse,
  UpdateEntregaInterface,
} from "../../interface/entrega.interface";
import { EntregaService } from "../../services/entrega.service";

interface EntregaProviderProps {
  children: ReactNode;
}

export const EntregaProvider: React.FC<EntregaProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [entregas, setEntregas] = useState<EntregaInterfaceResponse[]>([]);
  const [entrega, setEntrega] = useState<EntregaInterfaceResponse | null>(null);

  const getEntregas = async () => {
    setLoading(true);
    try {
      const response = await EntregaService.entregaGetAll();
      setEntregas(response);
    } catch (error) {
      handleApiError(error, "Error al obtener las Entregas.");
    } finally {
      setLoading(false);
    }
  };
  const getEntregaById = async (id: number) => {
    setLoading(true);
    try {
      const response = await EntregaService.entregaGetById(id);
      setEntrega(response);
    } catch (error) {
      handleApiError(error, "Error al obtener las Entrega.");
    } finally {
      setLoading(false);
    }
  };

  const registerEntrega = async (data: CreateEntregaInterface) => {
    setLoading(true);
    try {
      await EntregaService.createEntrega(data);
      await getEntregas();
      showToast({
        title: "Entrega registrada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.log(error);
      handleApiError(error, "Error al registrar la Entrega");
    } finally {
      setLoading(false);
    }
  };

  const updateEntrega = async (id: number, data: UpdateEntregaInterface) => {
    setLoading(true);
    try {
      await EntregaService.updateEntrega(id, data);
      await getEntregas();
      showToast({
        title: "Entrega modificada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteEntrega = async (id: number) => {
    setLoading(true);
    try {
      await EntregaService.deleteEntrega(id);
      await getEntregas();
      showToast({
        title: "Entrega eliminado con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: EntregaContextType = {
    loading,
    deleteEntrega,
    entregas,
    entrega,
    getEntregas,
    getEntregaById,
    registerEntrega,
    updateEntrega,
  };

  return (
    <EntregaContext.Provider value={contextValue}>
      {children}
    </EntregaContext.Provider>
  );
};
