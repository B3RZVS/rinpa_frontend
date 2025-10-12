import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import EntregaCard from "../../components/ComponentsViewEntrega/EntregaCard/EntregaCard";
import styles from "./VerEntregasView.module.css";
import type { EntregaInterfaceResponse } from "../../interface/entrega.interface";

const VerEntregasView: React.FC = () => {
  const navigate = useNavigate();
  const [entregas, setEntregas] = useState<EntregaInterfaceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    // TODO: Reemplazar con llamada real a la API
    setTimeout(() => {
      setEntregas([
        {
          id: 1,
          clienteId: 1,
          clienteNombre: "Juan Pérez",
          usuarioId: 1,
          usuarioNombre: "Admin",
          fecha: new Date("2024-01-15"),
          precioNafta: 850,
          litrosGastados: 15,
          consumoTotal: 12750,
          detalles: [
            {
              id: 1,
              producto: {
                id: 1,
                precio: 5000,
                descripcion: "Cemento Portland",
                tipoProducto: "Cemento",
                medida: "Bolsa 50kg",
              },
              cantidad: 10,
              precioUnitario: 5000,
              subTotal: 50000,
            },
          ],
        },
        {
          id: 2,
          clienteId: 2,
          clienteNombre: "María González",
          usuarioId: 1,
          usuarioNombre: "Admin",
          fecha: new Date("2024-01-14"),
          precioNafta: 850,
          litrosGastados: 20,
          consumoTotal: 17000,
          detalles: [],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredEntregas = entregas.filter((entrega) =>
    entrega.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNuevaEntrega = () => {
    navigate("/home?view=realizar-entrega&mode=create");
  };

  const handleEditEntrega = (id: number) => {
    navigate(`/home?view=realizar-entrega&mode=edit&id=${id}`);
  };

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
