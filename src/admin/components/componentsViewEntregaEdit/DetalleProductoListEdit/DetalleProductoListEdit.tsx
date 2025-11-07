import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPackage } from "react-icons/fi";
import styles from "./DetalleProductoListEdit.module.css";
import type { DetalleProductoInterfaceResponse } from "../../../interface/detalle.interface";

interface DetalleProductoListProps {
  detalles: DetalleProductoInterfaceResponse[];
  onDelete: (index: number) => void;
}

const DetalleProductoListEdit: React.FC<DetalleProductoListProps> = ({
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
        {detalles.map((detalle) => {
          const subTotal = detalle.cantidad * detalle.precioUnitario;

          return (
            <motion.div
              key={detalle.id}
              className={styles.detalleItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.detalleInfo}>
                <div className={styles.detalleHeader}>
                  <span className={styles.productoId}>
                    {detalle.producto.tipoProducto} {detalle.producto.medida}
                  </span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(detalle.id)}
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

export default DetalleProductoListEdit;
