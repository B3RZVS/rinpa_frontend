import type {
  CreateMedidaInterface,
  UpdateMedidaInterface,
} from "../interface/medida.interface";
import api from "../../utils/api";
import { urls } from "../../utils/urls";

const medidaGetAll = async () => {
  try {
    const response = await api.get(urls.Medida);

    return response.data;
  } catch (error) {
    console.error("al obtener las medidas", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const createMedida = async (data: CreateMedidaInterface) => {
  try {
    const response = await api.post(urls.Medida, data);

    return response.data;
  } catch (error) {
    console.error("al crear la medida", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const updateMedida = async (data: UpdateMedidaInterface) => {
  try {
    const response = await api.put(urls.Medida, data);

    return response.data;
  } catch (error) {
    console.error("al modificar la medida", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const deleteMedida = async (id: number) => {
  try {
    await api.delete(`${urls.Medida}${id}`);
  } catch (error) {
    console.error("al crear la medida", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const MedidaService = {
  medidaGetAll,
  createMedida,
  updateMedida,
  deleteMedida,
};
