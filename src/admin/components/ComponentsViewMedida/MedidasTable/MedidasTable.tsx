import type React from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { MedidainterfaceResponse } from "../../../interface/medida.interface";
import styles from "./MedidasTable.module.css";

interface MedidasTableProps {
  medidas: MedidainterfaceResponse[];
  onEdit: (medida: MedidainterfaceResponse) => void;
  onDelete: (medida: MedidainterfaceResponse) => void;
}

const MedidasTable: React.FC<MedidasTableProps> = ({
  medidas,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ maxWidth: "30px" }}>ID</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medidas.map((medida, index) => (
            <motion.tr
              key={medida.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td style={{ maxWidth: "30px" }}>{medida.id}</td>
              <td>{medida.cantidad}</td>
              <td>{medida.unidadSimbolo}</td>
              <td>
                <div className={styles.actionsCell}>
                  <motion.button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => onEdit(medida)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiEdit2 />
                  </motion.button>
                  <motion.button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onDelete(medida)}
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

export default MedidasTable;
