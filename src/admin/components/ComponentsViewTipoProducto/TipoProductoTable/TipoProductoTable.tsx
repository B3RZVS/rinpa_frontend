import type React from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { TipoProductoInterfaceResponse } from "../../../interface/tipoProducto.interface";
import styles from "./TipoProductoTable.module.css";

interface TipoProductoTableProps {
  tipoProductos: TipoProductoInterfaceResponse[];
  onEdit: (tipoProducto: TipoProductoInterfaceResponse) => void;
  onDelete: (tipoProducto: TipoProductoInterfaceResponse) => void;
}

const TipoProductoTable: React.FC<TipoProductoTableProps> = ({
  tipoProductos,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th className={styles.actionsCell}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipoProductos.map((tipoProducto, index) => (
            <motion.tr
              key={tipoProducto.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: index % 2 === 0 ? "rgba(182, 182, 182, 0.21)" : "",
              }}
            >
              <td>{tipoProducto.id}</td>
              <td>{tipoProducto.nombre}</td>
              <td>
                <div className={styles.actionsCell}>
                  <motion.button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => onEdit(tipoProducto)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiEdit2 />
                  </motion.button>
                  <motion.button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onDelete(tipoProducto)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipoProductoTable;
