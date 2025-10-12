import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDollarSign } from "react-icons/fa";
import styles from "./NuevoPrecioModal.module.css";

interface NuevoPrecioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (precio: number) => void;
  precioActual?: number;
}

const NuevoPrecioModal = ({
  isOpen,
  onClose,
  onSubmit,
  precioActual,
}: NuevoPrecioModalProps) => {
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPrecio("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const precioNumero = Number.parseFloat(precio);

    if (!precio || isNaN(precioNumero)) {
      setError("Por favor ingrese un precio válido");
      return;
    }

    if (precioNumero <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    onSubmit(precioNumero);
  };

  const calcularDiferencia = () => {
    if (!precioActual || !precio) return null;
    const precioNumero = Number.parseFloat(precio);
    if (isNaN(precioNumero)) return null;

    const diferencia = ((precioNumero - precioActual) / precioActual) * 100;
    return diferencia;
  };

  const diferencia = calcularDiferencia();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>Actualizar Precio de Nafta</h3>
              <button className={styles.closeButton} onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            {precioActual && (
              <div className={styles.precioActualInfo}>
                <span className={styles.label}>Precio actual:</span>
                <span className={styles.precioActualValor}>
                  ${precioActual.toFixed(2)}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="precio" className={styles.label}>
                  Nuevo Precio
                </label>
                <div className={styles.inputWrapper}>
                  <FaDollarSign className={styles.inputIcon} />
                  <input
                    id="precio"
                    type="number"
                    step="0.01"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="0.00"
                    className={styles.input}
                    autoFocus
                  />
                </div>
                {error && <span className={styles.error}>{error}</span>}
              </div>

              {diferencia !== null && (
                <div
                  className={`${styles.diferencia} ${
                    diferencia > 0 ? styles.aumento : styles.disminucion
                  }`}
                >
                  <span className={styles.diferenciaLabel}>
                    {diferencia > 0 ? "Aumento" : "Disminución"}:
                  </span>
                  <span className={styles.diferenciaValor}>
                    {diferencia > 0 ? "+" : ""}
                    {diferencia.toFixed(2)}%
                  </span>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                  Actualizar Precio
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NuevoPrecioModal;
