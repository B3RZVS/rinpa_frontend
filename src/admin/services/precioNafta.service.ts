import type { CreatePrecioNaftaInterface } from "../interface/precioNafta.interface";
import api from "../../utils/api";
import { urls } from "../../utils/urls";

const precioNaftaGetAll = async () => {
  try {
    const response = await api.get(urls.PrecioNafta);
    return response.data;
  } catch (error) {
    console.error("al obtener los precio de la nafta", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const createPrecioNafta = async (data: CreatePrecioNaftaInterface) => {
  try {
    const response = await api.post(urls.PrecioNafta, data);
    return response.data;
  } catch (error) {
    console.error("al crear el precio de nafta", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
export const PrecioNaftaService = {
  precioNaftaGetAll,
  createPrecioNafta,
};
