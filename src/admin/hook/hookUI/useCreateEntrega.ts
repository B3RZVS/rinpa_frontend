import { useState, useEffect, useCallback, useMemo } from "react";
import { useEntrega } from "../hookContexts/useEntrega";
import { usePrecioNafta } from "../hookContexts/usePrecioNafta";
import type { ClienteInterfaceResponse } from "../../interface/cliente.interface";
import type { CreateDetalleProductoInterface } from "../../interface/detalle.interface";
import type { CreateEntregaInterface } from "../../interface/entrega.interface";
import { useToaster } from "../../../shared/hooks/useToaster";
import { useCliente } from "../hookContexts/useCliente";
export const useCreateEntrega = () => {
  const { getClientes } = useCliente();
  const { registerEntrega, loading } = useEntrega();
  const { preciosNafta, getPreciosNafta } = usePrecioNafta();
  const { showToast } = useToaster();
  const [selectedCliente, setSelectedCliente] =
    useState<ClienteInterfaceResponse | null>(null);
  const [fecha, setFecha] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [litrosGastados, setLitrosGastados] = useState("");
  const [detalles, setDetalles] = useState<CreateDetalleProductoInterface[]>(
    []
  );
  const [showDetalleForm, setShowDetalleForm] = useState(false);

  // Obtener precios solo una vez si no existen
  useEffect(() => {
    if (preciosNafta.length === 0) getPreciosNafta();
  }, [preciosNafta, getPreciosNafta]);
  useEffect(() => {
    getClientes();
  }, []);

  // Precio de nafta actual
  const precioActual = useMemo(
    () => preciosNafta.find((p) => p.fechaFin === null),
    [preciosNafta]
  );

  // Reset del formulario
  const resetForm = useCallback(() => {
    setSelectedCliente(null);
    setFecha(new Date().toISOString().split("T")[0]);
    setLitrosGastados("");
    setDetalles([]);
  }, []);

  // Agregar o eliminar detalles
  const handleAgregarDetalle = useCallback(
    (detalle: CreateDetalleProductoInterface) => {
      setDetalles((prev) => [...prev, detalle]);
      setShowDetalleForm(false);
    },
    []
  );

  const handleEliminarDetalle = useCallback((index: number) => {
    setDetalles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Validaciones de formulario
  const validarFormulario = (): string | null => {
    if (!selectedCliente) return "Debe seleccionar un cliente.";
    if (!litrosGastados || Number(litrosGastados) < 0)
      return "Debe ingresar los litros gastados.";
    if (detalles.length === 0) return "Debe agregar al menos un producto.";
    if (!precioActual) return "No hay precio de nafta actual disponible.";
    return null;
  };

  // Guardar entrega
  const handleGuardar = useCallback(async () => {
    const error: string | null = validarFormulario();
    if (error) {
      showToast({
        title: "Error",
        message: error,
        type: "error",
      });
      return;
    }

    const nuevaEntrega: CreateEntregaInterface = {
      clienteId: selectedCliente!.id,
      usuarioId: Number(localStorage.getItem("idUser")),
      precioNaftaId: precioActual!.id,
      litrosGastados: Number(litrosGastados),
      fecha: fecha,
      detalles,
    };

    await registerEntrega(nuevaEntrega);
    resetForm();
  }, [
    selectedCliente,
    litrosGastados,
    detalles,
    fecha,
    precioActual,
    registerEntrega,
    resetForm,
  ]);

  return {
    // Estado
    selectedCliente,
    setSelectedCliente,
    fecha,
    setFecha,
    litrosGastados,
    setLitrosGastados,
    detalles,
    showDetalleForm,
    setShowDetalleForm,

    // Acciones
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleGuardar,
    resetForm,

    // Datos externos
    loading,
    precioActual,
  };
};
