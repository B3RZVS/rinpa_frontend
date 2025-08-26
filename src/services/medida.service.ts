import api from "../utils/api";
import { urls } from "../utils/urls";

const medidaGetAll = async () => {
  try {
    const response = await api.get(urls.Medida);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error en LogIn:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const MedidaService = {
  medidaGetAll,
};
