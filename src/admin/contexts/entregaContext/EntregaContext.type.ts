import type {
  CreateEntregaInterface,
  EntregaInterfaceResponse,
  UpdateEntregaInterface,
} from "../../interface/entrega.interface";

export interface EntregaContextType {
  loading: boolean;
  entregas: EntregaInterfaceResponse[];
  getEntregas: () => void;
  registerEntrega: (data: CreateEntregaInterface) => Promise<void>;
  updateEntrega: (data: UpdateEntregaInterface) => Promise<void>;
  deleteEntrega: (id: number) => Promise<void>;
}
