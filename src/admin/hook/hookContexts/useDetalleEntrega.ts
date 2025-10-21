import { useContext } from "react";
import { DetalleEntregaContext } from "../../contexts/detalleEntregaContext/DetalleEntregaContext";

export const useDetalleEntrega = () => {
  const context = useContext(DetalleEntregaContext);
  if (!context) {
    throw new Error(
      "useDetalleEntrega must be used within a DetalleEntregaProvider"
    );
  }
  return context;
};
