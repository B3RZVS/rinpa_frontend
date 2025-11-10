import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaTruck,
  FaBox,
  FaGasPump,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FechaSelector from "../../../components/ComponentsViewEstadisticas/FechaSelector/FechaSelector";
import styles from "./ReporteGeneralView.module.css";
import { useEstadisticas } from "../../../hook/hookContexts/useEstadisticas";
import { generarPDFReporteGeneral } from "../../../components/ComponentsViewEstadisticas/generadorPdf/pdfEstadisticas";
import ButtonPdf from "../../../components/ComponentsViewEstadisticas/ButtonPdf/ButtonPdf";

const ReporteGeneralView: React.FC = () => {
  const { getReporteGeneral, reporteGeneral, loading, setResetReportes } =
    useEstadisticas();
  const navigate = useNavigate();

  const handleConsultar = async (fechaInicio: string, fechaFin: string) => {
    const data = { fechaInicio, fechaFin };
    getReporteGeneral(data);
  };
  const handleBack = () => {
    navigate(-1);
    setResetReportes();
  };
  const handleDescargarPDF = () => {
    if (reporteGeneral) {
      generarPDFReporteGeneral(reporteGeneral);
    }
  };
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className={styles.backButton} onClick={() => handleBack()}>
          <FaArrowLeft />
        </button>
        <div>
          <h1 className={styles.title}>Reporte General</h1>
          <p className={styles.subtitle}>Vista general de entregas y consumo</p>
        </div>
        {reporteGeneral && <ButtonPdf handleGenerate={handleDescargarPDF} />}
      </motion.div>

      <FechaSelector onConsultar={handleConsultar} loading={loading} />

      {reporteGeneral && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.reporteContent}
        >
          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div
              className={styles.statCard}
              style={{ borderColor: "var(--color-primary)" }}
            >
              <div
                className={styles.statIcon}
                style={{ color: "var(--color-primary)" }}
              >
                <FaTruck />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Total Entregas</p>
                <p className={styles.statValue}>
                  {reporteGeneral.totalEntregas}
                </p>
              </div>
            </div>

            <div
              className={styles.statCard}
              style={{ borderColor: "var(--color-secondary)" }}
            >
              <div
                className={styles.statIcon}
                style={{ color: "var(--color-secondary)" }}
              >
                <FaBox />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Productos</p>
                <p className={styles.statValue}>
                  {reporteGeneral.productosEntregados.length}
                </p>
              </div>
            </div>

            <div
              className={styles.statCard}
              style={{ borderColor: "var(--color-accent)" }}
            >
              <div
                className={styles.statIcon}
                style={{ color: "var(--color-accent)" }}
              >
                <FaGasPump />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Nafta Consumida</p>
                <p className={styles.statValue}>
                  {reporteGeneral.consumoTotalNafta.toFixed(1)}L
                </p>
              </div>
            </div>

            <div
              className={styles.statCard}
              style={{ borderColor: "var(--color-secondary-dark)" }}
            >
              <div
                className={styles.statIcon}
                style={{ color: "var(--color-secondary-dark)" }}
              >
                <FaDollarSign />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Costo Nafta</p>
                <p className={styles.statValue}>
                  ${reporteGeneral.costoTotalNafta.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Productos Entregados */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Productos Entregados</h2>
            <div className={styles.productList}>
              {reporteGeneral.productosEntregados.map((producto, index) => (
                <motion.div
                  key={index}
                  className={styles.productItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FaBox className={styles.productIcon} />
                  <span>{producto}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Clientes con Entregas */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Clientes con Entregas</h2>
            <div className={styles.clientesList}>
              {reporteGeneral.clientesConEntrega.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.clienteItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={styles.clienteAvatar}>
                    {item.cliente.nombre[0]}
                    {item.cliente.apellido[0]}
                  </div>
                  <span>
                    {item.cliente.nombre} {item.cliente.apellido}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info del Periodo */}
          <div className={styles.periodoInfo}>
            <p>
              <strong>Período:</strong> {reporteGeneral.periodo}
            </p>
            <p>
              <strong>Fecha Emisión:</strong>{" "}
              {new Date(reporteGeneral.fechaEmision).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReporteGeneralView;
