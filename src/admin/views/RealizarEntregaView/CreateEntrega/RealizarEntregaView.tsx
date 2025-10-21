import { motion } from "framer-motion";
import { FiSave, FiPlus } from "react-icons/fi";
import ClienteSelector from "../../../components/ComponentsViewEntrega/ClienteSelector/ClienteSelector";
import DetalleProductoForm from "../../../components/ComponentsViewEntrega/DetalleProductoForm/DetalleProductoForm";
import DetalleProductoList from "../../../components/ComponentsViewEntrega/DetalleProductoList/DetalleProductoList";
import styles from "./RealizarEntregaView.module.css";
import { useCreateEntrega } from "../../../hook/hookUI/useCreateEntrega";
const RealizarEntregaView: React.FC = () => {
  const {
    // Estado
    selectedCliente,
    setSelectedCliente,
    fecha,
    setFecha,
    litrosGastados,
    setLitrosGastados,
    detalles,
    showDetalleForm,
    setShowDetalleForm,

    // Acciones
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleGuardar,

    // Datos externos
    loading,
  } = useCreateEntrega();
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <h2>Nueva Entrega</h2>
      </div>

      {/* Form */}
      <div className={styles.form}>
        {/* Datos Básicos */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Datos de la Entrega</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Cliente *</label>
            <ClienteSelector
              selectedCliente={selectedCliente}
              onSelectCliente={setSelectedCliente}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha *</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Litros Gastados *</label>
              <input
                type="number"
                step="0.01"
                value={litrosGastados}
                onChange={(e) => setLitrosGastados(e.target.value)}
                placeholder="0.00"
                className={styles.input}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Detalles de Productos */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Productos</h3>
            <button
              className={styles.addDetalleButton}
              onClick={() => setShowDetalleForm(true)}
            >
              <FiPlus />
              <span>Agregar</span>
            </button>
          </div>

          {showDetalleForm && (
            <DetalleProductoForm
              onAdd={handleAgregarDetalle}
              onCancel={() => setShowDetalleForm(false)}
            />
          )}

          <DetalleProductoList
            detalles={detalles}
            onDelete={handleEliminarDetalle}
          />
        </div>

        {/* Botón Guardar */}
        <div className={styles.actions}>
          <button
            className={styles.saveButton}
            onClick={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className={styles.spinner} />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <FiSave />
                <span>Guardar Entrega</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RealizarEntregaView;
