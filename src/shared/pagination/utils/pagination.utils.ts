export function calculateTotalPages(
  totalItems: number,
  pageSize: number
): number {
  return Math.ceil(totalItems / pageSize);
}

export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] {
  const pages: number[] = [];
  const half = Math.floor(maxVisible / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  // Ajustar si estamos cerca del inicio
  if (currentPage <= half) {
    end = Math.min(maxVisible, totalPages);
  }

  // Ajustar si estamos cerca del final
  if (currentPage >= totalPages - half) {
    start = Math.max(1, totalPages - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

export function canGoToPreviousPage(currentPage: number): boolean {
  return currentPage > 1;
}

export function canGoToNextPage(
  currentPage: number,
  totalPages: number
): boolean {
  return currentPage < totalPages;
}

