import { usePagination, type PaginationParams } from "../../shared/pagination";

/**
 * Hook especializado de paginación para usuarios.
 * Configura los parámetros por defecto y callbacks específicos.
 */
export const useUsuarioPagination = () => {
  const pagination = usePagination<PaginationParams>(
    {
      page: 1,
      page_size: 10,
    },
    {}
  );

  return pagination;
};
