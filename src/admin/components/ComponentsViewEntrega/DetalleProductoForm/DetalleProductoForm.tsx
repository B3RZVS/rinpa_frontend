import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiSearch } from "react-icons/fi";
import styles from "./DetalleProductoForm.module.css";
import type { CreateDetalleProductoInterface } from "../../../interface/detalle.interface";
import type { ProductoResponseInterface } from "../../../interface/producto.interface";
import { useProducto } from "../../../hook/hookContexts/useProducto";
interface DetalleProductoFormProps {
  onAdd: (detalle: CreateDetalleProductoInterface) => void;
  onCancel: () => void;
}

const DetalleProductoForm: React.FC<DetalleProductoFormProps> = ({
  onAdd,
  onCancel,
}) => {
  const { productos, getProductos, loading } = useProducto();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducto, setSelectedProducto] =
    useState<ProductoResponseInterface | null>(null);
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    if (productos.length <= 0) getProductos();
  }, []);

  const filteredProductos = productos.filter(
    (producto) =>
      producto.medida.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.tipoProducto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProducto = (producto: ProductoResponseInterface) => {
    setSelectedProducto(producto);
    setSearchTerm("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProducto) {
      alert("Debe seleccionar un producto");
      return;
    }

    if (!cantidad || Number.parseFloat(cantidad) <= 0) {
      alert("Debe ingresar una cantidad válida");
      return;
    }

    const nuevoDetalle: CreateDetalleProductoInterface = {
      productoId: selectedProducto.id,
      cantidad: Number.parseFloat(cantidad),
      precioUnitario: selectedProducto.precio,
      productoNombre: `${selectedProducto.tipoProducto} ${selectedProducto.medida}`,
    };

    onAdd(nuevoDetalle);
  };

  const subTotal =
    selectedProducto && cantidad
      ? Number.parseFloat(cantidad) * selectedProducto.precio
      : 0;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <h4>Agregar Producto</h4>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onCancel}
          >
            <FiX />
          </button>
        </div>

        {/* Producto Selector */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Producto *</label>
          {selectedProducto ? (
            <div className={styles.selectedProducto}>
              <div className={styles.productoInfo}>
                <span className={styles.productoNombre}>
                  {selectedProducto.descripcion}
                </span>
                <span className={styles.productoDetalle}>
                  {selectedProducto.tipoProducto} - {selectedProducto.medida}
                </span>
              </div>
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setSelectedProducto(null)}
              >
                <FiX />
              </button>
            </div>
          ) : (
            <>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              {searchTerm && (
                <div className={styles.productosList}>
                  {loading ? (
                    <div className={styles.loading}>
                      <div className={styles.spinner} />
                    </div>
                  ) : filteredProductos.length === 0 ? (
                    <div className={styles.empty}>
                      No se encontraron productos
                    </div>
                  ) : (
                    filteredProductos.map((producto) => (
                      <button
                        key={producto.id}
                        type="button"
                        className={styles.productoItem}
                        onClick={() => handleSelectProducto(producto)}
                      >
                        <span className={styles.productoItemNombre}>
                          {producto.tipoProducto} - {producto.medida}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Cantidad y Precio */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cantidad *</label>
            <input
              type="number"
              step="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="0"
              min={0}
              className={styles.input}
              disabled={!selectedProducto}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Precio Unitario *</label>
            <input
              type="number"
              step="0.01"
              value={selectedProducto?.precio}
              className={styles.input}
              disabled
            />
          </div>
        </div>

        {/* Subtotal */}
        {subTotal > 0 && (
          <div className={styles.subtotal}>
            <span>Subtotal:</span>
            <span className={styles.subtotalValue}>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0,
              }).format(subTotal)}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.addButton}
            disabled={!selectedProducto || !cantidad}
          >
            <FiPlus />
            <span>Agregar</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default DetalleProductoForm;
