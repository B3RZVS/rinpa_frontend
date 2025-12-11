import type {
  PaginatedResponse,
  PaginationParams,
} from "../../../shared/pagination";
import type {
  CreateEntregaInterface,
  EntregaInterfaceResponse,
  UpdateEntregaInterface,
} from "../../interface/entrega.interface";

export interface EntregaContextType {
  loading: boolean;
  entregas: EntregaInterfaceResponse[];
  meta: PaginatedResponse<EntregaInterfaceResponse>["meta"] | null;
  entregasPaginated: EntregaInterfaceResponse[];
  entrega: EntregaInterfaceResponse | null;
  getEntregas: () => void;
  getPaginatedEntregas: (params: PaginationParams) => Promise<void>;
  getEntregaById: (id: number) => void;
  registerEntrega: (data: CreateEntregaInterface) => Promise<void>;
  updateEntrega: (id: number, data: UpdateEntregaInterface) => Promise<void>;
  deleteEntrega: (id: number) => Promise<void>;
}
