import api from "../../utils/api";
import { urls } from "../../utils/urls";
import type {
  CreateEntregaInterface,
  UpdateEntregaInterface,
} from "../interface/entrega.interface";
import {
  buildPaginationQuery,
  type PaginatedResponse,
  type PaginationParams,
} from "../../shared/pagination";

const entregaGetAll = async () => {
  const response = await api.get(urls.Entrega);
  return response.data;
};
const entregaGetById = async (id: number) => {
  const response = await api.get(`${urls.Entrega}${id}`);
  return response.data;
};

const createEntrega = async (data: CreateEntregaInterface) => {
  const response = await api.post(urls.Entrega, data);
  return response.data;
};

const updateEntrega = async (id: number, data: UpdateEntregaInterface) => {
  const response = await api.put(`${urls.Entrega}${id}`, data);
  return response.data;
};

const deleteEntrega = async (id: number) => {
  await api.delete(`${urls.Entrega}${id}`);
};

const getPaginatedEntregasApi = async (
  params: PaginationParams
): Promise<PaginatedResponse<any>> => {
  const queryString = buildPaginationQuery(params);

  const response = await api.get(`${urls.EntregaPagination}?${queryString}`);
  return response.data;
};

export const EntregaService = {
  entregaGetAll,
  getPaginatedEntregasApi,
  entregaGetById,
  createEntrega,
  updateEntrega,
  deleteEntrega,
};
