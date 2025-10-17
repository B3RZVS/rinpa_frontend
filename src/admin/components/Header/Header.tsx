import type React from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onToggleMobileMenu: () => void;
}
const viewTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/realizar-entrega": "Realizar Entrega",
  "/dashboard/ver-entregas": "Ver Entregas",
  "/dashboard/editar-entrega": "Editar Entrega",
  "/dashboard/precio-nafta": "Gestión de Precio de Nafta",
  "/dashboard/cliente": "Gestión de Cliente",
  "/dashboard/producto": "Gestión de Producto",
  "/dashboard/tipo-producto": "Gestión de Tipo de Producto",
  "/dashboard/medida": "Gestión de Medida",
};

const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const pathBase = location.pathname.replace(/\/\d+$/, "");
    const newTitle = viewTitles[pathBase] || "Dashboard";
    setTitle(newTitle);
  }, [location.pathname]);
  return (
    <motion.header
      className={styles.header}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onToggleMobileMenu}>
          <FiMenu />
        </button>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.right}>
        <motion.button
          className={styles.iconButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* <FiBell /> */}
        </motion.button>

        <motion.button
          className={styles.iconButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* <FiUser /> */}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
