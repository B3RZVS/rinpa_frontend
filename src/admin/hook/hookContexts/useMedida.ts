import { useContext } from "react";
import { MedidaContext } from "../../contexts/medidaContext/MedidaContext";

export const useMedida = () => {
  const context = useContext(MedidaContext);
  if (!context) {
    throw new Error("useMedida must be used within a MedidaProvider");
  }
  return context;
};
