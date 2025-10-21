import { motion } from "framer-motion";
import { FiPlus, FiSearch, FiUsers } from "react-icons/fi";

import ClienteTable from "../../components/ComponentsViewCliente/ClienteTable/ClienteTable";
import ClienteModal from "../../components/ComponentsViewCliente/ClienteModal/ClienteModal";
import ConfirmModal from "../../../shared/components/Common/ConfirmationModal/ConfirmationModal";
import Pagination from "../../../shared/components/Common/Pagination/Pagination";
import styles from "./ClienteView.module.css";
import { useCliente } from "../../hook/hookContexts/useCliente";
import { useClienteUI } from "../../hook/hookUI/useClienteUI";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const ClienteView: React.FC = () => {
  const { loading } = useCliente();
  const {
    handleAdd,
    searchTerm,
    setSearchTerm,
    filteredClientes,
    getCurrentPageData,
    handleDelete,
    handleEdit,
    handleSave,
    pagination,
    setPagination,
    selectedCliente,
    setIsModalOpen,
    setIsConfirmModalOpen,
    clienteToDelete,
    isModalOpen,
    isConfirmModalOpen,
    confirmDelete,
  } = useClienteUI();
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
        <h1 className={styles.title}>Gestión de Clientes</h1>
        <motion.button
          className={styles.addButton}
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus />
          Agregar Cliente
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
              placeholder="Buscar clientes..."
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
              <FiUsers size={40} />
            </motion.div>
          </div>
        ) : filteredClientes.length === 0 ? (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiUsers className={styles.emptyIcon} />
            <h3>No se encontraron clientes</h3>
            <p>Agrega un nuevo cliente para comenzar</p>
          </motion.div>
        ) : (
          <>
            <ClienteTable
              clientes={getCurrentPageData()}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Pagination
              pagination={pagination}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </>
        )}
      </motion.div>

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        cliente={selectedCliente}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Cliente"
        message={`¿Estás seguro de que deseas eliminar el cliente "${clienteToDelete?.nombre} ${clienteToDelete?.apellido}"?`}
      />
    </motion.div>
  );
};

export default ClienteView;
