import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import Header from "../../components/Header/Header";
import Dashboard from "../../views/Dashboard/Dashboard";
import MedidasView from "../../views/MedidaView/MedidaView";
import TipoProductoView from "../../views/TipoProductoView/TipoProductoView";
import ProductoView from "../../views/ProductoView/ProductoView";
import ClienteView from "../../views/ClienteView/ClienteView";
import RealizarEntregaView from "../../views/RealizarEntregaView/CreateEntrega/RealizarEntregaView";
import VerEntregasView from "../../views/VerEntregasView/VerEntregasView";
import PrecioNaftaView from "../../views/PrecioNaftaView/PrecioNaftaView";
import EditEntregaView from "../../views/RealizarEntregaView/EditEntrega/EditarEntregaView";
import ReporteClienteView from "../../views/Reportes/ReporteClienteView/ReporteClienteView";
import ReporteEntregaView from "../../views/Reportes/ReporteEntregaView/ReporteEntregaView";
import ReporteGeneralView from "../../views/Reportes/ReporteGeneralView/ReporteGeneralView";
import EstadisticasView from "../../views/EstadisticasView/EstadisticasView";
import styles from "./Home.module.css";
import { Route, Routes } from "react-router-dom";

export type ViewType =
  | "dashboard"
  | "realizar-entrega"
  | "editar-entrega"
  | "ver-entregas"
  | "precio-nafta"
  | "cliente"
  | "producto"
  | "tipo-producto"
  | "medida"
  | "estadisticas";

const Home: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.home}>
      <MobileNavbar
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <div className={styles.mainContent}>
        <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

        <motion.main
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="home" element={<Dashboard />} />
            <Route path="realizar-entrega" element={<RealizarEntregaView />} />
            <Route path="ver-entregas" element={<VerEntregasView />} />
            <Route path="editar-entrega/:id" element={<EditEntregaView />} />
            <Route path="cliente" element={<ClienteView />} />
            <Route path="producto" element={<ProductoView />} />
            <Route path="tipo-producto" element={<TipoProductoView />} />
            <Route path="precio-nafta" element={<PrecioNaftaView />} />
            <Route path="medida" element={<MedidasView />} />
            <Route path="estadisticas" element={<EstadisticasView />} />
            <Route
              path="estadisticas/reporte-general"
              element={<ReporteGeneralView />}
            />
            <Route
              path="estadisticas/reporte-entrega"
              element={<ReporteEntregaView />}
            />
            <Route
              path="estadisticas/reporte-cliente"
              element={<ReporteClienteView />}
            />
          </Routes>
        </motion.main>
      </div>
    </div>
  );
};

export default Home;
