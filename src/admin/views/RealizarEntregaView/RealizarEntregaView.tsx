import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiPlus } from "react-icons/fi";
import ClienteSelector from "../../components/ComponentsViewEntrega/ClienteSelector/ClienteSelector";
import DetalleProductoForm from "../../components/ComponentsViewEntrega/DetalleProductoForm/DetalleProductoForm";
import DetalleProductoList from "../../components/ComponentsViewEntrega/DetalleProductoList/DetalleProductoList";
import styles from "./RealizarEntregaView.module.css";
import type { ClienteInterfaceResponse } from "../../interface/cliente.interface";
import type { CreateDetalleProductoInterface } from "../../interface/detalle.interface";
import type {
  CreateEntregaInterface,
  EntregaInterfaceResponse,
  UpdateEntregaInterface,
} from "../../interface/entrega.interface";

const RealizarEntregaView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const entregaId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [selectedCliente, setSelectedCliente] =
    useState<ClienteInterfaceResponse | null>(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [litrosGastados, setLitrosGastados] = useState("");
  const [detalles, setDetalles] = useState<CreateDetalleProductoInterface[]>(
    []
  );
  const [showDetalleForm, setShowDetalleForm] = useState(false);

  useEffect(() => {
    if (mode === "edit" && entregaId) {
      setLoading(true);
      // TODO: Reemplazar con llamada real a la API
      setTimeout(() => {
        // Datos de ejemplo
        const entregaData: EntregaInterfaceResponse = {
          id: Number.parseInt(entregaId),
          clienteId: 1,
          clienteNombre: "Juan Pérez",
          usuarioId: 1,
          usuarioNombre: "Admin",
          fecha: new Date("2024-01-15"),
          precioNafta: 850,
          litrosGastados: 15,
          consumoTotal: 12750,
          detalles: [],
        };

        // setSelectedCliente({
        //   id: entregaData.clienteId,
        //   nombre: entregaData.clienteNombre,
        //   apellido:entregaData.cl
        // });
        setFecha(new Date(entregaData.fecha).toISOString().split("T")[0]);
        setLitrosGastados(entregaData.litrosGastados.toString());
        setLoading(false);
      }, 500);
    }
  }, [mode, entregaId]);

  const handleVolver = () => {
    navigate("/home?view=ver-entregas");
  };

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

    if (mode === "create" && detalles.length === 0) {
      alert("Debe agregar al menos un producto");
      return;
    }

    setLoading(true);

    if (mode === "create") {
      const nuevaEntrega: CreateEntregaInterface = {
        clienteId: selectedCliente.id,
        // TODO: Obtener usuarioId del localStorage
        usuarioId: 1, // Reemplazar con: Number(localStorage.getItem('usuarioId'))
        // TODO: Obtener precioNaftaId del localStorage o API
        precioNaftaId: 1, // Reemplazar con: Number(localStorage.getItem('precioNaftaId'))
        litrosGastados: Number.parseFloat(litrosGastados),
        fecha: new Date(fecha),
        detalles: detalles,
      };

      console.log("Crear entrega:", nuevaEntrega);
      // TODO: Llamar a la API para crear la entrega
      setTimeout(() => {
        setLoading(false);
        navigate("/home?view=ver-entregas");
      }, 1000);
    } else {
      const entregaActualizada: UpdateEntregaInterface = {
        clienteId: selectedCliente.id,
        // TODO: Obtener precioNafta actual
        precioNafta: 850, // Reemplazar con el precio actual
        litrosGastados: Number.parseFloat(litrosGastados),
        fecha: new Date(fecha),
      };

      console.log("Actualizar entrega:", entregaActualizada);
      // TODO: Llamar a la API para actualizar la entrega
      setTimeout(() => {
        setLoading(false);
        navigate("/home?view=ver-entregas");
      }, 1000);
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
        <button className={styles.backButton} onClick={handleVolver}>
          <FiArrowLeft />
          <span>Volver</span>
        </button>
        <h2>{mode === "create" ? "Nueva Entrega" : "Editar Entrega"}</h2>
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
