import type React from "react";
import { motion } from "framer-motion";
import styles from "./RecentActivity.module.css";

const RecentActivity: React.FC = () => {
  const activities = [
    {
      action: "Nueva entrega registrada",
      time: "Hace 5 min",
      type: "delivery",
    },
    {
      action: "Cliente agregado: Juan Pérez",
      time: "Hace 15 min",
      type: "client",
    },
    {
      action: "Producto actualizado: Cemento",
      time: "Hace 30 min",
      type: "product",
    },
    {
      action: "Precio de nafta actualizado",
      time: "Hace 1 hora",
      type: "price",
    },
  ];

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className={styles.title}>Actividad Reciente</h3>
      <div className={styles.activities}>
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className={`${styles.activity} ${styles[activity.type]}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={styles.dot}></div>
            <div className={styles.content}>
              <p className={styles.action}>{activity.action}</p>
              <span className={styles.time}>{activity.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;
