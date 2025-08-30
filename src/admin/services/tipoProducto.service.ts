import type {
  CreateTipoProductoInterface,
  UpdateTipoProductoInterfece,
} from "../interface/tipoProducto.interface";
import api from "../../utils/api";
import { urls } from "../../utils/urls";

const tipoProductoGetAll = async () => {
  try {
    const response = await api.get(urls.TipoProducto);

    return response.data;
  } catch (error) {
    console.error("al obtener tipo producto", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const createTipoProducto = async (data: CreateTipoProductoInterface) => {
  try {
    const response = await api.post(urls.TipoProducto, data);

    return response.data;
  } catch (error) {
    console.error("al crear tipo producto", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const updateTipoProducto = async (data: UpdateTipoProductoInterfece) => {
  try {
    const response = await api.put(urls.TipoProducto, data);

    return response.data;
  } catch (error) {
    console.error("al modificar tipo producto", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const deleteTipoProducto = async (id: number) => {
  try {
    await api.delete(`${urls.TipoProducto}${id}`);
  } catch (error) {
    console.error("al crear tipo producto", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const TipoProductoService = {
  tipoProductoGetAll,
  createTipoProducto,
  updateTipoProducto,
  deleteTipoProducto,
};
