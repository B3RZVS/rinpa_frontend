import type React from "react";
import { motion } from "framer-motion";
import styles from "./ProductoView.module.css";

const ProductoView: React.FC = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Gestión de Productos</h2>
        <button className={styles.addButton}>+ Nuevo Producto</button>
      </div>

      <div className={styles.content}>
        <p>Aquí se gestionarán los productos del sistema.</p>
        {/* Contenido específico de productos */}
      </div>
    </motion.div>
  );
};

export default ProductoView;
