import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useEntrega } from "../hookContexts/useEntrega";
import { useDetalleEntrega } from "../hookContexts/useDetalleEntrega";
import { useCliente } from "../hookContexts/useCliente";
import { usePrecioNafta } from "../hookContexts/usePrecioNafta";
import type { ClienteInterfaceResponse } from "../../interface/cliente.interface";
import type {
  CreateDetalleProductoInterface,
  DetalleProductoInterfaceResponse,
} from "../../interface/detalle.interface";

export const useEditEntrega = () => {
  const { entrega, getEntregaById, loading, updateEntrega } = useEntrega();
  const { registerDetalleEntrega, deleteDetalleEntrega } = useDetalleEntrega();
  const { clientes, getClientes } = useCliente();
  const { preciosNafta, getPreciosNafta } = usePrecioNafta();
  const { id } = useParams<{ id: string }>();
  const entregaId = Number(id);

  // Estados principales
  const [selectedCliente, setSelectedCliente] =
    useState<ClienteInterfaceResponse | null>(null);
  const [fecha, setFecha] = useState("");
  const [litrosGastados, setLitrosGastados] = useState("");
  const [detalles, setDetalles] = useState<DetalleProductoInterfaceResponse[]>(
    []
  );
  const [showDetalleForm, setShowDetalleForm] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [detalleDelete, setDetalleDelete] = useState<number | null>(null);

  // --- Cargar datos iniciales ---
  useEffect(() => {
    if (entregaId) getEntregaById(entregaId);
  }, [entregaId]);

  useEffect(() => {
    if (preciosNafta.length === 0) getPreciosNafta();
    if (clientes.length === 0) getClientes();
  }, []);

  // --- Actualizar formulario cuando llega la entrega ---
  useEffect(() => {
    if (!entrega) return;
    const cliente = clientes.find((e) => e.id === entrega.clienteId);
    if (!cliente) return;

    setSelectedCliente(cliente);
    setFecha(new Date(entrega.fecha).toISOString().split("T")[0]);
    setLitrosGastados(entrega.litrosGastados.toString());
    setDetalles(entrega.detalles || []);
  }, [entrega, clientes]);

  // --- Acciones sobre detalles ---
  const handleAgregarDetalle = useCallback(
    async (detalle: CreateDetalleProductoInterface) => {
      await registerDetalleEntrega(detalle, entregaId);
      await getEntregaById(entregaId);
      setShowDetalleForm(false);
    },
    [entregaId]
  );

  const handleEliminarDetalle = useCallback((id: number) => {
    setIsConfirmModalOpen(true);
    setDetalleDelete(id);
  }, []);

  const handleConfirmarEliminarDetalle = useCallback(async () => {
    if (detalleDelete) await deleteDetalleEntrega(detalleDelete);
    await getEntregaById(entregaId);
    setIsConfirmModalOpen(false);
  }, [detalleDelete, entregaId]);

  // --- Validaciones y guardado ---
  const handleGuardar = useCallback(async () => {
    if (!selectedCliente) {
      alert("Debe seleccionar un cliente");
      return;
    }

    if (!litrosGastados || Number.parseFloat(litrosGastados) <= 0) {
      alert("Debe ingresar los litros gastados");
      return;
    }

    const entregaActualizada = {
      clienteId: selectedCliente.id,
      litrosGastados: Number.parseFloat(litrosGastados),
      fecha: new Date(fecha),
    };
    await updateEntrega(entregaId, entregaActualizada);
    getEntregaById(entregaId);
  }, [selectedCliente, litrosGastados, fecha, entregaId]);

  return {
    loading,
    selectedCliente,
    setSelectedCliente,
    fecha,
    setFecha,
    litrosGastados,
    setLitrosGastados,
    detalles,
    showDetalleForm,
    setShowDetalleForm,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleConfirmarEliminarDetalle,
    handleGuardar,
  };
};
