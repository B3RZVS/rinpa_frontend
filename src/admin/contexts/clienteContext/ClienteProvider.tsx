import { useState, type ReactNode } from "react";
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

interface ClienteProviderProps {
  children: ReactNode;
}

export const ClienteProvider: React.FC<ClienteProviderProps> = ({
  children,
}) => {
  const { showToast } = useToaster();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [clienteRestore, setClienteRestore] =
    useState<ClienteInterfaceResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<ClienteInterfaceResponse[]>([]);

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
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  //LOGICA DE RESTAURACION
  const restaurarCliente = async () => {
    if (clienteRestore) {
      await ClienteService.restoreCliente(clienteRestore.id);
      await getClientes();
      setIsOpenModal(false);
      showToast({
        title: "Cliente restaurado con éxito.",
        type: "success",
        position: "top-center",
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
        position: "top-center",
      });
    }
  };

  //REGISTER
  const registerCliente = async (data: CreateClienteInterface) => {
    setLoading(true);
    try {
      await ClienteService.createCliente(data);
      await getClientes();
      showToast({
        title: "Cliente registrada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.error(error);
      errorRegisterCliente(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCliente = async (data: UpdateClienteInterface) => {
    setLoading(true);
    try {
      await ClienteService.updateCliente(data);
      await getClientes();
      showToast({
        title: "Cliente modificada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error: AxiosError | any) {
      console.error(error);
      showToast({
        title: `Error: ${
          error.response?.data?.message || "al actualizar el cliente."
        }`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteCliente = async (id: number) => {
    setLoading(true);
    try {
      await ClienteService.deleteCliente(id);
      await getClientes();
      showToast({
        title: "Cliente eliminada con éxito.",
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error al eliminar el cliente.",
        type: "error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  const contextValue: ClienteContextType = {
    loading,
    clientes,
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
