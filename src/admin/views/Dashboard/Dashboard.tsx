import type React from "react";
import { motion } from "framer-motion";
import StatsCard from "../../components/Dashboard/StatsCard/StatsCard";
import QuickActions from "../../components/Dashboard/QuickActions/QuickActions";
import styles from "./Dashboard.module.css";
import { usePrecioNafta } from "../../hook/hookContexts/usePrecioNafta";
import { useEffect } from "react";
const Dashboard: React.FC = () => {
  const { getPreciosNafta, preciosNafta } = usePrecioNafta();
  useEffect(() => {
    if (preciosNafta.length <= 0) getPreciosNafta();
  }, []);

  const precioActual = preciosNafta.find((p) => p.fechaFin === null);
  return (
    <motion.div
      className={styles.dashboard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
          title="Precio Nafta Actual"
          value={precioActual ? `$${precioActual.precio}` : ""}
          color="primary"
        />
      </div>
      <QuickActions />
    </motion.div>
  );
};

export default Dashboard;
