import { useContext } from "react";
import { PrecioNaftaContext } from "../../contexts/precioNaftaContext/PrecioNaftaContext";

export const usePrecioNafta = () => {
  const context = useContext(PrecioNaftaContext);
  if (!context) {
    throw new Error("usePrecioNafta must be used within a PrecioNaftaProvider");
  }
  return context;
};
