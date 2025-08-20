import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import Header from "../../components/Header/Header";
import Dashboard from "../../views/Dashboard/Dashboard";
import MedidaView from "../../views/MedidaView/MedidaView";
import TipoProductoView from "../../views/TipoProductoView/TipoProductoView";
import ProductoView from "../../views/ProductoView/ProductoView";
import ClienteView from "../../views/ClienteView/ClienteView";
import RealizarEntregaView from "../../views/RealizarEntregaView/RealizarEntregaView";
import VerEntregasView from "../../views/VerEntregasView/VerEntregasView";
import PrecioNaftaView from "../../views/PrecioNaftaView/PrecioNaftaView";
import styles from "./Home.module.css";
export type ViewType =
  | "dashboard"
  | "realizar-entrega"
  | "ver-entregas"
  | "precio-nafta"
  | "cliente"
  | "producto"
  | "tipo-producto"
  | "medida";

const Home: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "realizar-entrega":
        return <RealizarEntregaView />;
      case "ver-entregas":
        return <VerEntregasView />;
      case "cliente":
        return <ClienteView />;
      case "producto":
        return <ProductoView />;
      case "tipo-producto":
        return <TipoProductoView />;
      case "precio-nafta":
        return <PrecioNaftaView />;
      case "medida":
        return <MedidaView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.home}>
      <MobileNavbar
        activeView={activeView}
        onViewChange={setActiveView}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <div className={styles.mainContent}>
        <Header
          activeView={activeView}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <motion.main
          className={styles.content}
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.main>
      </div>
    </div>
  );
};

export default Home;
