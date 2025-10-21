import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import EntregaCard from "../../components/ComponentsViewEntrega/EntregaCard/EntregaCard";
import styles from "./VerEntregasView.module.css";
import { useEntrega } from "../../hook/hookContexts/useEntrega";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const VerEntregasView = () => {
  const navigate = useNavigate();
  const { entregas, getEntregas, loading } = useEntrega();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (entregas.length <= 0) {
      getEntregas();
    }
  }, []);

  const filteredEntregas = entregas.filter((entrega) =>
    entrega.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNuevaEntrega = () => {
    navigate("/home?view=realizar-entrega&mode=create");
  };

  const handleEditEntrega = (id: number) => {
    navigate(`/dashboard/editar-entrega/${id}`);
  };
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
        <button
          className={`${styles.filterButton} ${
            filterOpen ? styles.active : ""
          }`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <FiFilter />
        </button>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <motion.div
          className={styles.filterPanel}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <p>Filtros adicionales (por implementar)</p>
        </motion.div>
      )}

      {/* Entregas List */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Cargando entregas...</p>
          </div>
        ) : filteredEntregas.length === 0 ? (
          <div className={styles.empty}>
            <p>No se encontraron entregas</p>
            <button className={styles.emptyButton} onClick={handleNuevaEntrega}>
              Crear primera entrega
            </button>
          </div>
        ) : (
          <div className={styles.entregasList}>
            {filteredEntregas.map((entrega, index) => (
              <EntregaCard
                key={entrega.id}
                entrega={entrega}
                index={index}
                onEdit={handleEditEntrega}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VerEntregasView;
