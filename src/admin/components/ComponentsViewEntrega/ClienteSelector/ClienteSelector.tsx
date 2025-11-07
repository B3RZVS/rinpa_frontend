import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiUser, FiChevronDown, FiX } from "react-icons/fi";
import type { ClienteInterfaceResponse } from "../../../interface/cliente.interface";
import styles from "./ClienteSelector.module.css";
import { useCliente } from "../../../hook/hookContexts/useCliente";
interface ClienteSelectorProps {
  selectedCliente: ClienteInterfaceResponse | null;
  onSelectCliente: (cliente: ClienteInterfaceResponse | null) => void;
}

const ClienteSelector: React.FC<ClienteSelectorProps> = ({
  selectedCliente,
  onSelectCliente,
}) => {
  const { clientes, getClientes, loading } = useCliente();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clientes.length <= 0) getClientes();
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
                {selectedCliente.nombre} {selectedCliente.apellido}
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
                        {cliente.nombre} {cliente.apellido}
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
