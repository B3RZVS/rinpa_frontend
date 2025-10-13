import api from "../../utils/api";
import { urls } from "../../utils/urls";
import type {
  CreateEntregaInterface,
  UpdateEntregaInterface,
} from "../interface/entrega.interface";

const entregaGetAll = async () => {
  const response = await api.get(urls.Entrega);
  return response.data;
};

const createEntrega = async (data: CreateEntregaInterface) => {
  const response = await api.post(urls.Entrega, data);
  return response.data;
};

const updateEntrega = async (data: UpdateEntregaInterface) => {
  const response = await api.put(urls.Entrega, data);
  return response.data;
};

const deleteEntrega = async (id: number) => {
  await api.delete(`${urls.Entrega}${id}`);
};

export const EntregaService = {
  entregaGetAll,
  createEntrega,
  updateEntrega,
  deleteEntrega,
};
