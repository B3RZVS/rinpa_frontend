import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { ClienteInterfaceResponse } from "../../../interface/cliente.interface";
import styles from "./ClienteTable.module.css";

interface ClienteTableProps {
  clientes: ClienteInterfaceResponse[];
  onEdit: (cliente: ClienteInterfaceResponse) => void;
  onDelete: (cliente: ClienteInterfaceResponse) => void;
}

const ClienteTable: React.FC<ClienteTableProps> = ({
  clientes,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      className={styles.tableContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <motion.tr
              key={cliente.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td className={styles.emailCell}>{cliente.email}</td>
              <td className={styles.telefonoCell}>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td
                className={styles.descripcionCell}
                title={cliente.descripcion || "Sin descripción"}
              >
                {cliente.descripcion || "Sin descripción"}
              </td>
              <td>
                <div className={styles.actionsCell}>
                  <motion.button
                    className={styles.editButton}
                    onClick={() => onEdit(cliente)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Editar cliente"
                  >
                    <FiEdit2 size={16} />
                  </motion.button>
                  <motion.button
                    className={styles.deleteButton}
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
    </motion.div>
  );
};

export default ClienteTable;
