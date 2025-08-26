import type { MedidainterfaceResponse } from "../../interface/medida.interface";

export interface MedidaContextType {
  loading: boolean;
  medidas: MedidainterfaceResponse[];
  getMedidas: () => void;
}
