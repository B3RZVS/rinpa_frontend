import { useState, type ReactNode } from "react";
import { useToaster } from "../../../shared/hooks/useToaster";
import { AxiosError } from "axios";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { DetalleEntregaService } from "../../services/detalleEntrega.service";
import type { CreateDetalleProductoInterface } from "../../interface/detalle.interface";
import type { DetalleEntregaContextType } from "./DetalleEntregaContext.type";
import { DetalleEntregaContext } from "./DetalleEntregaContext";
interface EntregaProviderProps {
  children: ReactNode;
}

export const DetalleEntregaProvider: React.FC<EntregaProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);

  const registerDetalleEntrega = async (
    data: CreateDetalleProductoInterface,
    idEntrega: number
  ) => {
    setLoading(true);
    try {
      await DetalleEntregaService.createDetalleEntrega(data, idEntrega);
      showToast({
        title: "Entrega registrada con éxito.",
        type: "success",
      });
    } catch (error: AxiosError | any) {
      console.log(error);
      handleApiError(error, "Error al registrar la Entrega");
    } finally {
      setLoading(false);
    }
  };

  const updateDetalleEntrega = async (id: number, cantidad: number) => {
    setLoading(true);
    try {
      await DetalleEntregaService.updateDetalleEntrega(id, cantidad);
      showToast({
        title: "Entrega modificada con éxito.",
        type: "success",
      });
    } catch (error: AxiosError | any) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteDetalleEntrega = async (id: number) => {
    setLoading(true);
    try {
      await DetalleEntregaService.deleteDetalleEntrega(id);
      showToast({
        title: "El detalle de la entrega ha sido eliminado con éxito.",
        type: "success",
      });
    } catch (error) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: DetalleEntregaContextType = {
    loading,
    registerDetalleEntrega,
    updateDetalleEntrega,
    deleteDetalleEntrega,
  };

  return (
    <DetalleEntregaContext.Provider value={contextValue}>
      {children}
    </DetalleEntregaContext.Provider>
  );
};
