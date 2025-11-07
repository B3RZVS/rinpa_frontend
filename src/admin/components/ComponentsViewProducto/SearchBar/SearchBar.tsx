import { FiSearch } from "react-icons/fi";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className={styles.searchContainer}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <FiSearch
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-neutral-dark)",
          }}
        />
        <input
          type="text"
          placeholder="Buscar tipos de producto..."
          className={styles.searchInput}
          style={{ paddingLeft: "40px" }}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
