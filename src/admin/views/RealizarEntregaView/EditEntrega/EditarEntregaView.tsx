import { motion } from "framer-motion";
import { FiSave, FiPlus } from "react-icons/fi";
import styles from "./EditarEntregaView.module.css";
import ClienteSelector from "../../../components/ComponentsViewEntrega/ClienteSelector/ClienteSelector";
import DetalleProductoForm from "../../../components/ComponentsViewEntrega/DetalleProductoForm/DetalleProductoForm";
import DetalleProductoListEdit from "../../../components/componentsViewEntregaEdit/DetalleProductoListEdit/DetalleProductoListEdit";
import ConfirmModal from "../../../../shared/components/Common/ConfirmationModal/ConfirmationModal";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import { useEditEntrega } from "../../../hook/hookUI/useEditEntrega";

const EditEntregaView: React.FC = () => {
  const {
    loading,
    selectedCliente,
    setSelectedCliente,
    fecha,
    setFecha,
    litrosGastados,
    setLitrosGastados,
    detalles,
    showDetalleForm,
    setShowDetalleForm,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleConfirmarEliminarDetalle,
    handleGuardar,
  } = useEditEntrega();

  // --- Render ---
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Editar Entrega</h2>
      </div>

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

          <DetalleProductoListEdit
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
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmarEliminarDetalle}
        title="Eliminar Detalle de Entrega"
        message={`¿Estás seguro de que deseas eliminar el detalle de la Entrega?`}
      />
    </motion.div>
  );
};

export default EditEntregaView;
