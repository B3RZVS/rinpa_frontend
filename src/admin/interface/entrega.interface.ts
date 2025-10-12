import type {
  CreateDetalleProductoInterface,
  DetalleProductoInterfaceResponse,
} from "./detalle.interface";

export interface EntregaInterfaceResponse {
  id: number;
  clienteId: number;
  clienteNombre: string;
  usuarioId: number;
  usuarioNombre: string;
  fecha: Date;
  precioNafta: number;
  litrosGastados: number;
  consumoTotal: number;
  detalles: DetalleProductoInterfaceResponse[];
}
export interface CreateEntregaInterface {
  clienteId: number;
  usuarioId: number;
  precioNaftaId: number;
  litrosGastados: number;
  fecha: Date;
  detalles: CreateDetalleProductoInterface[];
}
export interface UpdateEntregaInterface {
  clienteId: number;
  precioNafta: number;
  litrosGastados: number;
  fecha: Date;
}
