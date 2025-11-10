import { urls } from "../../utils/urls";
import api from "../../utils/api";
import type { getEstadistica } from "../interface/estadisticas.interface";

const getEstaditicaReporteGeneral = async (data: getEstadistica) => {
  const reponse = await api.post(urls.ReporteGeneral, data);
  return reponse.data;
};
const getEstaditicaReporteEntregas = async (data: getEstadistica) => {
  const reponse = await api.post(urls.ReporteEntrega, data);
  return reponse.data;
};
const getEstaditicaReporteClientes = async (data: getEstadistica) => {
  const reponse = await api.post(urls.ReporteCliente, data);
  return reponse.data;
};
const getEstaditicaEstadisticasHome = async () => {
  const reponse = await api.get(urls.EstadisticasHome);
  return reponse.data;
};

export const EstadisticasService = {
  getEstaditicaReporteClientes,
  getEstaditicaReporteEntregas,
  getEstaditicaReporteGeneral,
  getEstaditicaEstadisticasHome,
};
