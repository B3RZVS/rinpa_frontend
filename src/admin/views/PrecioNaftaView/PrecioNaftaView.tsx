import type React from "react";
import { motion } from "framer-motion";
import styles from "./PrecioNaftaView.module.css";

const PrecioNaftaView: React.FC = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Gestión de Precio de Nafta</h2>
        <button className={styles.updateButton}>Actualizar Precio</button>
      </div>

      <div className={styles.content}>
        <p>Aquí se gestionarán los precios de la nafta.</p>
        {/* Contenido específico de precios de nafta */}
      </div>
    </motion.div>
  );
};

export default PrecioNaftaView;
