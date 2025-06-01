import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search products...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder={placeholder}
        aria-label="Search"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <X size={18} className="text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
