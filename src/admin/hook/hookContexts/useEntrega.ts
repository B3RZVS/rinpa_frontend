import { useContext } from "react";
import { EntregaContext } from "../../contexts/entregaContext/EntregaContext";

export const useEntrega = () => {
  const context = useContext(EntregaContext);
  if (!context) {
    throw new Error("useEntrega must be used within a EntregaProvider");
  }
  return context;
};
