import { useEffect } from "react";
import { useFiltroProductos } from "../../../hook/hookUI/useFilterProducto";
import styles from "./FiltroProducto.module.css";
interface Props {
  productos: any[];
  tipos: any[];
  medidas: any[];
  onFiltrar: (items: any[]) => void;
}

export const FiltroProductos: React.FC<Props> = ({
  productos,
  tipos,
  medidas,
  onFiltrar,
}) => {
  const { productosFiltrados, filtro, handleTipoChange, handleMedidaChange } =
    useFiltroProductos({ productos, tipos, medidas });

  // Notificamos arriba cuando algo cambia
  useEffect(() => {
    onFiltrar(productosFiltrados);
  }, [productosFiltrados]);

  return (
    <div className={styles.container}>
      {/* Filtro por Tipo */}
      <select
        value={filtro.tipoProductoId ?? ""}
        onChange={(e) =>
          handleTipoChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className={styles.select}
      >
        <option value="">Todos los tipos</option>
        {tipos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nombre}
          </option>
        ))}
      </select>

      {/* Filtro por Medida */}
      <select
        value={filtro.medidaId ?? ""}
        onChange={(e) =>
          handleMedidaChange(
            e.target.value === "" ? "" : Number(e.target.value)
          )
        }
        className={styles.select}
      >
        <option value="">Todas las medidas</option>
        {medidas.map((m) => (
          <option key={m.id} value={m.id}>
            {m.cantidad} {m.unidadSimbolo}
          </option>
        ))}
      </select>
    </div>
  );
};
