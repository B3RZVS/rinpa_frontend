import { motion } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiTruck,
  FiEdit,
  FiChevronRight,
} from "react-icons/fi";

import styles from "./EntregaCard.module.css";
import type { EntregaInterfaceResponse } from "../../../interface/entrega.interface";

interface EntregaCardProps {
  entrega: EntregaInterfaceResponse;
  index: number;
  onEdit: (id: number) => void;
}

const EntregaCard: React.FC<EntregaCardProps> = ({
  entrega,
  index,
  onEdit,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalProductos = entrega.detalles.reduce(
    (sum, detalle) => sum + detalle.subTotal,
    0
  );

  const totalGeneral = totalProductos + entrega.consumoTotal;
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.clienteInfo}>
          <FiUser className={styles.icon} />
          <div>
            <h3>
              {entrega.clienteNombre} {entrega.clienteApellido}
            </h3>
            <span className={styles.entregaId}>Entrega #{entrega.id}</span>
          </div>
        </div>
        <button
          className={styles.editButton}
          onClick={() => onEdit(entrega.id)}
        >
          <FiEdit />
        </button>
      </div>

      {/* Info */}
      <div className={styles.cardBody}>
        <div className={styles.infoRow}>
          <FiCalendar className={styles.infoIcon} />
          <span>{formatDate(entrega.fecha)}</span>
        </div>
        <div className={styles.infoRow}>
          <FiTruck className={styles.infoIcon} />
          <span>
            {entrega.litrosGastados}L × {formatCurrency(entrega.precioNafta)} ={" "}
            {formatCurrency(entrega.consumoTotal)}
          </span>
        </div>
      </div>

      {/* Detalles */}
      <div className={styles.detalles}>
        <div className={styles.detalleItem}>
          <span className={styles.detalleLabel}>Productos:</span>
          <span className={styles.detalleValue}>
            {formatCurrency(totalProductos)}
          </span>
        </div>
        <div className={styles.detalleItem}>
          <span className={styles.detalleLabel}>Nafta:</span>
          <span className={styles.detalleValue}>
            {formatCurrency(entrega.consumoTotal)}
          </span>
        </div>
        <div className={`${styles.detalleItem} ${styles.total}`}>
          <span className={styles.detalleLabel}>Total:</span>
          <span className={styles.detalleValue}>
            {formatCurrency(totalGeneral)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.productCount}>
          {entrega.detalles.length} producto
          {entrega.detalles.length !== 1 ? "s" : ""}
        </span>
        <FiChevronRight className={styles.chevron} />
      </div>
    </motion.div>
  );
};

export default EntregaCard;
