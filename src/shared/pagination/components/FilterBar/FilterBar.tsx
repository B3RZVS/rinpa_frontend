import { useState, useCallback } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import styles from "./FilterBar.module.css";
import type { FilterField } from "../../types/pagination.types";

interface FilterBarProps {
  fields: FilterField[];
  onFilterChange: (filters: string, filtersValues: string) => void;
  onReset?: () => void;
}

export const FilterBar = ({
  fields,
  onFilterChange,
  onReset,
}: FilterBarProps) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = useCallback(
    (fieldName: string, value: string) => {
      const newFilterValues = {
        ...filterValues,
        [fieldName]: value,
      };

      // Remover filtros vacíos
      Object.keys(newFilterValues).forEach((key) => {
        if (!newFilterValues[key]) {
          delete newFilterValues[key];
        }
      });

      setFilterValues(newFilterValues);

      // Construir strings de filtros
      const filterNames = Object.keys(newFilterValues);
      const filterVals = filterNames.map((name) => newFilterValues[name]);

      onFilterChange(filterNames.join(","), filterVals.join(","));
    },
    [filterValues, onFilterChange]
  );

  const handleReset = useCallback(() => {
    setFilterValues({});
    setIsExpanded(false);
    onFilterChange("", "");
    onReset?.();
  }, [onFilterChange, onReset]);

  const hasActiveFilters = Object.keys(filterValues).length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.toggleButton}
          aria-expanded={isExpanded}
        >
          <FiFilter size={18} />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className={styles.badge}>
              {Object.keys(filterValues).length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className={styles.resetButton}
            aria-label="Limpiar filtros"
          >
            <FiX size={16} />
            Limpiar
          </button>
        )}
      </div>

      {isExpanded && (
        <div className={styles.filtersContainer}>
          {fields.map((field) => (
            <div key={field.name} className={styles.filterField}>
              <label className={styles.label}>{field.label}</label>
              {field.type === "select" ? (
                <select
                  className={styles.select}
                  value={filterValues[field.name] || ""}
                  onChange={(e) =>
                    handleFilterChange(field.name, e.target.value)
                  }
                >
                  <option value="">Todos</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "date" ? (
                <input
                  type="date"
                  className={styles.input}
                  value={filterValues[field.name] || ""}
                  onChange={(e) =>
                    handleFilterChange(field.name, e.target.value)
                  }
                />
              ) : field.type === "number" ? (
                <input
                  type="number"
                  className={styles.input}
                  placeholder={field.placeholder}
                  value={filterValues[field.name] || ""}
                  onChange={(e) =>
                    handleFilterChange(field.name, e.target.value)
                  }
                />
              ) : (
                <input
                  type="text"
                  className={styles.input}
                  placeholder={field.placeholder || field.label}
                  value={filterValues[field.name] || ""}
                  onChange={(e) =>
                    handleFilterChange(field.name, e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
