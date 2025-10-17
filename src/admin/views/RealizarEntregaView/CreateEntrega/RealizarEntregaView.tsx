import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSave, FiPlus } from "react-icons/fi";
import ClienteSelector from "../../../components/ComponentsViewEntrega/ClienteSelector/ClienteSelector";
import DetalleProductoForm from "../../../components/ComponentsViewEntrega/DetalleProductoForm/DetalleProductoForm";
import DetalleProductoList from "../../../components/ComponentsViewEntrega/DetalleProductoList/DetalleProductoList";
import styles from "./RealizarEntregaView.module.css";
import type { ClienteInterfaceResponse } from "../../../interface/cliente.interface";
import type { CreateDetalleProductoInterface } from "../../../interface/detalle.interface";
import type { CreateEntregaInterface } from "../../../interface/entrega.interface";
import { usePrecioNafta } from "../../../hook/hookContexts/usePrecioNafta";
import { useEntrega } from "../../../hook/hookContexts/useEntrega";

const RealizarEntregaView: React.FC = () => {
  const { registerEntrega, loading } = useEntrega();
  const { preciosNafta, getPreciosNafta } = usePrecioNafta();

  const [selectedCliente, setSelectedCliente] =
    useState<ClienteInterfaceResponse | null>(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [litrosGastados, setLitrosGastados] = useState("");
  const [detalles, setDetalles] = useState<CreateDetalleProductoInterface[]>(
    []
  );
  const [showDetalleForm, setShowDetalleForm] = useState(false);
  useEffect(() => {
    if (preciosNafta.length <= 0) getPreciosNafta();
  }, []);
  const resetForm = () => {
    setSelectedCliente(null);
    setFecha(new Date().toISOString().split("T")[0]);
    setLitrosGastados("");
    setDetalles([]);
  };
  const precioActual = preciosNafta.find((p) => p.fechaFin === null);

  const handleAgregarDetalle = (detalle: CreateDetalleProductoInterface) => {
    setDetalles([...detalles, detalle]);
    setShowDetalleForm(false);
  };

  const handleEliminarDetalle = (index: number) => {
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const handleGuardar = async () => {
    if (!selectedCliente) {
      alert("Debe seleccionar un cliente");
      return;
    }

    if (!litrosGastados || Number.parseFloat(litrosGastados) <= 0) {
      alert("Debe ingresar los litros gastados");
      return;
    }

    if (detalles.length === 0) {
      alert("Debe agregar al menos un producto");
      return;
    }

    if (precioActual) {
      const nuevaEntrega: CreateEntregaInterface = {
        clienteId: selectedCliente.id,
        usuarioId: Number(localStorage.getItem("idUser")),
        precioNaftaId: precioActual?.id,
        litrosGastados: Number.parseFloat(litrosGastados),
        fecha: new Date(fecha),
        detalles: detalles,
      };
      registerEntrega(nuevaEntrega);
      resetForm();
      // TODO: Llamar a la API para crear la entrega
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <h2>Nueva Entrega</h2>
      </div>

      {/* Form */}
      <div className={styles.form}>
        {/* Datos Básicos */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Datos de la Entrega</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Cliente *</label>
            <ClienteSelector
              selectedCliente={selectedCliente}
              onSelectCliente={setSelectedCliente}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha *</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Litros Gastados *</label>
              <input
                type="number"
                step="0.01"
                value={litrosGastados}
                onChange={(e) => setLitrosGastados(e.target.value)}
                placeholder="0.00"
                className={styles.input}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Detalles de Productos */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Productos</h3>
            <button
              className={styles.addDetalleButton}
              onClick={() => setShowDetalleForm(true)}
            >
              <FiPlus />
              <span>Agregar</span>
            </button>
          </div>

          {showDetalleForm && (
            <DetalleProductoForm
              onAdd={handleAgregarDetalle}
              onCancel={() => setShowDetalleForm(false)}
            />
          )}

          <DetalleProductoList
            detalles={detalles}
            onDelete={handleEliminarDetalle}
          />
        </div>

        {/* Botón Guardar */}
        <div className={styles.actions}>
          <button
            className={styles.saveButton}
            onClick={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className={styles.spinner} />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <FiSave />
                <span>Guardar Entrega</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RealizarEntregaView;
