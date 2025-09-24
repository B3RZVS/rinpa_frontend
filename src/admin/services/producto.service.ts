import type {
  CreateProductoInterface,
  UpdateProductoInterface,
} from "../interface/producto.interface";
import api from "../../utils/api";
import { urls } from "../../utils/urls";

const productoGetAll = async () => {
  const response = await api.get(urls.Producto);
  return response.data;
};

const createProducto = async (data: CreateProductoInterface) => {
  const response = await api.post(urls.Producto, data);
  return response.data;
};

const updateProducto = async (data: UpdateProductoInterface) => {
  const response = await api.put(urls.Producto, data);
  return response.data;
};

const deleteProducto = async (id: number) => {
  await api.delete(`${urls.Producto}${id}`);
};

export const ProductoService = {
  productoGetAll,
  createProducto,
  updateProducto,
  deleteProducto,
};
