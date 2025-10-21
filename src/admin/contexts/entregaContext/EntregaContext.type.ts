import type {
  CreateEntregaInterface,
  EntregaInterfaceResponse,
  UpdateEntregaInterface,
} from "../../interface/entrega.interface";

export interface EntregaContextType {
  loading: boolean;
  entregas: EntregaInterfaceResponse[];
  entrega: EntregaInterfaceResponse | null;
  getEntregas: () => void;
  getEntregaById: (id: number) => void;
  registerEntrega: (data: CreateEntregaInterface) => Promise<void>;
  updateEntrega: (id: number, data: UpdateEntregaInterface) => Promise<void>;
  deleteEntrega: (id: number) => Promise<void>;
}
