import type React from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTruck, FiUsers } from "react-icons/fi";
import styles from "./QuickActions.module.css";

const QuickActions: React.FC = () => {
  const actions = [
    { icon: FiPlus, label: "Nuevo Producto", color: "primary" },
    { icon: FiTruck, label: "Nueva Entrega", color: "secondary" },
    { icon: FiUsers, label: "Nuevo Cliente", color: "accent" },
  ];

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className={styles.title}>Acciones Rápidas</h3>
      <div className={styles.actions}>
        {actions.map((action, index) => (
          <motion.button
            key={index}
            className={`${styles.actionButton} ${styles[action.color]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <action.icon className={styles.icon} />
            <span>{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
