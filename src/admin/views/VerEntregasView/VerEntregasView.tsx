import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  // FiFilter
} from "react-icons/fi";
import EntregaCard from "../../components/ComponentsViewEntrega/EntregaCard/EntregaCard";
import styles from "./VerEntregasView.module.css";
import { useEntrega } from "../../hook/hookContexts/useEntrega";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import PaginateComponent from "../../components/PaginateComponent/PaginateComponent";
import type { PaginationInfo } from "../../interface/pagination.interface";
import usePaginationParams from "../../hook/usePaginateParams";
import type { EntregaInterfaceResponse } from "../../interface/entrega.interface";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";

const VerEntregasView = () => {
  const navigate = useNavigate();
  const { loading, entregasPaginated, getPaginatedEntregas, deleteEntrega } =
    useEntrega();
  const [searchTerm, setSearchTerm] = useState("");
  // const [filterOpen, setFilterOpen] = useState(false);
  const [entregaDelete, setEntregaDelete] =
    useState<EntregaInterfaceResponse | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null
  );
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    // handleFilter,
  } = usePaginationParams();

  useEffect(() => {
    getPaginatedEntregas(paginationParams);
  }, [paginationParams]);

  // useEffect(() => {
  //   if (entregas.length <= 0) {
  //     getEntregas();
  //   }
  // }, []);

  const handleNuevaEntrega = () => {
    navigate("/dashboard/realizar-entrega");
  };

  const handleEditEntrega = (id: number) => {
    navigate(`/dashboard/editar-entrega/${id}`);
  };
  const handleDelete = (entrega: EntregaInterfaceResponse) => {
    setEntregaDelete(entrega);
    setOpenDelete(true);
  };
  const handleConfirmDelete = async () => {
    if (entregaDelete) await deleteEntrega(entregaDelete.id);
    await getPaginatedEntregas(paginationParams);
    setOpenDelete(false);
  };
  useEffect(() => {
    setPaginationInfo(
      entregasPaginated
        ? {
            currentPage: entregasPaginated.meta.currentPage,
            totalPages: entregasPaginated.meta.totalPages,
            page_size: entregasPaginated.meta.page_size,
            totalItems: entregasPaginated.meta.totalItems,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
          }
        : null
    );
  }, [entregasPaginated]);

  if (loading || !entregasPaginated) {
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
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        {/* <button
          className={`${styles.filterButton} ${
            filterOpen ? styles.active : ""
          }`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <FiFilter />
        </button> */}
      </div>

      {/* Filter Panel */}
      {/* {filterOpen && (
        <motion.div
          className={styles.filterPanel}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <p>Filtros adicionales (por implementar)</p>
        </motion.div>
      )} */}

      {/* Entregas List */}
      <div className={styles.content}>
        {loading && !paginationInfo ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Cargando entregas...</p>
          </div>
        ) : entregasPaginated.data.length === 0 ? (
          <div className={styles.empty}>
            <p>No se encontraron entregas</p>
            <button className={styles.emptyButton} onClick={handleNuevaEntrega}>
              Crear primera entrega
            </button>
          </div>
        ) : (
          <PaginateComponent
            background="transparent"
            backgroundPagination="rgba(255, 255, 255, 0.54)"
            {...(paginationInfo && {
              pagination: {
                currentPage: paginationInfo.currentPage,
                totalPages: paginationInfo.totalPages,
                pageSize: paginationInfo.page_size,
                totalItems: paginationInfo.totalItems,
                onPageChange: paginationInfo.onPageChange,
                onPageSizeChange: paginationInfo.onPageSizeChange,
              },
            })}
          >
            <div className={styles.entregasList}>
              {entregasPaginated.data.map((entrega, index) => (
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
