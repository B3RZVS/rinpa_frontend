import type React from "react";
import { motion } from "framer-motion";
import styles from "./TipoProductoView.module.css";

const TipoProductoView: React.FC = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Gestión de Tipo de Producto</h2>
        <button className={styles.addButton}>+ Nuevo Tipo</button>
      </div>

      <div className={styles.content}>
        <p>Aquí se gestionarán los tipos de productos del sistema.</p>
        {/* Contenido específico de tipos de producto */}
      </div>
    </motion.div>
  );
};

export default TipoProductoView;
