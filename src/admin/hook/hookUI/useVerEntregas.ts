import { useNavigate } from "react-router-dom";
import { useEntrega } from "../hookContexts/useEntrega";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { EntregaInterfaceResponse } from "../../interface/entrega.interface";
import { useUsuarioPagination } from "../useEntregaPagination";
import type { FilterField } from "../../../shared/pagination";

export const useVerEntregas = () => {
  const navigate = useNavigate();

  const {
    loading,
    meta,
    entregasPaginated,
    getPaginatedEntregas,
    deleteEntrega,
  } = useEntrega();

  // const [filterOpen, setFilterOpen] = useState(false);
  const [entregaDelete, setEntregaDelete] =
    useState<EntregaInterfaceResponse | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const pagination = useUsuarioPagination();

  const lastParamsRef = useRef<string>("");

  const paramsKey = useMemo(
    () =>
      JSON.stringify({
        page: pagination.params.page,
        page_size: pagination.params.page_size,
        search: pagination.params.search || "",
        filters: pagination.params.filters || "",
        filtersValues: pagination.params.filtersValues || "",
        sort: pagination.params.sort || "",
        sortOrder: pagination.params.sortOrder || "",
      }),
    [
      pagination.params.page,
      pagination.params.page_size,
      pagination.params.search,
      pagination.params.filters,
      pagination.params.filtersValues,
      pagination.params.sort,
      pagination.params.sortOrder,
    ]
  );
  useEffect(() => {
    if (lastParamsRef.current === paramsKey) return;
    lastParamsRef.current = paramsKey;

    getPaginatedEntregas(pagination.params);
  }, [paramsKey, pagination.params]);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      pagination.setSearch(searchTerm);
    },
    [pagination]
  );

  const handleFilter = useCallback(
    (filters: string, filtersValues: string) => {
      pagination.setFilters(filters, filtersValues);
    },
    [pagination.setSearch]
  );

  const handleNuevaEntrega = () => {
    navigate("/dashboard/realizar-entrega");
  };

  const handleEditEntrega = (id: number) => {
    navigate(`/dashboard/editar-entrega/${id}`);
  };
  const handleDelete = (entrega: EntregaInterfaceResponse) => {
    setEntregaDelete(entrega);
    setOpenDelete(true);
  };
  const handleConfirmDelete = async () => {
    if (entregaDelete) await deleteEntrega(entregaDelete.id);
    await getPaginatedEntregas(pagination.params);
    setOpenDelete(false);
  };

  // const handleFilterReset = useCallback(() => {
  //   pagination.reset();
  //   handleFilter("", "");
  // }, [pagination, handleFilter]);

  const filterFields: FilterField[] = [
    {
      name: "fecha",
      label: "Fecha",
      type: "date",
      options: [],
    },
  ];

  return {
    loading,
    meta,
    entregasPaginated,
    filterFields,
    openDelete,
    pagination,
    setOpenDelete,
    handleConfirmDelete,
    handleDelete,
    handleEditEntrega,
    handleFilter,
    handleNuevaEntrega,
    handleSearch,
  };
};
