export interface ClienteInterfaceResponse {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  descripcion: string | null;
  direccion: string;
}

export interface CreateClienteInterface {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  descripcion?: string | null;
  direccion: string;
}
export interface UpdateClienteInterface {
  id: number;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  email?: string;
  descripcion?: string | null;
  direccion?: string;
}
