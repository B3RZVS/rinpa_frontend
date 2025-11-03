import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProductoList.module.css";
import ProductoCard from "../ProductoCard/ProductoCard";
import type { ProductoResponseInterface } from "../../../interface/producto.interface";
import { useState } from "react";
import ConfirmationModal from "../../../../shared/components/ConfirmationModal/ConfirmationModal";
import { useProducto } from "../../../hook/hookContexts/useProducto";
interface ProductoListProps {
  searchTerm: string;
  onEditProducto: (producto: ProductoResponseInterface) => void;
  productos: ProductoResponseInterface[];
  loading: boolean;
}

const ProductoList: React.FC<ProductoListProps> = ({
  searchTerm,
  onEditProducto,
  productos,
  loading,
}) => {
  const { deleteProducto } = useProducto();
  const [productoDelete, setProductoDelete] =
    useState<ProductoResponseInterface>();
  const [isOpen, setIsOpen] = useState(false);

  const filteredProductos = productos.filter((producto) => {
    const descripcion = producto.descripcion?.toLowerCase() ?? "";
    const tipoProducto = producto.tipoProducto?.toLowerCase() ?? "";
    const term = searchTerm?.toLowerCase() ?? "";

    return descripcion.includes(term) || tipoProducto.includes(term);
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (filteredProductos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No se encontraron productos</p>
        {searchTerm && (
          <p className={styles.emptySubtext}>
            Intenta con otros términos de búsqueda
          </p>
        )}
      </div>
    );
  }
  const onDelete = (producto: ProductoResponseInterface) => {
    setProductoDelete(producto);
    setIsOpen(true);
  };
  const confirmationDelete = () => {
    if (productoDelete) {
      console.log(productoDelete.id);
      deleteProducto(productoDelete.id);
    }
    setIsOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.resultsHeader}>
        <span className={styles.resultsCount}>
          {filteredProductos.length} producto
          {filteredProductos.length !== 1 ? "s" : ""}
        </span>
      </div>

      <motion.div className={styles.productGrid}>
        <AnimatePresence>
          {filteredProductos.map((producto, index) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductoCard
                producto={producto}
                onEdit={() => onEditProducto(producto)}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {productoDelete && (
        <ConfirmationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`Desea borrar el producto ${productoDelete.tipoProducto} ${productoDelete.medida}`}
          onConfirm={confirmationDelete}
          message="¿Esta seguro que desea borrar el producto?"
        />
      )}
    </div>
  );
};

export default ProductoList;
