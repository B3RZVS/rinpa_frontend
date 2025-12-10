import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiSave,
  FiDollarSign,
  FiType,
  FiPackage,
  FiFileText,
} from "react-icons/fi";
import styles from "./ProductoModal.module.css";

import type {
  ProductoResponseInterface,
  CreateProductoInterface,
  UpdateProductoInterface,
} from "../../../interface/producto.interface";
import { useTipoProducto } from "../../../hook/hookContexts/useTipoProducto";
import { useMedida } from "../../../hook/hookContexts/useMedida";
interface ProductoModalProps {
  producto?: ProductoResponseInterface | null;
  onClose: () => void;
  onSave?: (producto: CreateProductoInterface) => void;
  onSaveEdit?: (producto: UpdateProductoInterface) => void;
}

const ProductoModal: React.FC<ProductoModalProps> = ({
  producto,
  onClose,
  onSave,
  onSaveEdit,
}) => {
  const { getTipoProductos, tipoProductos } = useTipoProducto();
  const { getMedidas, medidas } = useMedida();
  const [formData, setFormData] = useState({
    descripcion: "",
    precio: "",
    tipoProductoId: "",
    medidaId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tipoProductos.length <= 0) {
      getTipoProductos();
    }
    if (medidas.length <= 0) {
      getMedidas();
    }
  }, []);

  useEffect(() => {
    if (producto) {
      setFormData({
        descripcion: producto.descripcion,
        precio: producto.precio.toString(),
        tipoProductoId: String(producto.tipoProductoId),
        medidaId: String(producto.medidaId),
      });
    }
  }, [producto]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (
      !formData.precio ||
      isNaN(Number(formData.precio)) ||
      Number(formData.precio) <= 0
    ) {
      newErrors.precio = "El precio debe ser un número mayor a 0";
    }

    if (!formData.tipoProductoId) {
      newErrors.tipoProductoId = "Selecciona un tipo de producto";
    }

    if (!formData.medidaId) {
      newErrors.medidaId = "Selecciona una medida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const productData = {
        descripcion:
          formData.descripcion !== undefined ? formData.descripcion.trim() : "",
        precio: Number(formData.precio),
        tipoProductoId: Number(formData.tipoProductoId),
        medidaId: Number(formData.medidaId),
      };

      if (producto) {
        const updateData: UpdateProductoInterface = {
          id: producto.id,
          ...productData,
        };
        onSaveEdit?.(updateData);
      } else {
        // Crear nuevo producto
        const createData: CreateProductoInterface = productData;
        onSave?.(createData);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    } finally {
      setLoading(false);
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
            <h2>{producto ? "Editar Producto" : "Nuevo Producto"}</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <FiX />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiType className={styles.labelIcon} />
                Tipo de Producto
              </label>
              <select
                value={formData.tipoProductoId}
                onChange={(e) =>
                  handleInputChange("tipoProductoId", e.target.value)
                }
                className={`${styles.select} ${
                  errors.tipoProductoId ? styles.inputError : ""
                }`}
                disabled={producto ? true : false}
              >
                <option value="">Seleccionar tipo</option>
                {tipoProductos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
              {errors.tipoProductoId && (
                <span className={styles.errorText}>
                  {errors.tipoProductoId}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiPackage className={styles.labelIcon} />
                Medida
              </label>
              <select
                value={formData.medidaId}
                onChange={(e) => handleInputChange("medidaId", e.target.value)}
                className={`${styles.select} ${
                  errors.medidaId ? styles.inputError : ""
                }`}
                disabled={producto ? true : false}
              >
                <option value="">Seleccionar medida</option>
                {medidas.map((medida) => (
                  <option key={medida.id} value={medida.id}>
                    {medida.cantidad} ({medida.unidadSimbolo})
                  </option>
                ))}
              </select>
              {errors.medidaId && (
                <span className={styles.errorText}>{errors.medidaId}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiDollarSign className={styles.labelIcon} />
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                value={formData.precio}
                onChange={(e) => handleInputChange("precio", e.target.value)}
                className={`${styles.input} ${
                  errors.precio ? styles.inputError : ""
                }`}
                placeholder="0.00"
              />
              {errors.precio && (
                <span className={styles.errorText}>{errors.precio}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiFileText className={styles.labelIcon} />
                Descripción
              </label>
              <input
                type="text"
                value={formData.descripcion}
                onChange={(e) =>
                  handleInputChange("descripcion", e.target.value)
                }
                className={`${styles.input} ${
                  errors.descripcion ? styles.inputError : ""
                }`}
                placeholder="Ej: Nafta Super 95"
              />
              {errors.descripcion && (
                <span className={styles.errorText}>{errors.descripcion}</span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={loading}
              >
                <FiSave />
                {producto
                  ? loading
                    ? "Actualizando..."
                    : "Actualizar"
                  : loading
                  ? "Guardando..."
                  : "Guardar"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductoModal;
