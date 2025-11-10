import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import styles from "./FechaSelector.module.css";

interface FechaSelectorProps {
  onConsultar: (fechaInicio: string, fechaFin: string) => void;
  loading?: boolean;
}

const FechaSelector: React.FC<FechaSelectorProps> = ({
  onConsultar,
  loading = false,
}) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fechaInicio && fechaFin) {
      onConsultar(fechaInicio, fechaFin);
    }
  };

  const isValid = fechaInicio && fechaFin && fechaInicio <= fechaFin;

  return (
    <motion.form
      className={styles.container}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.dateInputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaCalendarAlt className={styles.labelIcon} />
            Fecha Inicio
          </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className={styles.input}
            required
            max={fechaFin || undefined}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaCalendarAlt className={styles.labelIcon} />
            Fecha Fin
          </label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className={styles.input}
            required
            min={fechaInicio || undefined}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        className={styles.button}
        disabled={!isValid || loading}
        whileHover={isValid && !loading ? { scale: 1.02 } : {}}
        whileTap={isValid && !loading ? { scale: 0.98 } : {}}
      >
        {loading ? (
          <>
            <div className={styles.spinner} />
            Consultando...
          </>
        ) : (
          <>
            <FaSearch />
            Consultar
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default FechaSelector;
