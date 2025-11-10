import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FechaSelector from "../../../components/ComponentsViewEstadisticas/FechaSelector/FechaSelector";
import styles from "./ReporteEntregaView.module.css";
import { useEstadisticas } from "../../../hook/hookContexts/useEstadisticas";
import ButtonPdf from "../../../components/ComponentsViewEstadisticas/ButtonPdf/ButtonPdf";
import { generarPDFReporteEntrega } from "../../../components/ComponentsViewEstadisticas/generadorPdf/pdfEstadisticas";
const ReporteEntregaView: React.FC = () => {
  const { getReporteEntregas, reporteEntrega, loading, setResetReportes } =
    useEstadisticas();
  const navigate = useNavigate();

  const handleConsultar = async (fechaInicio: string, fechaFin: string) => {
    const data = { fechaInicio, fechaFin };
    getReporteEntregas(data);
  };
  const handleBack = () => {
    navigate(-1);
    setResetReportes();
  };
  const handleDescargarPDF = () => {
    if (reporteEntrega) {
      generarPDFReporteEntrega(reporteEntrega);
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
          <h1 className={styles.title}>Reporte Entrega</h1>
          <p className={styles.subtitle}>Detalle de entregas por período</p>
        </div>
        {reporteEntrega && <ButtonPdf handleGenerate={handleDescargarPDF} />}
      </motion.div>

      <FechaSelector onConsultar={handleConsultar} loading={loading} />

      {reporteEntrega && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.reporteContent}
        >
          <div className={styles.periodoHeader}>
            <h2>Período: {reporteEntrega.periodo}</h2>
            <h2>Total de entregas: {reporteEntrega.entregas.length}</h2>
          </div>

          {/* Lista de Entregas */}
          <div className={styles.entregasList}>
            {reporteEntrega.entregas.map((entrega, index) => (
              <motion.div
                key={entrega.numeroEntrega}
                className={styles.entregaCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.entregaHeader}>
                  <span className={styles.numeroEntrega}>
                    {entrega.numeroEntrega}
                  </span>
                  <span className={styles.fecha}>
                    {new Date(entrega.fecha).toLocaleDateString()}
                  </span>
                </div>

                <div className={styles.clienteInfo}>
                  <strong>Cliente:</strong> {entrega.cliente}
                </div>

                <div className={styles.productosInfo}>
                  <strong>Productos:</strong>
                  <p>{entrega.productos}</p>
                </div>

                <div className={styles.entregaDetails}>
                  <div className={styles.detailRow}>
                    <span>Cantidad Productos:</span>
                    <strong>{entrega.cantidadProductosEntregados}</strong>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Costo Unit. Promedio:</span>
                    <strong>
                      ${entrega.costoUnitarioPromedio.toLocaleString()}
                    </strong>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Subtotal:</span>
                    <strong>${entrega.subtotal.toLocaleString()}</strong>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Nafta:</span>
                    <strong>
                      {entrega.naftaConsumida}L ($
                      {entrega.costoNafta.toLocaleString()})
                    </strong>
                  </div>
                  <div className={`${styles.detailRow} ${styles.total}`}>
                    <span>Total:</span>
                    <strong>${entrega.total.toLocaleString()}</strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total General */}
          <motion.div
            className={styles.totalCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={styles.totalTitle}>Total General</h3>
            <div className={styles.totalDetails}>
              <div className={styles.totalRow}>
                <span>Cantidad Productos:</span>
                <strong>
                  {reporteEntrega.totalGeneral.cantidadProductosEntregados}
                </strong>
              </div>
              <div className={styles.totalRow}>
                <span>Subtotal:</span>
                <strong>
                  ${reporteEntrega.totalGeneral.subtotal.toLocaleString()}
                </strong>
              </div>
              <div className={styles.totalRow}>
                <span>Nafta:</span>
                <strong>
                  {reporteEntrega.totalGeneral.litrosNafta.toFixed(2)}L ($
                  {reporteEntrega.totalGeneral.costoNafta.toLocaleString()})
                </strong>
              </div>
              <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                <span>TOTAL:</span>
                <strong>
                  ${reporteEntrega.totalGeneral.total.toLocaleString()}
                </strong>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ReporteEntregaView;
