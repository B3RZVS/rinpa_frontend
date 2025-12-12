import { useState, type ReactNode } from "react";
import { PrecioNaftaContext } from "./PrecioNaftaContext";
import type { PrecioNaftaContextType } from "./PrecioNaftaContext.type";

import { useToaster } from "../../../shared/hooks/useToaster";
import { AxiosError } from "axios";
import type {
  CreatePrecioNaftaInterface,
  PrecioNaftaInterfaceResponse,
} from "../../interface/precioNafta.interface";
import { PrecioNaftaService } from "../../services/precioNafta.service";

interface PrecioNaftaProviderProps {
  children: ReactNode;
}

export const PrecioNaftaProvider: React.FC<PrecioNaftaProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [preciosNafta, setPreciosNafta] = useState<
    PrecioNaftaInterfaceResponse[]
  >([]);
  const { showToast } = useToaster();

  const getPreciosNafta = async () => {
    setLoading(true);
    try {
      const response = await PrecioNaftaService.precioNaftaGetAll();
      setPreciosNafta(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener los precios de nafta.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerPrecioNafta = async (data: CreatePrecioNaftaInterface) => {
    setLoading(true);
    try {
      await PrecioNaftaService.createPrecioNafta(data);

      showToast({
        title: "Precio de nafta registrado con éxito.",
        type: "success",
      });
    } catch (error: AxiosError | any) {
      console.error(error);
      showToast({
        title: `Error: ${
          error.response?.data?.message || "al crear el precio de nafta."
        }`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const contextValue: PrecioNaftaContextType = {
    loading,
    getPreciosNafta,
    preciosNafta,
    registerPrecioNafta,
  };

  return (
    <PrecioNaftaContext.Provider value={contextValue}>
      {children}
    </PrecioNaftaContext.Provider>
  );
};
