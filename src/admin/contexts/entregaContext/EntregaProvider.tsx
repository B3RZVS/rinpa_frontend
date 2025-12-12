import { useCallback, useState, type ReactNode } from "react";
import { EntregaContext } from "./EntregaContext";
import type { EntregaContextType } from "./EntregaContext.type";
import { useToaster } from "../../../shared/hooks/useToaster";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type {
  CreateEntregaInterface,
  EntregaInterfaceResponse,
  UpdateEntregaInterface,
} from "../../interface/entrega.interface";
import { EntregaService } from "../../services/entrega.service";

import type {
  PaginatedResponse,
  PaginationParams,
} from "../../../shared/pagination";

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
  const [meta, setMeta] = useState<
    PaginatedResponse<EntregaInterfaceResponse>["meta"] | null
  >(null);
  const [entrega, setEntrega] = useState<EntregaInterfaceResponse | null>(null);
  const [entregasPaginated, setEntregaPaginated] = useState<
    EntregaInterfaceResponse[]
  >([]);

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
      // await getEntregas();
      showToast({
        title: "Entrega registrada con éxito.",
        type: "success",
      });
    } catch (error) {
      handleApiError(error, "Error al registrar la Entrega");
    } finally {
      setLoading(false);
    }
  };

  const updateEntrega = async (id: number, data: UpdateEntregaInterface) => {
    setLoading(true);
    try {
      await EntregaService.updateEntrega(id, data);
      // await getEntregas();
      showToast({
        title: "Entrega modificada con éxito.",
        type: "success",
      });
    } catch (error) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteEntrega = async (id: number) => {
    setLoading(true);
    try {
      await EntregaService.deleteEntrega(id);
      // await getEntregas();
      showToast({
        title: "Entrega eliminado con éxito.",
        type: "success",
      });
    } catch (error) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedEntregas = useCallback(
    async (params: PaginationParams): Promise<void> => {
      setLoading(true);
      try {
        const response = await EntregaService.getPaginatedEntregasApi(params);

        setEntregaPaginated(response.data);
        setMeta(response.meta);
      } catch (error) {
        handleApiError(error, "Error al obtener las entregas");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const contextValue: EntregaContextType = {
    loading,
    deleteEntrega,
    entregas,
    meta,
    entregasPaginated,
    entrega,
    getEntregas,
    getEntregaById,
    registerEntrega,
    updateEntrega,
    getPaginatedEntregas,
  };

  return (
    <EntregaContext.Provider value={contextValue}>
      {children}
    </EntregaContext.Provider>
  );
};
