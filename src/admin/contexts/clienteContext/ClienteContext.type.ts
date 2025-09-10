import type {
  CreateClienteInterface,
  ClienteInterfaceResponse,
  UpdateClienteInterface,
} from "../../interface/cliente.interface";

export interface ClienteContextType {
  loading: boolean;
  clientes: ClienteInterfaceResponse[];
  getClientes: () => void;
  registerCliente: (data: CreateClienteInterface) => Promise<void>;
  updateCliente: (data: UpdateClienteInterface) => Promise<void>;
  deleteCliente: (id: number) => Promise<void>;
}
