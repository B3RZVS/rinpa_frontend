import { useState, type ReactNode, useCallback } from "react";
import { ClienteContext } from "./ClienteContext";
import type { ClienteContextType } from "./ClienteContext.type";
import type {
  CreateClienteInterface,
  ClienteInterfaceResponse,
  UpdateClienteInterface,
} from "../../interface/cliente.interface";
import { ClienteService } from "../../services/cliente.service";
import { useToaster } from "../../../shared/hooks/useToaster";
import { AxiosError } from "axios";
import ConfirmModal from "../../../shared/components/Common/ConfirmationModal/ConfirmationModal";
import type {
  GetPaginated,
  PaginatedData,
} from "../../interface/pagination.interface";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
interface ClienteProviderProps {
  children: ReactNode;
}

export const ClienteProvider: React.FC<ClienteProviderProps> = ({
  children,
}) => {
  const { showToast } = useToaster();
  const { handleApiError } = useHandleApiError();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [clienteRestore, setClienteRestore] =
    useState<ClienteInterfaceResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<ClienteInterfaceResponse[]>([]);
  const [clientesPaginated, setClientesPaginated] =
    useState<PaginatedData<ClienteInterfaceResponse> | null>(null);
  const [paginationParams] = useState<GetPaginated>({
    page: 1,
    page_size: 10,
    order_by: "id",
    order_type: "asc",
    search: "",
    filters: [],
    filtersValues: [],
  });
  const getClientes = async () => {
    setLoading(true);
    try {
      const response = await ClienteService.clienteGetAll();
      setClientes(response);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al obtener los clientes.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  //LOGICA DE RESTAURACION
  const restaurarCliente = async () => {
    if (clienteRestore) {
      await ClienteService.restoreCliente(clienteRestore.id);
      await getPaginatedClientes(paginationParams);
      setIsOpenModal(false);
      showToast({
        title: "Cliente restaurado con éxito.",
        type: "success",
      });
    }
  };
  const errorRegisterCliente = async (error: AxiosError | any) => {
    const cliente = error.response?.data?.data;

    if (cliente) {
      setClienteRestore(cliente);
      setIsOpenModal(true);
    } else {
      showToast({
        title: `Error: ${
          error.response?.data?.message || "al crear el cliente."
        }`,
        type: "error",
      });
    }
  };

  //REGISTER
  const registerCliente = async (data: CreateClienteInterface) => {
    setLoading(true);
    try {
      await ClienteService.createCliente(data);
      showToast({
        title: "Cliente registrada con éxito.",
        type: "success",
      });
    } catch (error: AxiosError | any) {
      errorRegisterCliente(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCliente = async (data: UpdateClienteInterface) => {
    setLoading(true);
    try {
      await ClienteService.updateCliente(data);
      showToast({
        title: "Cliente modificada con éxito.",
        type: "success",
      });
    } catch (error) {
      handleApiError(error, "Error al editar el cliente");
    } finally {
      setLoading(false);
    }
  };
  const deleteCliente = async (id: number) => {
    setLoading(true);
    try {
      await ClienteService.deleteCliente(id);
      showToast({
        title: "Cliente eliminada con éxito.",
        type: "success",
      });
    } catch (error) {
      handleApiError(error, "Error al eliminar el cliente");
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedClientes = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await ClienteService.getPaginatedClientesApi(params);
        setClientesPaginated(response);
      } catch (error) {
        handleApiError(error, "Error al obtener las entregas");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const contextValue: ClienteContextType = {
    loading,
    clientes,
    clientesPaginated,
    getPaginatedClientes,
    getClientes,
    deleteCliente,
    registerCliente,
    updateCliente,
  };
  return (
    <ClienteContext.Provider value={contextValue}>
      {children}
      <ConfirmModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={restaurarCliente}
        title="Restaurar Cliente"
        message={`El cliente "${clienteRestore?.nombre} ${clienteRestore?.apellido}" ya existe ¿Lo quiere restaurar?`}
      />
    </ClienteContext.Provider>
  );
};
