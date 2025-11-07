import type {
  ClientesPaginatedResponse,
  CreateClienteInterface,
  UpdateClienteInterface,
} from "../interface/cliente.interface";
import api from "../../utils/api";
import { urls } from "../../utils/urls";
import type { GetPaginated } from "../interface/pagination.interface";
import { buildCleanPaginatedParams } from "../../utils/buildCleanPaginatedParams";
import qs from "qs";

const clienteGetAll = async () => {
  const response = await api.get(urls.Cliente);
  return response.data;
};
const createCliente = async (data: CreateClienteInterface) => {
  const response = await api.post(urls.Cliente, data);
  return response.data;
};
const updateCliente = async (data: UpdateClienteInterface) => {
  const response = await api.put(`${urls.Cliente}${data.id}`, data);
  return response.data;
};
const deleteCliente = async (id: number) => {
  await api.delete(`${urls.Cliente}${id}`);
};
const restoreCliente = async (id: number): Promise<void> => {
  await api.patch(`${urls.Cliente}${id}`);
};

const getPaginatedClientesApi = async (
  params: GetPaginated
): Promise<ClientesPaginatedResponse> => {
  const cleanParams = {
    ...buildCleanPaginatedParams(params),
    filters: params.filters?.join(","),
    filtersValues: params.filtersValues?.join(","),
  };
  const response = await api.get(urls.ClientePagination, {
    params: cleanParams,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};
export const ClienteService = {
  clienteGetAll,
  createCliente,
  updateCliente,
  deleteCliente,
  restoreCliente,
  getPaginatedClientesApi,
};
