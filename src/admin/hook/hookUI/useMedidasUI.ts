import { useState, useEffect } from "react";
import type { MedidainterfaceResponse } from "../../interface/medida.interface";
import { useMedida } from "../hookContexts/useMedida";

export function useMedidasUI(
  medidas: MedidainterfaceResponse[],
  getMedidas: () => void
) {
  const { updateMedida, deleteMedida, registerMedida } = useMedida();
  const [filteredMedidas, setFilteredMedidas] = useState<
    MedidainterfaceResponse[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMedida, setSelectedMedida] =
    useState<MedidainterfaceResponse | null>(null);
  const [medidaToDelete, setMedidaToDelete] =
    useState<MedidainterfaceResponse | null>(null);

  // Cargar medidas al inicio
  useEffect(() => {
    getMedidas();
  }, []);

  // Filtrar medidas cuando cambia searchTerm o medidas
  useEffect(() => {
    const filtered = medidas.filter((medida) =>
      (medida.unidadSimbolo ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredMedidas(filtered);
  }, [searchTerm, medidas]);

  const handleAdd = () => {
    setSelectedMedida(null);
    setIsModalOpen(true);
  };

  const handleEdit = (medida: MedidainterfaceResponse) => {
    setSelectedMedida(medida);
    setIsModalOpen(true);
  };

  const handleDelete = (medida: MedidainterfaceResponse) => {
    setMedidaToDelete(medida);
    setIsConfirmModalOpen(true);
  };
  const confirmDelete = () => {
    if (medidaToDelete) deleteMedida(medidaToDelete.id);
    setIsConfirmModalOpen(false);
    setMedidaToDelete(null);
  };

  const confirmateAccion = (data: any) => {
    if (selectedMedida) {
      const dataUpdate = { ...data, id: selectedMedida.id };
      updateMedida(dataUpdate);
      setSelectedMedida(null);
    } else {
      registerMedida(data);
    }
    setIsModalOpen(false);
  };
  return {
    filteredMedidas,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedMedida,
    medidaToDelete,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    confirmateAccion,
  };
}
