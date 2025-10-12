import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiDollarSign, FiPackage } from "react-icons/fi";
import styles from "./ProductoCard.module.css";
import type { ProductoResponseInterface } from "../../../interface/producto.interface";

interface ProductoCardProps {
  producto: ProductoResponseInterface;
  onEdit: () => void;
  onDelete?: () => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({
  producto,
  onEdit,
  onDelete,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{producto.descripcion}</h3>
          <span className={styles.productType}>{producto.tipoProducto}</span>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.editButton}
            onClick={onEdit}
            title="Editar producto"
          >
            <FiEdit2 />
          </button>
          {onDelete && (
            <button
              className={styles.deleteButton}
              onClick={onDelete}
              title="Eliminar producto"
            >
              <FiTrash2 />
            </button>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.priceSection}>
          <div className={styles.priceLabel}>
            <FiDollarSign className={styles.priceIcon} />
            <span>Precio</span>
          </div>
          <span className={styles.price}>{formatPrice(producto.precio)}</span>
        </div>

        <div className={styles.measureSection}>
          <div className={styles.measureLabel}>
            <FiPackage className={styles.measureIcon} />
            <span>Medida</span>
          </div>
          <span className={styles.measure}>{producto.medida}</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.productId}>ID: {producto.id}</span>
      </div>
    </motion.div>
  );
};

export default ProductoCard;
