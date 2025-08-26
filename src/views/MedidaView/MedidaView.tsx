import type React from "react";
import { motion } from "framer-motion";
import styles from "./MedidaView.module.css";

const MedidaView: React.FC = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Gestión de Medidas</h2>
        <button className={styles.addButton}>+ Nueva Medida</button>
      </div>

      <div className={styles.content}>
        <p>Aquí se gestionarán las medidas del sistema.</p>
        {/* Contenido específico de medidas */}
      </div>
    </motion.div>
  );
};

export default MedidaView;
