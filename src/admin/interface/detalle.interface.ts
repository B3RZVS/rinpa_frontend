import type { ProductoResponseInterface } from "./producto.interface";

export interface DetalleProductoInterfaceResponse {
  id: number;
  producto: ProductoResponseInterface;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
}
export interface CreateDetalleProductoInterface {
  cantidad: number;
  precioUnitario: number;
  productoId: number;
}
