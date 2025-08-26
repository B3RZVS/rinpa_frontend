import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiSearch, FiPackage } from "react-icons/fi";
import type { PaginationData } from "../../interface/pagination.interface";
import type { MedidainterfaceResponse } from "../../interface/medida.interface";
import MedidasTable from "../../components/ComponentsViewMedida/MedidasTable/MedidasTable";
import MedidasModal from "../../components/ComponentsViewMedida/MedidasModal/MedidasModal";
import ConfirmModal from "../../components/Common/ConfirmationModal/ConfirmationModal";
import Pagination from "../../components/Common/Pagination/Pagination";
import styles from "./MedidaView.module.css";

const MedidasView: React.FC = () => {
  const [medidas, setMedidas] = useState<MedidainterfaceResponse[]>([]);
  const [filteredMedidas, setFilteredMedidas] = useState<
    MedidainterfaceResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMedida, setSelectedMedida] =
    useState<MedidainterfaceResponse | null>(null);
  const [medidaToDelete, setMedidaToDelete] =
    useState<MedidainterfaceResponse | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  // Simulación de datos - reemplazar con API real
  useEffect(() => {
    const fetchMedidas = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData: MedidainterfaceResponse[] = [
        { id: 1, cantidad: "500", unidad: "ml" },
        { id: 2, cantidad: "1", unidad: "litro" },
        { id: 3, cantidad: "250", unidad: "gr" },
        { id: 4, cantidad: "1", unidad: "kg" },
        { id: 5, cantidad: "100", unidad: "unidades" },
      ];

      setMedidas(mockData);
      setFilteredMedidas(mockData);
      setPagination((prev) => ({
        ...prev,
        totalItems: mockData.length,
        totalPages: Math.ceil(mockData.length / prev.itemsPerPage),
      }));
      setLoading(false);
    };

    fetchMedidas();
  }, []);

  useEffect(() => {
    const filtered = medidas.filter(
      (medida) =>
        medida.cantidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medida.unidad.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedidas(filtered);
    setPagination((prev) => ({
      ...prev,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.itemsPerPage),
      currentPage: 1,
    }));
  }, [searchTerm, medidas]);

  const handleAdd = () => {
    setSelectedMedida(null);
    setIsModalOpen(true);
  };

  const handleEdit = (medida: MedidainterfaceResponse) => {
    setSelectedMedida(medida);
    setIsModalOpen(true);
  };

  const handleDelete = (medida: MedidainterfaceResponse) => {
    setMedidaToDelete(medida);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (medidaToDelete) {
      setMedidas((prev) => prev.filter((m) => m.id !== medidaToDelete.id));
      setMedidaToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  const handleSave = (medidaData: Omit<MedidainterfaceResponse, "id">) => {
    if (selectedMedida) {
      // Editar
      setMedidas((prev) =>
        prev.map((m) =>
          m.id === selectedMedida.id ? { ...selectedMedida, ...medidaData } : m
        )
      );
    } else {
      // Crear
      const newMedida: MedidainterfaceResponse = {
        id: Math.max(...medidas.map((m) => m.id), 0) + 1,
        ...medidaData,
      };
      setMedidas((prev) => [...prev, newMedida]);
    }
    setIsModalOpen(false);
  };

  const getCurrentPageData = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredMedidas.slice(startIndex, endIndex);
  };

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
              medidas={getCurrentPageData()}
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

      <MedidasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        medida={selectedMedida}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Medida"
        message={`¿Estás seguro de que deseas eliminar la medida "${medidaToDelete?.cantidad} ${medidaToDelete?.unidad}"?`}
      />
    </motion.div>
  );
};

export default MedidasView;
