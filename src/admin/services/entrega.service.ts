import api from "../../utils/api";
import { buildCleanPaginatedParams } from "../../utils/buildCleanPaginatedParams";
import { urls } from "../../utils/urls";
import type {
  CreateEntregaInterface,
  EntregasPaginatedResponse,
  UpdateEntregaInterface,
} from "../interface/entrega.interface";
import qs from "qs";
import type { GetPaginated } from "../interface/pagination.interface";

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
  params: GetPaginated
): Promise<EntregasPaginatedResponse> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.EntregaPagination, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
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
