import { useState, useEffect } from "react";
import Icons from "../Icons";
import styles from "./searchbar.module.scss";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.length) return;
    onSearch(searchTerm.toLowerCase());
    setSearchTerm("");
  };

  return (
    <form
      className={styles.searchbar}
      onSubmit={handleSearch}
      data-testid="form"
    >
      <input
        type="text"
        placeholder="Search Templates"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <Icons id="SearchIcon" />
    </form>
  );
};

export default SearchBar;
