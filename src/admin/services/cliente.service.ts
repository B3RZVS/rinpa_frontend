import type {
  CreateClienteInterface,
  UpdateClienteInterface,
} from "../interface/cliente.interface";
import api from "../../utils/api";
import { urls } from "../../utils/urls";

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

export const ClienteService = {
  clienteGetAll,
  createCliente,
  updateCliente,
  deleteCliente,
  restoreCliente,
};
