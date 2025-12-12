import { useEffect, useState } from "react";
import type {
  CreateTipoProductoInterface,
  TipoProductoInterfaceResponse,
} from "../../interface/tipoProducto.interface";
import { useTipoProducto } from "../hookContexts/useTipoProducto";
export function useTipoProductoUI() {
  const {
    getTipoProductos,
    tipoProductos,
    deleteTipoProducto,
    registerTipoProducto,
    updateTipoProducto,
    loading,
  } = useTipoProducto();

  const [filteredTipoProductos, setFilteredTipoProductos] = useState<
    TipoProductoInterfaceResponse[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedTipoProducto, setSelectedTipoProducto] =
    useState<TipoProductoInterfaceResponse | null>(null);
  const [tipoProductoToDelete, setTipoProductoToDelete] =
    useState<TipoProductoInterfaceResponse | null>(null);

  // Simulación de datos - reemplazar con API real
  useEffect(() => {
    getTipoProductos();
  }, []);

  useEffect(() => {
    const filtered = tipoProductos.filter((tipo) =>
      tipo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTipoProductos(filtered);
  }, [searchTerm, tipoProductos]);

  const handleAdd = () => {
    setSelectedTipoProducto(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tipoProducto: TipoProductoInterfaceResponse) => {
    setSelectedTipoProducto(tipoProducto);
    setIsModalOpen(true);
  };

  const handleDelete = (tipoProducto: TipoProductoInterfaceResponse) => {
    setTipoProductoToDelete(tipoProducto);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (tipoProductoToDelete) deleteTipoProducto(tipoProductoToDelete?.id);
    setIsConfirmModalOpen(false);
  };

  const handleSave = (tipoProductoData: CreateTipoProductoInterface) => {
    if (selectedTipoProducto) {
      const dataUpdate = { ...tipoProductoData, id: selectedTipoProducto.id };
      updateTipoProducto(dataUpdate);
    } else {
      registerTipoProducto(tipoProductoData);
    }
    setIsModalOpen(false);
  };

  return {
    filteredTipoProductos,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedTipoProducto,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    tipoProductoToDelete,
    loading,
  };
}
