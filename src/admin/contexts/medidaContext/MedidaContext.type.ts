import type {
  CreateMedidaInterface,
  MedidainterfaceResponse,
  UpdateMedidaInterfece,
} from "../../interface/medida.interface";
import type { UnidadInterfaceResponse } from "../../interface/unidad.interface";

export interface MedidaContextType {
  loading: boolean;
  unidades: UnidadInterfaceResponse[];
  medidas: MedidainterfaceResponse[];
  getMedidas: () => void;
  getUnidades: () => void;
  registerMedida: (data: CreateMedidaInterface) => Promise<void>;
  updateMedida: (data: UpdateMedidaInterfece) => Promise<void>;
  deleteMedida: (id: number) => Promise<void>;
}
