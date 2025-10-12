import { useContext } from "react";
import { ProductoContext } from "../../contexts/productoContext/ProductoContext";

export const useProducto = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error("useProducto must be used within a ProductoProvider");
  }
  return context;
};
