export interface PrecioNaftaInterfaceResponse {
  id: number;
  precio: number;
  fechaInicio: Date;
  fechaFin: Date | null;
}
export interface CreatePrecioNaftaInterface {
  precio: number;
}
