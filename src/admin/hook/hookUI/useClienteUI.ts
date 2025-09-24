import { useEffect, useState } from "react";
import type {
  ClienteInterfaceResponse,
  CreateClienteInterface,
} from "../../interface/cliente.interface";
import type { PaginationData } from "../../interface/pagination.interface";
import { useCliente } from "../hookContexts/useCliente";

export function useClienteUI() {
  const {
    clientes,
    getClientes,
    registerCliente,
    updateCliente,
    deleteCliente,
  } = useCliente();
  const [filteredClientes, setFilteredClientes] = useState<
    ClienteInterfaceResponse[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] =
    useState<ClienteInterfaceResponse | null>(null);
  const [clienteToDelete, setClienteToDelete] =
    useState<ClienteInterfaceResponse | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  // Simulación de datos - reemplazar con API real
  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.telefono.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClientes(filtered);
    setPagination((prev) => ({
      ...prev,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.itemsPerPage),
      currentPage: 1,
    }));
  }, [searchTerm, clientes]);

  const handleAdd = () => {
    setSelectedCliente(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cliente: ClienteInterfaceResponse) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleDelete = (cliente: ClienteInterfaceResponse) => {
    setClienteToDelete(cliente);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (clienteToDelete) {
      deleteCliente(clienteToDelete.id);
      setIsConfirmModalOpen(false);
    }
  };

  const handleSave = (clienteData: CreateClienteInterface) => {
    if (selectedCliente) {
      // Editar
      const dataUpdate = { ...clienteData, id: selectedCliente.id };
      updateCliente(dataUpdate);
    } else {
      // Crear
      registerCliente(clienteData);
    }
    setIsModalOpen(false);
  };

  const getCurrentPageData = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredClientes.slice(startIndex, endIndex);
  };

  return {
    clientes,
    isModalOpen,
    isConfirmModalOpen,
    searchTerm,
    filteredClientes,
    pagination,
    selectedCliente,
    clienteToDelete,
    setPagination,
    setSearchTerm,
    setSelectedCliente,
    setClienteToDelete,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    getCurrentPageData,
    setIsModalOpen,
    setIsConfirmModalOpen,
  };
}
