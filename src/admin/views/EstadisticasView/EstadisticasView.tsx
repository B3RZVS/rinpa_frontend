import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChartBar, FaTruck, FaUsers, FaArrowRight } from "react-icons/fa";
import styles from "./EstadisticasView.module.css";

const EstadisticasView: React.FC = () => {
  const navigate = useNavigate();

  const estadisticas = [
    {
      id: "reporte-general",
      title: "Reporte General",
      description: "Vista general de entregas, productos y consumo de nafta",
      icon: <FaChartBar />,
      color: "var(--color-primary)",
      path: "/dashboard/estadisticas/reporte-general",
    },
    {
      id: "reporte-entrega",
      title: "Reporte Entrega",
      description: "Detalle de entregas por período con totales",
      icon: <FaTruck />,
      color: "var(--color-secondary)",
      path: "/dashboard/estadisticas/reporte-entrega",
    },
    {
      id: "reporte-cliente",
      title: "Reporte Cliente",
      description: "Análisis de clientes, productos y facturación",
      icon: <FaUsers />,
      color: "var(--color-accent)",
      path: "/dashboard/estadisticas/reporte-cliente",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={styles.title}>Estadísticas</h1>
        <p className={styles.subtitle}>
          Selecciona el tipo de reporte que deseas consultar
        </p>
      </motion.div>

      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {estadisticas.map((stat) => (
          <motion.div
            key={stat.id}
            className={styles.card}
            variants={item}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(stat.path)}
          >
            <div
              className={styles.iconWrapper}
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <div className={styles.icon} style={{ color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{stat.title}</h3>
              <p className={styles.cardDescription}>{stat.description}</p>
            </div>
            <div className={styles.arrow}>
              <FaArrowRight />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EstadisticasView;
