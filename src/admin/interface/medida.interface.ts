export interface MedidainterfaceResponse {
  id: number;
  cantidad: string;
  unidadSimbolo: string;
  unidadId: number;
}

export interface CreateMedidaInterface {
  cantidad: number | null;
  unidadId: number | null;
}

export interface UpdateMedidaInterface {
  id: number;
  cantidad: number | null;
  unidadId: number | null;
}
