import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./PrecioNaftaView.module.css";
import PrecioActualCard from "../../components/componentsViewPrecioNafta/PrecioActualCard/PrecioActualCard";
import HistorialPrecios from "../../components/componentsViewPrecioNafta/HistorialPrecios/HistorialPrecios";
import NuevoPrecioModal from "../../components/componentsViewPrecioNafta/NuevoPrecioModal/NuevoPrecioModal";
import { usePrecioNafta } from "../../hook/hookContexts/usePrecioNafta";

const PrecioNaftaView = () => {
  const { getPreciosNafta, preciosNafta, loading, registerPrecioNafta } =
    usePrecioNafta();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (preciosNafta.length <= 0) getPreciosNafta();
  }, []);

  const precioActual = preciosNafta.find((p) => p.fechaFin === null);
  const historial = preciosNafta.filter((p) => p.fechaFin !== null);

  const handleNuevoPrecio = async (precio: number) => {
    const data = { precio: precio };
    await registerPrecioNafta(data);
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Precio de Nafta</h2>
        <button
          className={styles.updateButton}
          onClick={() => setIsModalOpen(true)}
        >
          Actualizar Precio
        </button>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Cargando precios...</p>
          </div>
        ) : (
          <>
            {precioActual && <PrecioActualCard precio={precioActual} />}

            {historial.length > 0 && <HistorialPrecios precios={historial} />}
          </>
        )}
      </div>

      <NuevoPrecioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNuevoPrecio}
        precioActual={precioActual?.precio}
      />
    </motion.div>
  );
};

export default PrecioNaftaView;
