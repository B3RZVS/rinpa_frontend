import { useEffect, useState } from "react";
import type {
  ClienteInterfaceResponse,
  CreateClienteInterface,
} from "../../interface/cliente.interface";
import { useCliente } from "../hookContexts/useCliente";
import type { PaginationInfo } from "../../interface/pagination.interface";
import usePaginationParams from "../usePaginateParams";

export const useClienteUI = () => {
  const {
    registerCliente,
    updateCliente,
    deleteCliente,
    getPaginatedClientes,
    clientesPaginated,
  } = useCliente();
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] =
    useState<ClienteInterfaceResponse | null>(null);
  const [clienteToDelete, setClienteToDelete] =
    useState<ClienteInterfaceResponse | null>(null);

  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    // handleFilter,
  } = usePaginationParams();

  useEffect(() => {
    getPaginatedClientes(paginationParams);
  }, [paginationParams]);

  useEffect(() => {
    setPaginationInfo(
      clientesPaginated
        ? {
            currentPage: clientesPaginated.meta.currentPage,
            totalPages: clientesPaginated.meta.totalPages,
            page_size: clientesPaginated.meta.page_size,
            totalItems: clientesPaginated.meta.totalItems,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
          }
        : null
    );
  }, [clientesPaginated]);

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

  return {
    isModalOpen,
    isConfirmModalOpen,
    searchTerm,
    selectedCliente,
    clienteToDelete,
    setSearchTerm,
    setSelectedCliente,
    setClienteToDelete,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    setIsModalOpen,
    setIsConfirmModalOpen,
    getPaginatedClientes,
    clientesPaginated,
    paginationInfo,
  };
};
