import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiSearch, FiTag } from "react-icons/fi";
import type { TipoProductoInterfaceResponse } from "../../interface/tipoProducto.interface";
import type { PaginationData } from "../../interface/pagination.interface";
import TipoProductoTable from "../../components/ComponentsViewTipoProducto/TipoProductoTable/TipoProductoTable";
import TipoProductoModal from "../../components/ComponentsViewTipoProducto/TipoProductoModal/TipoProductoModal";
import ConfirmModal from "../../components/Common/ConfirmationModal/ConfirmationModal";
import Pagination from "../../components/Common/Pagination/Pagination";
import styles from "./TipoProductoView.module.css";

const TipoProductoView: React.FC = () => {
  const [tipoProductos, setTipoProductos] = useState<
    TipoProductoInterfaceResponse[]
  >([]);
  const [filteredTipoProductos, setFilteredTipoProductos] = useState<
    TipoProductoInterfaceResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedTipoProducto, setSelectedTipoProducto] =
    useState<TipoProductoInterfaceResponse | null>(null);
  const [tipoProductoToDelete, setTipoProductoToDelete] =
    useState<TipoProductoInterfaceResponse | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  // Simulación de datos - reemplazar con API real
  useEffect(() => {
    const fetchTipoProductos = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData: TipoProductoInterfaceResponse[] = [
        { id: 1, nombre: "Bebidas" },
        { id: 2, nombre: "Alimentos" },
        { id: 3, nombre: "Limpieza" },
        { id: 4, nombre: "Cuidado Personal" },
        { id: 5, nombre: "Electrónicos" },
        { id: 6, nombre: "Ropa" },
        { id: 7, nombre: "Hogar" },
      ];

      setTipoProductos(mockData);
      setFilteredTipoProductos(mockData);
      setPagination((prev) => ({
        ...prev,
        totalItems: mockData.length,
        totalPages: Math.ceil(mockData.length / prev.itemsPerPage),
      }));
      setLoading(false);
    };

    fetchTipoProductos();
  }, []);

  useEffect(() => {
    const filtered = tipoProductos.filter((tipo) =>
      tipo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTipoProductos(filtered);
    setPagination((prev) => ({
      ...prev,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.itemsPerPage),
      currentPage: 1,
    }));
  }, [searchTerm, tipoProductos]);

  const handleAdd = () => {
    setSelectedTipoProducto(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tipoProducto: TipoProductoInterfaceResponse) => {
    setSelectedTipoProducto(tipoProducto);
    setIsModalOpen(true);
  };

  const handleDelete = (tipoProducto: TipoProductoInterfaceResponse) => {
    setTipoProductoToDelete(tipoProducto);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (tipoProductoToDelete) {
      setTipoProductos((prev) =>
        prev.filter((t) => t.id !== tipoProductoToDelete.id)
      );
      setTipoProductoToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  const handleSave = (
    tipoProductoData: Omit<TipoProductoInterfaceResponse, "id">
  ) => {
    if (selectedTipoProducto) {
      // Editar
      setTipoProductos((prev) =>
        prev.map((t) =>
          t.id === selectedTipoProducto.id
            ? { ...selectedTipoProducto, ...tipoProductoData }
            : t
        )
      );
    } else {
      // Crear
      const newTipoProducto: TipoProductoInterfaceResponse = {
        id: Math.max(...tipoProductos.map((t) => t.id), 0) + 1,
        ...tipoProductoData,
      };
      setTipoProductos((prev) => [...prev, newTipoProducto]);
    }
    setIsModalOpen(false);
  };

  const getCurrentPageData = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredTipoProductos.slice(startIndex, endIndex);
  };

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
              tipoProductos={getCurrentPageData()}
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
