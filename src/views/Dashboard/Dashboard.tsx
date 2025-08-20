import type React from "react";
import { motion } from "framer-motion";
import StatsCard from "../../components/Dashboard/StatsCard/StatsCard";
import QuickActions from "../../components/Dashboard/QuickActions/QuickActions";
import RecentActivity from "../../components/Dashboard/RecentActivity/RecentActivity";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  return (
    <motion.div
      className={styles.dashboard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <QuickActions />
      <div className={styles.statsGrid}>
        <StatsCard
          title="Total Productos"
          value="1,234"
          change="+12%"
          color="primary"
        />
        <StatsCard
          title="Clientes Activos"
          value="567"
          change="+8%"
          color="secondary"
        />
        <StatsCard
          title="Entregas Hoy"
          value="23"
          change="+15%"
          color="accent"
        />
        <StatsCard
          title="Precio Nafta"
          value="$890"
          change="+2%"
          color="primary"
        />
      </div>

      <div className={styles.contentGrid}>
        <RecentActivity />
      </div>
    </motion.div>
  );
};

export default Dashboard;
