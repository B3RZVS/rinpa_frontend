import { motion } from "framer-motion";
import { FiPlus, FiTruck, FiUsers } from "react-icons/fi";
import styles from "./QuickActions.module.css";
import { useNavigate } from "react-router-dom";
const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    {
      icon: FiTruck,
      label: "Nueva Entrega",
      color: "secondary",
      url: "/dashboard/realizar-entrega",
    },
    {
      icon: FiUsers,
      label: "Nuevo Cliente",
      color: "accent",
      url: "/dashboard/cliente",
    },
    {
      icon: FiPlus,
      label: "Nuevo Producto",
      color: "primary",
      url: "/dashboard/producto",
    },
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
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => navigate(action.url)}
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
