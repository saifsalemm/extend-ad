import { useRef } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  setSearchTerm,
}: {
  setSearchTerm: (x: string) => void;
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.searchBar}>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search for a product..."
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setSearchTerm(searchRef.current?.value ?? "");
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
