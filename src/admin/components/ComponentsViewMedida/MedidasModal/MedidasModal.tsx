import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import type {
  CreateMedidaInterface,
  MedidainterfaceResponse,
} from "../../../interface/medida.interface";
import styles from "./MedidasModal.module.css";
import { useMedida } from "../../../hook/hookContexts/useMedida";

interface MedidasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medida: CreateMedidaInterface) => void;
  medida?: MedidainterfaceResponse | null;
}

const MedidasModal: React.FC<MedidasModalProps> = ({
  isOpen,
  onClose,
  onSave,
  medida,
}) => {
  const [formData, setFormData] = useState<CreateMedidaInterface>({
    cantidad: null,
    unidadId: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { unidades, getUnidades } = useMedida();

  useEffect(() => {
    getUnidades();
  }, []);

  useEffect(() => {
    if (medida) {
      setFormData({
        cantidad: Number(medida.cantidad),
        unidadId: medida.unidadId,
      });
    }
    setErrors({});
  }, [medida, isOpen]);

  const resetForm = () => {
    setFormData({ cantidad: null, unidadId: null });
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.cantidad == null || formData.cantidad <= 0) {
      newErrors.cantidad = "La cantidad es requerida";
    }
    if (formData.unidadId == null) {
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

    onClose();
    resetForm();
  };

  const handleInputChange = (field: string, value: number) => {
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
                  type="number"
                  className={styles.input}
                  value={formData.cantidad ?? ""}
                  onChange={(e) =>
                    handleInputChange("cantidad", Number(e.target.value))
                  }
                  placeholder="Ej: 500, 1, 250"
                  min={0}
                  required
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
                <select
                  className={styles.input}
                  value={formData.unidadId ?? ""}
                  onChange={(e) =>
                    handleInputChange("unidadId", Number(e.target.value))
                  }
                  required
                >
                  <option value="">Selecciona una unidad</option>
                  {unidades.map((unidad) => (
                    <option key={unidad.id} value={unidad.id}>
                      {unidad.nombre}
                    </option>
                  ))}
                </select>
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
