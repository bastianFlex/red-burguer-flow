
import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterProps {
  onSearch: (term: string) => void;
  onFilterChange: (category: string) => void;
}

const FilterSection: React.FC<FilterProps> = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filters = [
    "Todos",
    "Tradicionais",
    "Lanches",
    "Bebidas",
    "Combos",
  ];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-4 md:mb-0">
          Nosso <span className="text-burguer-red">Cardápio</span>
        </h2>

        {/* Search input with enhanced styling */}
        <div className="relative w-full md:w-64">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className={cn(
              "flex items-center bg-white rounded-full border-2 border-burguer-red overflow-hidden transition-all duration-300",
              isSearchFocused ? "shadow-lg shadow-burguer-red/20" : ""
            )}>
              <button 
                type="submit" 
                className={cn(
                  "pl-4 transition-all duration-300 text-burguer-red",
                  isSearchFocused ? "transform -translate-x-1" : ""
                )}
              >
                <Search size={18} className="text-burguer-red" />
              </button>
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full py-2 px-3 outline-none"
              />
            </div>
          </form>
          <div className="text-xs text-gray-500 mt-1 ml-2">
            Digite para buscar produtos
          </div>
        </div>
      </div>

      {/* Filter pills with enhanced styling */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={cn(
              "px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base ripple-effect",
              "border-2 font-medium",
              activeFilter === filter
                ? "bg-burguer-red text-white shadow-md border-burguer-red"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-burguer-red/50"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="text-center text-sm text-burguer-red mb-6">
        Clique nos filtros acima para ver produtos específicos
      </div>
    </div>
  );
};

export default FilterSection;
