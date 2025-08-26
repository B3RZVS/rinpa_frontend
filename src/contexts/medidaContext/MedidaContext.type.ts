import type { MedidainterfaceResponse } from "../../interface/medida.interface";
import type { UnidadInterfaceResponse } from "../../interface/unidad.interface";
export interface MedidaContextType {
  loading: boolean;
  unidades: UnidadInterfaceResponse[];
  medidas: MedidainterfaceResponse[];
  getMedidas: () => void;
  getUnidades: () => void;
}
