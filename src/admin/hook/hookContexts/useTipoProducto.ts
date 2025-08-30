import { useContext } from "react";
import { TipoProductoContext } from "../../contexts/tipoProductoContext/TipoProductoContext";

export const useTipoProducto = () => {
  const context = useContext(TipoProductoContext);
  if (!context) {
    throw new Error("useTipoProducto must be used within a TipoProductoProvider");
  }
  return context;
};
