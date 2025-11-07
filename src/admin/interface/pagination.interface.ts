export interface GetPaginated {
  page?: number;
  page_size?: number;
  order_by?: string;
  order_type?: "asc" | "desc";
  search?: string;
  filters?: string[];
  filtersValues?: string[];
}

export interface MetaDataPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  page_size: number;
}
export interface PaginatedData<T> {
  data: T[];
  meta: MetaDataPagination;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  page_size: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}
