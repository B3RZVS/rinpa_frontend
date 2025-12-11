// useFiltroProductos.ts
import { useMemo, useState } from "react";
import type { ProductoResponseInterface } from "../../interface/producto.interface";
import type { TipoProductoInterfaceResponse } from "../../interface/tipoProducto.interface";
import type { MedidainterfaceResponse } from "../../interface/medida.interface";
import {
  filtrarProductos,
  type ProductoFilter,
} from "../../../utils/filterProducto";

interface Props {
  productos: ProductoResponseInterface[];
  tipos: TipoProductoInterfaceResponse[];
  medidas: MedidainterfaceResponse[];
}

export function useFiltroProductos({ productos, tipos, medidas }: Props) {
  const [filtro, setFiltro] = useState<ProductoFilter>({});

  const productosFiltrados = useMemo(
    () => filtrarProductos(productos, filtro),
    [productos, filtro]
  );

  const handleTipoChange = (id: number | "") => {
    setFiltro((prev) => ({
      ...prev,
      tipoProductoId: id === "" ? undefined : id,
    }));
  };

  const handleMedidaChange = (id: number | "") => {
    setFiltro((prev) => ({
      ...prev,
      medidaId: id === "" ? undefined : id,
    }));
  };

  return {
    productosFiltrados,
    filtro,
    tipos,
    medidas,
    handleTipoChange,
    handleMedidaChange,
  };
}
