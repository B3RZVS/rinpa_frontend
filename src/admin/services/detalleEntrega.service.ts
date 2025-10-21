import api from "../../utils/api";
import { urls } from "../../utils/urls";
import type { CreateDetalleProductoInterface } from "../interface/detalle.interface";

const createDetalleEntrega = async (
  data: CreateDetalleProductoInterface,
  idEntrega: number
) => {
  const response = await api.post(`${urls.DetalleEntrega}${idEntrega}`, data);
  return response.data;
};

const updateDetalleEntrega = async (id: number, cantidad: number) => {
  const response = await api.put(`${urls.DetalleEntrega}${id}`, cantidad);
  return response.data;
};

const deleteDetalleEntrega = async (id: number) => {
  await api.delete(`${urls.DetalleEntrega}${id}`);
};

export const DetalleEntregaService = {
  createDetalleEntrega,
  updateDetalleEntrega,
  deleteDetalleEntrega,
};
