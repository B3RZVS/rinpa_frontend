import type {
  CreateEntregaInterface,
  EntregaInterfaceResponse,
  UpdateEntregaInterface,
} from "../../interface/entrega.interface";
import type {
  GetPaginated,
  PaginatedData,
} from "../../interface/pagination.interface";

export interface EntregaContextType {
  loading: boolean;
  entregas: EntregaInterfaceResponse[];
  entregasPaginated: PaginatedData<EntregaInterfaceResponse> | null;
  entrega: EntregaInterfaceResponse | null;
  getEntregas: () => void;
  getPaginatedEntregas: (params: GetPaginated) => Promise<void>;
  getEntregaById: (id: number) => void;
  registerEntrega: (data: CreateEntregaInterface) => Promise<void>;
  updateEntrega: (id: number, data: UpdateEntregaInterface) => Promise<void>;
  deleteEntrega: (id: number) => Promise<void>;
}
