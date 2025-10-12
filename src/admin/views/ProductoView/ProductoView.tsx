import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import styles from "./ProductoView.module.css";
import ProductoList from "../../components/ComponentsViewProducto/ProductoList/ProductoList";
import ProductoModal from "../../components/ComponentsViewProducto/ProductoModal/ProductoModal";
import SearchBar from "../../components/ComponentsViewProducto/SearchBar/SearchBar";
import type { ProductoResponseInterface } from "../../interface/producto.interface";
import { useProducto } from "../../hook/hookContexts/useProducto";
const ProductoView: React.FC = () => {
  const { getProductos, productos, loading, registerProducto } = useProducto();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProducto, setEditingProducto] =
    useState<ProductoResponseInterface | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProductos();
  }, []);
  const handleAddProducto = () => {
    setEditingProducto(null);
    setIsModalOpen(true);
  };

  const handleEditProducto = (producto: ProductoResponseInterface) => {
    setEditingProducto(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProducto(null);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2>Gestión de Productos</h2>
          <p className={styles.subtitle}>Administra el catálogo de productos</p>
        </div>
        <button className={styles.addButton} onClick={handleAddProducto}>
          <FiPlus />
          <span>Nuevo</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className={styles.searchSection}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <ProductoList
          productos={productos}
          loading={loading}
          searchTerm={searchTerm}
          onEditProducto={handleEditProducto}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductoModal
          producto={editingProducto}
          onClose={handleCloseModal}
          onSave={registerProducto}
        />
      )}
    </motion.div>
  );
};

export default ProductoView;
