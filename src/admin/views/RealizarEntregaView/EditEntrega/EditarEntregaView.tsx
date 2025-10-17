import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiPlus } from "react-icons/fi";
import { useEntrega } from "../../../hook/hookContexts/useEntrega";
import { usePrecioNafta } from "../../../hook/hookContexts/usePrecioNafta";
import { useCliente } from "../../../hook/hookContexts/useCliente";
import { useParams } from "react-router-dom";
import styles from "./EditarEntregaView.module.css";

import ClienteSelector from "../../../components/ComponentsViewEntrega/ClienteSelector/ClienteSelector";
import DetalleProductoForm from "../../../components/ComponentsViewEntrega/DetalleProductoForm/DetalleProductoForm";
// import DetalleProductoList from "../../../components/ComponentsViewEntrega/DetalleProductoList/DetalleProductoList";
import type {
  CreateDetalleProductoInterface,
  DetalleProductoInterfaceResponse,
} from "../../../interface/detalle.interface";
import type { ClienteInterfaceResponse } from "../../../interface/cliente.interface";

const EditEntregaView: React.FC = () => {
  const { entregas } = useEntrega();
  const { clientes, getClientes } = useCliente();
  const { preciosNafta, getPreciosNafta } = usePrecioNafta();
  const { id } = useParams<{ id: string }>();
  const entregaId = Number(id);

  // Estados del formulario
  const [selectedCliente, setSelectedCliente] =
    useState<ClienteInterfaceResponse | null>(null);
  const [fecha, setFecha] = useState("");
  const [litrosGastados, setLitrosGastados] = useState("");
  const [detalles, setDetalles] = useState<DetalleProductoInterfaceResponse[]>(
    []
  );
  const [showDetalleForm, setShowDetalleForm] = useState(false);
  const [loading, setLoading] = useState(false);
  // --- Cargar precios si no están ---
  useEffect(() => {
    if (preciosNafta.length <= 0) getPreciosNafta();
    if (clientes.length <= 0) getClientes();
  }, []);

  // --- Buscar la entrega en memoria ---
  useEffect(() => {
    if (!entregaId || entregas.length === 0) return;

    const entrega = entregas.find((e) => e.id === entregaId);
    if (!entrega) return;

    const cliente = clientes.find((e) => e.id === entrega.clienteId);
    if (!cliente) return;
    setSelectedCliente(cliente);
    setFecha(new Date(entrega.fecha).toISOString().split("T")[0]);
    setLitrosGastados(entrega.litrosGastados.toString());
    setDetalles(entrega.detalles || []);
  }, [entregaId, entregas]);

  // --- Handlers ---
  const handleAgregarDetalle = (detalle: CreateDetalleProductoInterface) => {
    // setDetalles([...detalles, detalle]);
    console.log(detalle);
    setShowDetalleForm(false);
  };

  //   const handleEliminarDetalle = (index: number) => {
  //     setDetalles(detalles.filter((_, i) => i !== index));
  //   };

  const handleGuardar = async () => {
    if (!selectedCliente) {
      alert("Debe seleccionar un cliente");
      return;
    }

    if (!litrosGastados || Number.parseFloat(litrosGastados) <= 0) {
      alert("Debe ingresar los litros gastados");
      return;
    }

    setLoading(true);
    try {
      const precioActual = preciosNafta.find((p) => p.fechaFin === null);

      const entregaActualizada = {
        id: entregaId,
        clienteId: selectedCliente.id,
        precioNaftaId: precioActual?.id,
        litrosGastados: Number.parseFloat(litrosGastados),
        fecha: new Date(fecha),
        detalles: detalles,
      };

      // 🔹 Temporal: simular actualización
      console.log("Entrega actualizada:", entregaActualizada);

      // 🔹 Futuro: llamará a updateEntrega(entregaActualizada)
      // await updateEntrega(entregaActualizada);

      alert("Entrega actualizada correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la entrega");
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Editar Entrega</h2>
      </div>

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

          {/* <DetalleProductoList
            detalles={detalles}
            onDelete={handleEliminarDetalle}
          /> */}
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
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditEntregaView;
