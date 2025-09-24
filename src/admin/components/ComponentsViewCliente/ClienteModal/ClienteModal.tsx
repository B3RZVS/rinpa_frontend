import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import type {
  ClienteInterfaceResponse,
  CreateClienteInterface,
} from "../../../interface/cliente.interface";
import styles from "./ClienteModal.module.css";

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: CreateClienteInterface) => void;
  cliente?: ClienteInterfaceResponse | null;
}

const ClienteModal: React.FC<ClienteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cliente,
}) => {
  const [formData, setFormData] = useState<CreateClienteInterface>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    descripcion: "",
    direccion: "",
  });

  const [errors, setErrors] = useState<Partial<CreateClienteInterface>>({});

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono,
        email: cliente.email,
        descripcion: cliente.descripcion || "",
        direccion: cliente.direccion,
      });
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        descripcion: "",
        direccion: "",
      });
    }
    setErrors({});
  }, [cliente, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateClienteInterface> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    }

    // if (!formData.direccion.trim()) {
    //   newErrors.direccion = "La dirección es requerida";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        descripcion: formData.descripcion ? formData.descripcion.trim() : null,
      });
    }
  };

  const handleInputChange = (
    field: keyof CreateClienteInterface,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                {cliente ? "Editar Cliente" : "Agregar Cliente"}
              </h2>
              <motion.button
                className={styles.closeButton}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={24} />
              </motion.button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Nombre <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.nombre}
                    onChange={(e) =>
                      handleInputChange("nombre", e.target.value)
                    }
                    placeholder="Ingrese el nombre"
                  />
                  {errors.nombre && (
                    <span className={styles.required}>{errors.nombre}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Apellido <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.apellido}
                    onChange={(e) =>
                      handleInputChange("apellido", e.target.value)
                    }
                    placeholder="Ingrese el apellido"
                  />
                  {errors.apellido && (
                    <span className={styles.required}>{errors.apellido}</span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="ejemplo@email.com"
                  />
                  {errors.email && (
                    <span className={styles.required}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Teléfono <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={formData.telefono}
                    onChange={(e) =>
                      handleInputChange("telefono", e.target.value)
                    }
                    placeholder="+54 11 1234-5678"
                  />
                  {errors.telefono && (
                    <span className={styles.required}>{errors.telefono}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Dirección <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.direccion}
                  onChange={(e) =>
                    handleInputChange("direccion", e.target.value)
                  }
                  placeholder="Ingrese la dirección completa"
                />
                {errors.direccion && (
                  <span className={styles.required}>{errors.direccion}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Descripción</label>
                <textarea
                  className={styles.textarea}
                  value={formData.descripcion || ""}
                  onChange={(e) =>
                    handleInputChange("descripcion", e.target.value)
                  }
                  placeholder="Descripción adicional del cliente (opcional)"
                />
              </div>

              <div className={styles.actions}>
                <motion.button
                  type="button"
                  className={styles.cancelButton}
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  className={styles.saveButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cliente ? "Actualizar" : "Guardar"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClienteModal;
