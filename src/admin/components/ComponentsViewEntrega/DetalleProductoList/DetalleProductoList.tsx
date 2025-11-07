import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPackage } from "react-icons/fi";
import styles from "./DetalleProductoList.module.css";
import type { CreateDetalleProductoInterface } from "../../../interface/detalle.interface";

interface DetalleProductoListProps {
  detalles: CreateDetalleProductoInterface[];
  onDelete: (index: number) => void;
}

const DetalleProductoList: React.FC<DetalleProductoListProps> = ({
  detalles,
  onDelete,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalGeneral = detalles.reduce(
    (sum, detalle) => sum + detalle.cantidad * detalle.precioUnitario,
    0
  );

  if (detalles.length === 0) {
    return (
      <div className={styles.empty}>
        <FiPackage className={styles.emptyIcon} />
        <p>No hay productos agregados</p>
        <span>Agrega productos para continuar</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {detalles.map((detalle, index) => {
          const subTotal = detalle.cantidad * detalle.precioUnitario;

          return (
            <motion.div
              key={index}
              className={styles.detalleItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.detalleInfo}>
                <div className={styles.detalleHeader}>
                  <span className={styles.productoId}>
                    {detalle.productoNombre}
                  </span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(index)}
                    type="button"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className={styles.detalleBody}>
                  <div className={styles.detalleRow}>
                    <span className={styles.label}>Cantidad:</span>
                    <span className={styles.value}>{detalle.cantidad}</span>
                  </div>
                  <div className={styles.detalleRow}>
                    <span className={styles.label}>Precio Unit.:</span>
                    <span className={styles.value}>
                      {formatCurrency(detalle.precioUnitario)}
                    </span>
                  </div>
                  <div className={`${styles.detalleRow} ${styles.subtotal}`}>
                    <span className={styles.label}>Subtotal:</span>
                    <span className={styles.value}>
                      {formatCurrency(subTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Total */}
      {detalles.length > 0 && (
        <div className={styles.total}>
          <span className={styles.totalLabel}>Total Productos:</span>
          <span className={styles.totalValue}>
            {formatCurrency(totalGeneral)}
          </span>
        </div>
      )}
    </div>
  );
};

export default DetalleProductoList;
