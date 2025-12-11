export interface PaginationParams {
  page?: number;
  page_size?: number;
  search?: string;
  filters?: string;
  filtersValues?: string;
  sort?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  page_size: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface UsePaginationOptions<T> {
  initialPage?: number;
  initialPageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  debounceSearch?: number; // ms
  tipo?: T;
}

export interface PaginationState extends PaginationParams {
  isLoading?: boolean;
  error?: Error | null;
}

export interface FilterField {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "number";
  options?: { value: string; label: string }[];
  placeholder?: string;
}
