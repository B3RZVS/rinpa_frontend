import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { ClienteInterfaceResponse } from "../../../interface/cliente.interface";
import styles from "./ClienteTable.module.css";
import PaginateComponent from "../../PaginateComponent/PaginateComponent";
import type { PaginationInfo } from "../../../interface/pagination.interface";

interface ClienteTableProps {
  clientes: ClienteInterfaceResponse[];
  onEdit: (cliente: ClienteInterfaceResponse) => void;
  onDelete: (cliente: ClienteInterfaceResponse) => void;
  paginationInfo: PaginationInfo;
}

const ClienteTable: React.FC<ClienteTableProps> = ({
  clientes,
  onEdit,
  onDelete,
  paginationInfo,
}) => {
  return (
    <PaginateComponent
      background="transparent"
      backgroundPagination="rgba(255, 255, 255, 0.54)"
      {...(paginationInfo && {
        pagination: {
          currentPage: paginationInfo.currentPage,
          totalPages: paginationInfo.totalPages,
          pageSize: paginationInfo.page_size,
          totalItems: paginationInfo.totalItems,
          onPageChange: paginationInfo.onPageChange,
          onPageSizeChange: paginationInfo.onPageSizeChange,
        },
      })}
    >
      <motion.div
        className={styles.tableContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Descripción</th>
                <th className={styles.actionsHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <motion.tr
                  key={cliente.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{
                    background:
                      index % 2 === 0 ? "rgba(182, 182, 182, 0.21)" : "",
                  }}
                >
                  <td className={styles.nombreCell}>{cliente.nombre}</td>
                  <td className={styles.apellidoCell}>{cliente.apellido}</td>
                  <td className={styles.emailCell}>{cliente.email}</td>
                  <td className={styles.telefonoCell}>{cliente.telefono}</td>
                  <td className={styles.direccionCell}>{cliente.direccion}</td>
                  <td
                    className={styles.descripcionCell}
                    title={cliente.descripcion || "Sin descripción"}
                  >
                    {cliente.descripcion || "Sin descripción"}
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <motion.button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => onEdit(cliente)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Editar cliente"
                      >
                        <FiEdit2 size={16} />
                      </motion.button>
                      <motion.button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => onDelete(cliente)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Eliminar cliente"
                      >
                        <FiTrash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </PaginateComponent>
  );
};

export default ClienteTable;
