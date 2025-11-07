import type { CreateDetalleProductoInterface } from "../../interface/detalle.interface";

export interface DetalleEntregaContextType {
  loading: boolean;
  registerDetalleEntrega: (
    data: CreateDetalleProductoInterface,
    idEntrega: number
  ) => Promise<void>;
  updateDetalleEntrega: (id: number, cantidad: number) => Promise<void>;
  deleteDetalleEntrega: (id: number) => Promise<void>;
}
