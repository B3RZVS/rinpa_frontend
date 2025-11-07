export interface CreateProductoInterface {
  precio: number;
  descripcion: string;
  tipoProductoId: number;
  medidaId: number;
}
export interface UpdateProductoInterface {
  id: number;
  precio?: number;
  descripcion?: string;
  tipoProductoId?: number;
  medidaId?: number;
}
export interface ProductoResponseInterface {
  id: number;
  precio: number;
  descripcion: string;
  tipoProducto: string;
  tipoProductoId: number;
  medida: string;
  medidaId: number;
}
