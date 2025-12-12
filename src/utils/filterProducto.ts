import type { ProductoResponseInterface } from "../admin/interface/producto.interface";

export interface ProductoFilter {
  tipoProductoId?: number;
  medidaId?: number;
}

export function filtrarProductos(
  productos: ProductoResponseInterface[],
  filtro: ProductoFilter
) {
  return productos.filter((p) => {
    const coincideTipo =
      !filtro.tipoProductoId || p.tipoProductoId === filtro.tipoProductoId;

    const coincideMedida = !filtro.medidaId || p.medidaId === filtro.medidaId;

    return coincideTipo && coincideMedida;
  });
}
