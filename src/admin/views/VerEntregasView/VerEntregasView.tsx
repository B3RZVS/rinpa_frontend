import { motion } from "framer-motion";
import {
  FiPlus,
  // FiFilter
} from "react-icons/fi";
import EntregaCard from "../../components/ComponentsViewEntrega/EntregaCard/EntregaCard";
import styles from "./VerEntregasView.module.css";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import PaginateComponent from "../../components/PaginateComponent/PaginateComponent";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import { useVerEntregas } from "../../hook/hookUI/useVerEntregas";
import { SearchBar } from "../../../shared/pagination";

const VerEntregasView = () => {
  const {
    loading,
    meta,
    entregasPaginated,
    openDelete,
    pagination,
    setOpenDelete,
    handleConfirmDelete,
    handleDelete,
    handleEditEntrega,
    handleNuevaEntrega,
    handleSearch,
  } = useVerEntregas();
  if (!entregasPaginated) {
    return <LoadingComponent />;
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <h2>Entregas Realizadas</h2>
        <button className={styles.addButton} onClick={handleNuevaEntrega}>
          <FiPlus />
          <span>Nueva</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className={styles.filtersSection}>
        <div className={styles.searchWrapper}>
          <SearchBar
            placeholder="Buscar por nombre, apellido, usuario o correo..."
            onSearch={handleSearch}
            debounceMs={300}
          />
        </div>
      </div>

      {/* Entregas List */}
      <div className={styles.content}>
        {loading && !meta ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Cargando entregas...</p>
          </div>
        ) : entregasPaginated.length === 0 ? (
          <div className={styles.empty}>
            <p>No se encontraron entregas</p>
            <button className={styles.emptyButton} onClick={handleNuevaEntrega}>
              Crear primera entrega
            </button>
          </div>
        ) : (
          meta && (
            <PaginateComponent
              loading={loading}
              background="transparent"
              backgroundPagination="rgba(255, 255, 255, 0.54)"
              {...(pagination.params && {
                pagination: {
                  currentPage: meta?.currentPage,
                  totalPages: meta?.totalPages,
                  pageSize: meta?.page_size,
                  totalItems: meta?.totalItems,
                  onPageChange: pagination.setPage,
                  // onPageSizeChange: meta?.onPageSizeChange,
                },
              })}
            >
              <div className={styles.entregasList}>
                {entregasPaginated.map((entrega, index) => (
                  <EntregaCard
                    key={entrega.id}
                    entrega={entrega}
                    index={index}
                    onEdit={handleEditEntrega}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </PaginateComponent>
          )
        )}
      </div>
      <ConfirmationModal
        title="Eliminar Entrega"
        message="¿Esta seguro de eliminar esta entrega?"
        isOpen={openDelete}
        onConfirm={handleConfirmDelete}
        onClose={() => setOpenDelete(false)}
      />
    </motion.div>
  );
};

export default VerEntregasView;
