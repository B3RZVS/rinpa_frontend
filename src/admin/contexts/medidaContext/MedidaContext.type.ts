import type {
  CreateMedidaInterface,
  MedidainterfaceResponse,
  UpdateMedidaInterface,
} from "../../interface/medida.interface";
import type { UnidadInterfaceResponse } from "../../interface/unidad.interface";

export interface MedidaContextType {
  loading: boolean;
  unidades: UnidadInterfaceResponse[];
  medidas: MedidainterfaceResponse[];
  getMedidas: () => void;
  getUnidades: () => void;
  registerMedida: (data: CreateMedidaInterface) => Promise<void>;
  updateMedida: (data: UpdateMedidaInterface) => Promise<void>;
  deleteMedida: (id: number) => Promise<void>;
}
