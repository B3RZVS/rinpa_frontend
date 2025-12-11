import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import styles from "./PaginationControls.module.css";
import {
  getPageNumbers,
  canGoToPreviousPage,
  canGoToNextPage,
} from "../../utils/pagination.utils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
}: PaginationControlsProps) => {
  const pages = getPageNumbers(currentPage, totalPages, maxVisiblePages);
  const canPrevious = canGoToPreviousPage(currentPage);
  const canNext = canGoToNextPage(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(1)}
        disabled={!canPrevious}
        className={styles.button}
        aria-label="Primera página"
      >
        <FiChevronsLeft size={18} />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrevious}
        className={styles.button}
        aria-label="Página anterior"
      >
        <FiChevronLeft size={18} />
      </button>

      {showPageNumbers && (
        <div className={styles.pageNumbers}>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.active : ""
              }`}
              aria-label={`Página ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        className={styles.button}
        aria-label="Página siguiente"
      >
        <FiChevronRight size={18} />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={!canNext}
        className={styles.button}
        aria-label="Última página"
      >
        <FiChevronsRight size={18} />
      </button>
    </div>
  );
};
