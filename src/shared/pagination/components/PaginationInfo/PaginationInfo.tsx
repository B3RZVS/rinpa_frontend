import styles from "./PaginationInfo.module.css";

interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export const PaginationInfo = ({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
}: PaginationInfoProps) => {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.container}>
      <span className={styles.text}>
        Mostrando <strong>{start}</strong> - <strong>{end}</strong> de{" "}
        <strong>{totalItems}</strong> resultados
      </span>
      {totalPages > 1 && (
        <span className={styles.pageInfo}>
          (Página <strong>{currentPage}</strong> de{" "}
          <strong>{totalPages}</strong>)
        </span>
      )}
    </div>
  );
};
