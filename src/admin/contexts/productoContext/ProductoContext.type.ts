import type {
  CreateProductoInterface,
  ProductoResponseInterface,
  UpdateProductoInterface,
} from "../../interface/producto.interface";

export interface ProductoContextType {
  loading: boolean;
  productos: ProductoResponseInterface[];
  getProductos: () => void;
  registerProducto: (data: CreateProductoInterface) => Promise<void>;
  updateProducto: (data: UpdateProductoInterface) => Promise<void>;
  deleteProducto: (id: number) => Promise<void>;
}
