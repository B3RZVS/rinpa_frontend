import { motion } from "framer-motion";
import { FaGasPump, FaCalendarAlt } from "react-icons/fa";
import styles from "./PrecioActualCard.module.css";
import type { PrecioNaftaInterfaceResponse } from "../../../interface/precioNafta.interface";

interface PrecioActualCardProps {
  precio: PrecioNaftaInterfaceResponse;
}

const PrecioActualCard = ({ precio }: PrecioActualCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
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

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.badge}>
        <span>Precio Actual</span>
      </div>

      <div className={styles.iconContainer}>
        <FaGasPump className={styles.icon} />
      </div>

      <div className={styles.precioContainer}>
        <span className={styles.precioLabel}>Precio por litro</span>
        <span className={styles.precio}>{formatPrecio(precio.precio)}</span>
      </div>

      <div className={styles.fechaContainer}>
        <FaCalendarAlt className={styles.calendarIcon} />
        <div className={styles.fechaInfo}>
          <span className={styles.fechaLabel}>Vigente desde</span>
          <span className={styles.fecha}>{formatDate(precio.fechaInicio)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PrecioActualCard;
