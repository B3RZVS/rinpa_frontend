import { useState, type ReactNode } from "react";
import { ProductoContext } from "./ProductoContext";
import type { ProductoContextType } from "./ProductoContext.type";
import type {
  CreateProductoInterface,
  ProductoResponseInterface,
  UpdateProductoInterface,
} from "../../interface/producto.interface";
import { ProductoService } from "../../services/producto.service";
import { useToaster } from "../../../shared/hooks/useToaster";
import { AxiosError } from "axios";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

interface ProductoProviderProps {
  children: ReactNode;
}

export const ProductoProvider: React.FC<ProductoProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [productos, setProducto] = useState<ProductoResponseInterface[]>([]);

  const getProductos = async () => {
    setLoading(true);
    try {
      const response = await ProductoService.productoGetAll();
      setProducto(response);
    } catch (error) {
      handleApiError(error, "Error al obtener los  productos.");
    } finally {
      setLoading(false);
    }
  };

  const registerProducto = async (data: CreateProductoInterface) => {
    setLoading(true);
    try {
      await ProductoService.createProducto(data);
      await getProductos();
      showToast({
        title: "Producto registrada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.log(error);
      handleApiError(error, "Error al registrar el producto");
    } finally {
      setLoading(false);
    }
  };

  const updateProducto = async (data: UpdateProductoInterface) => {
    setLoading(true);
    try {
      await ProductoService.updateProducto(data);
      await getProductos();
      showToast({
        title: " Producto modificada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProducto = async (id: number) => {
    setLoading(true);
    try {
      await ProductoService.deleteProducto(id);
      await getProductos();
      showToast({
        title: "Producto eliminado con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      handleApiError(error, "Error");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: ProductoContextType = {
    loading,
    productos,
    getProductos,
    registerProducto,
    updateProducto,
    deleteProducto,
  };

  return (
    <ProductoContext.Provider value={contextValue}>
      {children}
    </ProductoContext.Provider>
  );
};
