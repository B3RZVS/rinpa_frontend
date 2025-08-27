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

export interface UpdateMedidaInterfece {
  id: number;
  cantidad: number | null;
  unidadId: number | null;
}
