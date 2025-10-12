import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";
import styles from "./HistorialPrecios.module.css";
import type { PrecioNaftaInterfaceResponse } from "../../../interface/precioNafta.interface";

interface HistorialPreciosProps {
  precios: PrecioNaftaInterfaceResponse[];
}

const HistorialPrecios = ({ precios }: HistorialPreciosProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(precio);
  };

  const calcularDiferencia = (index: number) => {
    if (index === precios.length - 1) return null;
    const actual = precios[index].precio;
    const anterior = precios[index + 1].precio;
    const diferencia = ((actual - anterior) / anterior) * 100;
    return diferencia;
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className={styles.header}>
        <FaHistory className={styles.headerIcon} />
        <h3 className={styles.title}>Historial de Precios</h3>
      </div>

      <div className={styles.list}>
        {precios.map((precio, index) => {
          const diferencia = calcularDiferencia(index);

          return (
            <motion.div
              key={precio.id}
              className={styles.item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={styles.itemContent}>
                <div className={styles.precioInfo}>
                  <span className={styles.precio}>
                    {formatPrecio(precio.precio)}
                  </span>
                  {diferencia !== null && (
                    <span
                      className={`${styles.diferencia} ${
                        diferencia > 0 ? styles.aumento : styles.disminucion
                      }`}
                    >
                      {diferencia > 0 ? "+" : ""}
                      {diferencia.toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className={styles.fechas}>
                  <span className={styles.fecha}>
                    {formatDate(precio.fechaInicio)}
                  </span>
                  <span className={styles.separator}>→</span>
                  <span className={styles.fecha}>
                    {precio.fechaFin ? formatDate(precio.fechaFin) : "Actual"}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HistorialPrecios;
