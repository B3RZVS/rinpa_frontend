import type React from "react";
import { motion } from "framer-motion";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import type { ViewType } from "../../pages/Home/Home";
import styles from "./Header.module.css";

interface HeaderProps {
  activeView: ViewType;
  onToggleMobileMenu: () => void;
}

const viewTitles: Record<ViewType, string> = {
  dashboard: "",
  medida: "Gestión de Medida",
  "tipo-producto": "Gestión de Tipo Producto",
  producto: "Gestión de Producto",
  cliente: "Gestión de Cliente",
  "realizar-entrega": "Realizar Entrega",
  "ver-entregas": "Ver Entregas",
  "precio-nafta": "Gestión de Precio de Nafta",
};

const Header: React.FC<HeaderProps> = ({ activeView, onToggleMobileMenu }) => {
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
        <h2 className={styles.title}>{viewTitles[activeView]}</h2>
      </div>

      <div className={styles.right}>
        <motion.button
          className={styles.iconButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiBell />
        </motion.button>

        <motion.button
          className={styles.iconButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiUser />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
