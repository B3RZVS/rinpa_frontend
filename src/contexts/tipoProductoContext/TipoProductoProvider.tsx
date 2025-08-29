import { useState, type ReactNode } from "react";
import { TipoProductoContext } from "./TipoProductoContext";
import type { TipoProductoContextType } from "./TipoProductoContext.type";
import type {
  CreateTipoProductoInterface,
  TipoProductoInterfaceResponse,
  UpdateTipoProductoInterfece,
} from "../../interface/tipoProducto.interface";
import { TipoProductoService } from "../../services/tipoProducto.service";
import { useToaster } from "../../hook/hookUI/useToaster";
import { AxiosError } from "axios";

interface TipoProductoProviderProps {
  children: ReactNode;
}

export const TipoProductoProvider: React.FC<TipoProductoProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tipoProductos, setTipoProducto] = useState<
    TipoProductoInterfaceResponse[]
  >([]);
  const { showToast } = useToaster();

  const getTipoProductos = async () => {
    setLoading(true);
    try {
      const response = await TipoProductoService.tipoProductoGetAll();
      setTipoProducto(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener los tipo productos.",
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerTipoProducto = async (data: CreateTipoProductoInterface) => {
    setLoading(true);
    try {
      await TipoProductoService.createTipoProducto(data);
      await getTipoProductos();
      showToast({
        title: "Tipo producto registrada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.error(error);
      showToast({
        title: `Error: ${
          error.response?.data?.message || "al crear tipo producto."
        }`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTipoProducto = async (data: UpdateTipoProductoInterfece) => {
    setLoading(true);
    try {
      await TipoProductoService.updateTipoProducto(data);
      await getTipoProductos();
      showToast({
        title: "Tipo Producto modificada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.error(error);
      showToast({
        title: `Error: ${
          error.response?.data?.message || "al actualizar el tipo producto."
        }`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTipoProducto = async (id: number) => {
    setLoading(true);
    try {
      await TipoProductoService.deleteTipoProducto(id);
      await getTipoProductos();
      showToast({
        title: "Tipo producto eliminado con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al eliminar el Tipo producto.",
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const contextValue: TipoProductoContextType = {
    loading,
    tipoProductos,
    getTipoProductos,
    registerTipoProducto,
    updateTipoProducto,
    deleteTipoProducto,
  };

  return (
    <TipoProductoContext.Provider value={contextValue}>
      {children}
    </TipoProductoContext.Provider>
  );
};
