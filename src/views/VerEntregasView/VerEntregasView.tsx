import type React from "react";
import { motion } from "framer-motion";
import styles from "./VerEntregasView.module.css";

const VerEntregasView: React.FC = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Ver Entregas</h2>
        <button className={styles.filterButton}>Filtrar</button>
      </div>

      <div className={styles.content}>
        <p>Aquí se visualizarán todas las entregas realizadas.</p>
        {/* Contenido específico de ver entregas */}
      </div>
    </motion.div>
  );
};

export default VerEntregasView;
