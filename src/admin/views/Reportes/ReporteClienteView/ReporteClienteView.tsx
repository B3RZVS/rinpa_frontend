import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUser,
  FaTruck,
  FaBox,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FechaSelector from "../../../components/ComponentsViewEstadisticas/FechaSelector/FechaSelector";
import styles from "./ReporteClienteView.module.css";
import { useEstadisticas } from "../../../hook/hookContexts/useEstadisticas";
import { generarPDFReporteCliente } from "../../../components/ComponentsViewEstadisticas/generadorPdf/pdfEstadisticas";
import ButtonPdf from "../../../components/ComponentsViewEstadisticas/ButtonPdf/ButtonPdf";

const ReporteClienteView: React.FC = () => {
  const { getReporteClientes, reporteCliente, loading, setResetReportes } =
    useEstadisticas();
  const navigate = useNavigate();

  const handleConsultar = async (fechaInicio: string, fechaFin: string) => {
    const data = { fechaInicio, fechaFin };
    getReporteClientes(data);
  };
  const handleBack = () => {
    navigate(-1);
    setResetReportes();
  };
  const handleDescargarPDF = () => {
    if (reporteCliente) {
      generarPDFReporteCliente(reporteCliente);
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
          <h1 className={styles.title}>Reporte Cliente</h1>
          <p className={styles.subtitle}>Análisis de clientes y facturación</p>
        </div>
        {reporteCliente && <ButtonPdf handleGenerate={handleDescargarPDF} />}
      </motion.div>

      <FechaSelector onConsultar={handleConsultar} loading={loading} />

      {reporteCliente && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.reporteContent}
        >
          <div className={styles.periodoHeader}>
            <h2>Período: {reporteCliente.periodo}</h2>
            <p>Total Clientes: {reporteCliente.clientes.length}</p>
          </div>

          <div className={styles.clientesList}>
            {reporteCliente.clientes.map((cliente, index) => (
              <motion.div
                key={index}
                className={styles.clienteCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.clienteHeader}>
                  <div className={styles.avatarWrapper}>
                    <FaUser />
                  </div>
                  <h3 className={styles.clienteNombre}>{cliente.nombre}</h3>
                </div>

                <div className={styles.statsContainer}>
                  <div className={styles.statItem}>
                    <div
                      className={styles.statIcon}
                      style={{ color: "var(--color-primary)" }}
                    >
                      <FaTruck />
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Entregas</span>
                      <span className={styles.statValue}>
                        {cliente.entregasRealizadas}
                      </span>
                    </div>
                  </div>

                  <div className={styles.statItem}>
                    <div
                      className={styles.statIcon}
                      style={{ color: "var(--color-secondary)" }}
                    >
                      <FaBox />
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>
                        Producto Favorito
                      </span>
                      <span className={styles.statValue}>
                        {cliente.productoMasPedido}
                      </span>
                    </div>
                  </div>

                  <div className={styles.statItem}>
                    <div
                      className={styles.statIcon}
                      style={{ color: "var(--color-accent)" }}
                    >
                      <FaDollarSign />
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Total Facturado</span>
                      <span className={styles.statValue}>
                        ${cliente.totalFacturado.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumen Total */}
          <motion.div
            className={styles.resumenCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={styles.resumenTitle}>Resumen Total</h3>
            <div className={styles.resumenGrid}>
              <div className={styles.resumenItem}>
                <span>Total Clientes</span>
                <strong>{reporteCliente.clientes.length}</strong>
              </div>
              <div className={styles.resumenItem}>
                <span>Total Entregas</span>
                <strong>
                  {reporteCliente.clientes.reduce(
                    (sum, c) => sum + c.entregasRealizadas,
                    0
                  )}
                </strong>
              </div>
              <div className={styles.resumenItem}>
                <span>Facturación Total</span>
                <strong>
                  $
                  {reporteCliente.clientes
                    .reduce((sum, c) => sum + c.totalFacturado, 0)
                    .toLocaleString()}
                </strong>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ReporteClienteView;
