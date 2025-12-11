import { useState, useCallback, useMemo } from "react";
import type {
  PaginationParams,
  PaginationState,
  UsePaginationOptions,
} from "../types/pagination.types";
import {
  buildPaginationQuery,
  //   parsePaginationQuery,
} from "../utils/query-builder.utils";

export function usePagination<T>(
  initialParams: PaginationParams = {},
  options: UsePaginationOptions<T> = {}
) {
  const [state, setState] = useState<PaginationState>({
    page: initialParams.page || 1,
    page_size: initialParams.page_size || 10,
    search: initialParams.search,
    filters: initialParams.filters,
    filtersValues: initialParams.filtersValues,
    sort: initialParams.sort,
    sortOrder: initialParams.sortOrder,
    isLoading: false,
    error: null,
  });

  const setPage = useCallback(
    (page: number) => {
      setState((prev) => ({ ...prev, page }));
      options.onPageChange?.(page);
    },
    [options]
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      setState((prev) => ({ ...prev, page_size: pageSize, page: 1 }));
      options.onPageSizeChange?.(pageSize);
    },
    [options]
  );

  const setSearch = useCallback((search: string) => {
    setState((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const setFilters = useCallback((filters: string, filtersValues: string) => {
    setState((prev) => ({ ...prev, filters, filtersValues, page: 1 }));
  }, []);

  const setSort = useCallback(
    (sort: string, sortOrder: "asc" | "desc" = "asc") => {
      setState((prev) => ({ ...prev, sort, sortOrder }));
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      page: 1,
      page_size: initialParams.page_size || 10,
      search: undefined,
      filters: undefined,
      filtersValues: undefined,
      sort: undefined,
      sortOrder: undefined,
      isLoading: false,
      error: null,
    });
  }, [initialParams]);

  const queryString = useMemo(() => {
    return buildPaginationQuery(state);
  }, [state]);

  return {
    ...state,
    setPage,
    setPageSize,
    setSearch,
    setFilters,
    setSort,
    reset,
    queryString,
    params: {
      page: state.page,
      page_size: state.page_size,
      search: state.search,
      filters: state.filters,
      filtersValues: state.filtersValues,
      sort: state.sort,
      sortOrder: state.sortOrder,
    },
  };
}
