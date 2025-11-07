import type {
  CreateClienteInterface,
  ClienteInterfaceResponse,
  UpdateClienteInterface,
} from "../../interface/cliente.interface";
import type {
  GetPaginated,
  PaginatedData,
} from "../../interface/pagination.interface";

export interface ClienteContextType {
  loading: boolean;
  clientes: ClienteInterfaceResponse[];
  clientesPaginated: PaginatedData<ClienteInterfaceResponse> | null;
  getClientes: () => void;
  getPaginatedClientes: (params: GetPaginated) => Promise<void>;
  registerCliente: (data: CreateClienteInterface) => Promise<void>;
  updateCliente: (data: UpdateClienteInterface) => Promise<void>;
  deleteCliente: (id: number) => Promise<void>;
}
