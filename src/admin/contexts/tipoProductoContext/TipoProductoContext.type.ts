import type {
  CreateTipoProductoInterface,
  TipoProductoInterfaceResponse,
  UpdateTipoProductoInterfece,
} from "../../interface/tipoProducto.interface";

export interface TipoProductoContextType {
  loading: boolean;
  tipoProductos: TipoProductoInterfaceResponse[];
  getTipoProductos: () => void;
  registerTipoProducto: (data: CreateTipoProductoInterface) => Promise<void>;
  updateTipoProducto: (data: UpdateTipoProductoInterfece) => Promise<void>;
  deleteTipoProducto: (id: number) => Promise<void>;
}
