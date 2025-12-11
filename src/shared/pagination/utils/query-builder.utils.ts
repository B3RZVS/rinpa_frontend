import type { PaginationParams } from "../types/pagination.types";

export function buildPaginationQuery(params: PaginationParams): string {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.set("page", params.page.toString());
  if (params.page_size)
    queryParams.set("page_size", params.page_size.toString());
  if (params.search) queryParams.set("search", params.search);
  if (params.filters) queryParams.set("filters", params.filters);
  if (params.filtersValues)
    queryParams.set("filtersValues", params.filtersValues);
  if (params.sort) queryParams.set("sort", params.sort);
  if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);

  return queryParams.toString();
}

export function parsePaginationQuery(
  searchParams: URLSearchParams
): PaginationParams {
  return {
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined,
    page_size: searchParams.get("page_size")
      ? Number(searchParams.get("page_size"))
      : undefined,
    search: searchParams.get("search") || undefined,
    filters: searchParams.get("filters") || undefined,
    filtersValues: searchParams.get("filtersValues") || undefined,
    sort: searchParams.get("sort") || undefined,
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || undefined,
  };
}
