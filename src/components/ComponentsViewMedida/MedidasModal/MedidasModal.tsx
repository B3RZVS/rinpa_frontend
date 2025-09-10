import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import type { MedidainterfaceResponse } from "../../../interface/medida.interface";
import styles from "./MedidasModal.module.css";

interface MedidasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medida: Omit<MedidainterfaceResponse, "id">) => void;
  medida?: MedidainterfaceResponse | null;
}

const MedidasModal: React.FC<MedidasModalProps> = ({
  isOpen,
  onClose,
  onSave,
  medida,
}) => {
  const [formData, setFormData] = useState({
    cantidad: "",
    unidad: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (medida) {
      setFormData({
        cantidad: medida.cantidad,
        unidad: medida.unidad,
      });
    } else {
      setFormData({
        cantidad: "",
        unidad: "",
      });
    }
    setErrors({});
  }, [medida, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.cantidad.trim()) {
      newErrors.cantidad = "La cantidad es requerida";
    }

    if (!formData.unidad.trim()) {
      newErrors.unidad = "La unidad es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     onSave(formData);
  //   }
  // };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const result = onSave(formData); // onSave devuelve string de error o undefined
      if (typeof result === "string") {
        setErrors((prev) => ({ ...prev, general: result }));
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                {medida ? "Editar Medida" : "Nueva Medida"}
              </h2>
              <button className={styles.closeButton} onClick={onClose}>
                <FiX />
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Cantidad</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.cantidad}
                  onChange={(e) =>
                    handleInputChange("cantidad", e.target.value)
                  }
                  placeholder="Ej: 500, 1, 250"
                />
                {errors.cantidad && (
                  <span className={styles.error}>{errors.cantidad}</span>
                )}
                {/* Mensaje de error general */}
                {errors.general && (
                  <span className={styles.error}>{errors.general}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Unidad</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.unidad}
                  onChange={(e) => handleInputChange("unidad", e.target.value)}
                  placeholder="Ej: ml, litro, gr, kg, unidades"
                />
                {errors.unidad && (
                  <span className={styles.error}>{errors.unidad}</span>
                )}
              </div>

              <div className={styles.actions}>
                <motion.button
                  type="button"
                  className={`${styles.button} ${styles.cancelButton}`}
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  className={`${styles.button} ${styles.saveButton}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {medida ? "Actualizar" : "Guardar"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MedidasModal;