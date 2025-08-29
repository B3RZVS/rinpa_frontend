import { motion } from "framer-motion";
import { FiPlus, FiSearch, FiTag } from "react-icons/fi";

import TipoProductoTable from "../../components/ComponentsViewTipoProducto/TipoProductoTable/TipoProductoTable";
import TipoProductoModal from "../../components/ComponentsViewTipoProducto/TipoProductoModal/TipoProductoModal";
import ConfirmModal from "../../components/Common/ConfirmationModal/ConfirmationModal";
import styles from "./TipoProductoView.module.css";
import { useTipoProducto } from "../../hook/hookContexts/useTipoProducto";
import { useTipoProductoUI } from "../../hook/hookUI/useTipoProductoUI";
const TipoProductoView: React.FC = () => {
  const { tipoProductos, loading } = useTipoProducto();

  const {
    confirmDelete,
    filteredTipoProductos,
    handleAdd,
    handleDelete,
    handleEdit,
    handleSave,
    isConfirmModalOpen,
    isModalOpen,
    searchTerm,
    selectedTipoProducto,
    setIsConfirmModalOpen,
    setIsModalOpen,
    setSearchTerm,
    tipoProductoToDelete,
  } = useTipoProductoUI();

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Tipos de Producto</h1>
        <motion.button
          className={styles.addButton}
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus />
          Agregar Tipo
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
              placeholder="Buscar tipos de producto..."
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
              <FiTag size={40} />
            </motion.div>
          </div>
        ) : filteredTipoProductos.length === 0 ? (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiTag className={styles.emptyIcon} />
            <h3>No se encontraron tipos de producto</h3>
            <p>Agrega un nuevo tipo de producto para comenzar</p>
          </motion.div>
        ) : (
          <>
            <TipoProductoTable
              tipoProductos={tipoProductos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </motion.div>

      <TipoProductoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        tipoProducto={selectedTipoProducto}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Tipo de Producto"
        message={`¿Estás seguro de que deseas eliminar el tipo de producto "${tipoProductoToDelete?.nombre}"?`}
      />
    </motion.div>
  );
};

export default TipoProductoView;
