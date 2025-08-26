import api from "../utils/api";
import { urls } from "../utils/urls";

const unidadGetAll = async () => {
  try {
    const response = await api.get(urls.Unidad);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("al obtener las unidades:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const UnidadService = {
  unidadGetAll,
};
