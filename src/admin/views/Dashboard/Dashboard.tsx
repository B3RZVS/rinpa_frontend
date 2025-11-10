import { motion } from "framer-motion";
import StatsCard from "../../components/Dashboard/StatsCard/StatsCard";
import QuickActions from "../../components/Dashboard/QuickActions/QuickActions";
import styles from "./Dashboard.module.css";
import { usePrecioNafta } from "../../hook/hookContexts/usePrecioNafta";
import { useEffect } from "react";
import { useEstadisticas } from "../../hook/hookContexts/useEstadisticas";
const Dashboard: React.FC = () => {
  const { getPreciosNafta, preciosNafta } = usePrecioNafta();
  const { estadisticaHome, getEstadisticasHome } = useEstadisticas();
  useEffect(() => {
    if (preciosNafta.length <= 0) getPreciosNafta();
    getEstadisticasHome();
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
          value={estadisticaHome ? estadisticaHome.cantProducto : 0}
          change="+12%"
          color="primary"
        />
        <StatsCard
          title="Clientes Activos"
          value={estadisticaHome ? estadisticaHome.cantClientes : 0}
          change="+8%"
          color="secondary"
        />
        <StatsCard
          title="Entregas Hoy"
          value={estadisticaHome ? estadisticaHome.cantEntregas : 0}
          change="+15%"
          color="accent"
        />
        <StatsCard
          title="Precio Nafta Actual"
          value={precioActual ? precioActual.precio : 0}
          color="primary"
        />
      </div>
      <QuickActions />
    </motion.div>
  );
};

export default Dashboard;
