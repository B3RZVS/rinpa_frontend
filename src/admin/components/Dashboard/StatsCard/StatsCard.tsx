import type React from "react";
import { motion } from "framer-motion";
import styles from "./StatsCard.module.css";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  color: "primary" | "secondary" | "accent";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  // change,
  color,
}) => {
  return (
    <motion.div
      className={`${styles.card} ${styles[color]}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value}</div>
      {/* <div className={styles.change}>{change}</div> */}
    </motion.div>
  );
};

export default StatsCard;
