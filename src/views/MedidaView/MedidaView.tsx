import { motion } from "framer-motion";
import { FiPlus, FiSearch, FiPackage } from "react-icons/fi";
import MedidasTable from "../../components/ComponentsViewMedida/MedidasTable/MedidasTable";
import MedidasModal from "../../components/ComponentsViewMedida/MedidasModal/MedidasModal";
import ConfirmModal from "../../components/Common/ConfirmationModal/ConfirmationModal";
import styles from "./MedidaView.module.css";
import { useMedida } from "../../hook/hookContexts/useMedida";
import { useMedidasUI } from "../../hook/hookUI/useMedidasUI";

const MedidasView: React.FC = () => {
  const { getMedidas, medidas, loading } = useMedida();

  const {
    filteredMedidas,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedMedida,
    medidaToDelete,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    confirmateAccion,
  } = useMedidasUI(medidas, getMedidas);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Medidas</h1>
        <motion.button
          className={styles.addButton}
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus />
          Agregar Medida
        </motion.button>
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={styles.searchContainer}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <FiSearch
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-neutral-dark)",
              }}
            />
            <input
              type="text"
              placeholder="Buscar medidas..."
              className={styles.searchInput}
              style={{ paddingLeft: "40px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <FiPackage size={40} />
            </motion.div>
          </div>
        ) : filteredMedidas.length === 0 ? (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiPackage className={styles.emptyIcon} />
            <h3>No se encontraron medidas</h3>
            <p>Agrega una nueva medida para comenzar</p>
          </motion.div>
        ) : (
          <>
            <MedidasTable
              medidas={medidas}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </motion.div>

      <MedidasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={confirmateAccion}
        medida={selectedMedida}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Medida"
        message={`¿Estás seguro de que deseas eliminar la medida "${medidaToDelete?.cantidad} ${medidaToDelete?.unidadSimbolo}"?`}
      />
    </motion.div>
  );
};

export default MedidasView;
