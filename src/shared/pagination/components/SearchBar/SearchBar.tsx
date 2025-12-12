import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  debounceMs?: number;
  initialValue?: string;
}

export const SearchBar = ({
  placeholder = "Buscar...",
  onSearch,
  debounceMs = 300,
  initialValue = "",
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  const handleClear = useCallback(() => {
    setSearchTerm("");
    onSearch("");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <FiSearch className={styles.searchIcon} size={20} />
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpiar búsqueda"
          >
            <FiX size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
