import type React from "react";
import { motion } from "framer-motion";
import styles from "./RealizarEntregaView.module.css";

const RealizarEntregaView: React.FC = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Realizar Entrega</h2>
        <button className={styles.addButton}>+ Nueva Entrega</button>
      </div>

      <div className={styles.content}>
        <p>Aquí se registrarán las nuevas entregas.</p>
        {/* Contenido específico de realizar entregas */}
      </div>
    </motion.div>
  );
};

export default RealizarEntregaView;
