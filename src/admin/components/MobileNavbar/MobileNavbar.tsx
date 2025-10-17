import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiSettings,
  FiPackage,
  FiBox,
  FiUsers,
  FiTruck,
  FiList,
  //   FiFuel,
  FiX,
} from "react-icons/fi";
import type { ViewType } from "../../pages/Home/Home";
import logo from "/logo/RinpaLogo.jpeg";
import styles from "./MobileNavbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileNavbarProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const menuItems = [
  { id: "home" as ViewType, label: "Dashboard", icon: FiHome },
  {
    id: "realizar-entrega" as ViewType,
    label: "Realizar Entrega",
    icon: FiTruck,
  },
  { id: "ver-entregas" as ViewType, label: "Ver Entregas", icon: FiList },
  {
    id: "precio-nafta" as ViewType,
    label: "Gestión de Precio de Nafta",
    // icon: FiFuel,
    icon: FiTruck,
  },
  { id: "producto" as ViewType, label: "Gestión de Producto", icon: FiBox },
  {
    id: "tipo-producto" as ViewType,
    label: "Gestión de Tipo Producto",
    icon: FiPackage,
  },
  { id: "cliente" as ViewType, label: "Gestión de Cliente", icon: FiUsers },
  { id: "medida" as ViewType, label: "Gestión de Medida", icon: FiSettings },
];

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (view: string) => location.pathname.includes(view);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={styles.desktopSidebar}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.header}>
          <motion.div
            className={styles.logo}
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={logo} alt="Logo" />
          </motion.div>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              className={`${styles.navItem} ${
                isActive(item.id) ? styles.active : ""
              }`}
              onClick={() => navigate(`/dashboard/${item.id}`)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className={styles.icon} />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileBottomNav}>
        {menuItems.slice(0, 4).map((item) => (
          <motion.button
            key={item.id}
            className={`${styles.mobileNavItem} ${
              isActive(item.id) ? styles.active : ""
            }`}
            onClick={() => {
              navigate(`/dashboard/${item.id}`);
              onToggleMobileMenu();
            }}
            whileTap={{ scale: 0.9 }}
          >
            <item.icon className={styles.mobileIcon} />
            <span className={styles.mobileLabel}>
              {item.label.split(" ")[0]}
            </span>
          </motion.button>
        ))}
      </nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggleMobileMenu}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              <div className={styles.mobileMenuHeader}>
                <img src={logo} alt="Logo" />
                <button
                  className={styles.closeButton}
                  onClick={onToggleMobileMenu}
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.mobileMenuContent}>
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`${styles.mobileMenuItem} ${
                      isActive(item.id) ? styles.active : ""
                    }`}
                    onClick={() => {
                      navigate(`/dashboard/${item.id}`);
                      onToggleMobileMenu();
                    }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className={styles.icon} />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
