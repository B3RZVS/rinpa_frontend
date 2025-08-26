import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import type { TipoProductoInterfaceResponse } from "../../../interface/tipoProducto.interface";
import styles from "./TipoProductoModal.module.css";

interface TipoProductoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tipoProducto: Omit<TipoProductoInterfaceResponse, "id">) => void;
  tipoProducto?: TipoProductoInterfaceResponse | null;
}

const TipoProductoModal: React.FC<TipoProductoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  tipoProducto,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (tipoProducto) {
      setFormData({
        nombre: tipoProducto.nombre,
      });
    } else {
      setFormData({
        nombre: "",
      });
    }
    setErrors({});
  }, [tipoProducto, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ nombre: formData.nombre.trim() });
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
                {tipoProducto
                  ? "Editar Tipo de Producto"
                  : "Nuevo Tipo de Producto"}
              </h2>
              <button className={styles.closeButton} onClick={onClose}>
                <FiX />
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nombre</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ej: Bebidas, Alimentos, Limpieza"
                />
                {errors.nombre && (
                  <span className={styles.error}>{errors.nombre}</span>
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
                  {tipoProducto ? "Actualizar" : "Guardar"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TipoProductoModal;
