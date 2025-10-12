import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiUser, FiChevronDown, FiX } from "react-icons/fi";
import type { ClienteInterfaceResponse } from "../../../interface/cliente.interface";
import styles from "./ClienteSelector.module.css";

interface ClienteSelectorProps {
  selectedCliente: ClienteInterfaceResponse | null;
  onSelectCliente: (cliente: ClienteInterfaceResponse | null) => void;
}

const ClienteSelector: React.FC<ClienteSelectorProps> = ({
  selectedCliente,
  onSelectCliente,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes, setClientes] = useState<ClienteInterfaceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Reemplazar con llamada real a la API
    setLoading(true);
    setTimeout(() => {
      setClientes([
        {
          id: 1,
          nombre: "Juan Pérez",
          apellido: "gonzalez",
          direccion: "Av. Siempreviva 123",
          telefono: "123-456-7890",
          email: "ramiroberruezo",
          descripcion: "hola",
        },
        {
          id: 2,
          nombre: "María González",
          apellido: "gonzalez",
          direccion: "Calle Falsa 456",
          telefono: "098-765-4321",
          email: "ramiroberruezo",
          descripcion: "hola",
        },
        {
          id: 3,
          nombre: "Carlos Rodríguez",
          apellido: "gonzalez",
          direccion: "Av. Libertador 789",
          telefono: "111-222-3333",
          email: "ramiroberruezo",
          descripcion: "hola",
        },
        {
          id: 4,
          nombre: "Ana Martínez",
          apellido: "gonzalez",
          direccion: "Calle Principal 321",
          telefono: "444-555-6666",
          email: "ramiroberruezo",
          descripcion: "hola",
        },
        {
          id: 5,
          nombre: "Pedro Sánchez",
          apellido: "gonzalez",
          direccion: "Av. Central 654",
          telefono: "777-888-9999",
          email: "ramiroberruezo",
          descripcion: "hola",
        },
        {
          id: 6,
          nombre: "Laura Fernández",
          apellido: "gonzalez",
          direccion: "Calle Secundaria 987",
          telefono: "000-111-2222",
          email: "ramiroberruezo",
          descripcion: "hola",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCliente = (cliente: ClienteInterfaceResponse) => {
    onSelectCliente(cliente);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClearSelection = () => {
    onSelectCliente(null);
    setSearchTerm("");
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Selected Cliente Display */}
      {selectedCliente ? (
        <div className={styles.selectedCliente}>
          <div className={styles.clienteInfo}>
            <FiUser className={styles.icon} />
            <div className={styles.clienteDetails}>
              <span className={styles.clienteNombre}>
                {selectedCliente.nombre}
              </span>
              {selectedCliente.direccion && (
                <span className={styles.clienteDireccion}>
                  {selectedCliente.direccion}
                </span>
              )}
            </div>
          </div>
          <button
            className={styles.clearButton}
            onClick={handleClearSelection}
            type="button"
          >
            <FiX />
          </button>
        </div>
      ) : (
        <button
          className={styles.selectButton}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <FiUser className={styles.icon} />
          <span>Seleccionar cliente</span>
          <FiChevronDown
            className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          />
        </button>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search Bar */}
            <div className={styles.searchBar}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
            </div>

            {/* Clientes List */}
            <div className={styles.clientesList}>
              {loading ? (
                <div className={styles.loading}>
                  <div className={styles.spinner} />
                  <span>Cargando clientes...</span>
                </div>
              ) : filteredClientes.length === 0 ? (
                <div className={styles.empty}>
                  <span>No se encontraron clientes</span>
                </div>
              ) : (
                filteredClientes.map((cliente) => (
                  <button
                    key={cliente.id}
                    className={styles.clienteItem}
                    onClick={() => handleSelectCliente(cliente)}
                    type="button"
                  >
                    <FiUser className={styles.clienteIcon} />
                    <div className={styles.clienteItemDetails}>
                      <span className={styles.clienteItemNombre}>
                        {cliente.nombre}
                      </span>
                      {cliente.direccion && (
                        <span className={styles.clienteItemDireccion}>
                          {cliente.direccion}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClienteSelector;
