import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface Option {
  id: string | number;
  name: string | number;
}
interface Filters {
  collections: string[];
  sizes: (string | number)[];
  categories: string[];
  colors: string[];
}

interface FilterGroupProps {
  title: string;
  filterType: "collections" | "sizes" | "categories";
  options: Option[];
  selectedFilters: (string | number)[];
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: keyof Filters
  ) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  filterType,
  options,
  selectedFilters,
  onFilterChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col py-4 border-b border-b-neutral-200">
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="font-bold text-sm">{title}</h4>
        <button
          className="text-sm text-gray-700 hover:text-gray-700 font-bold p-1 transition-transform duration-300"
          aria-expanded={isExpanded}
        >
          {isExpanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-max" : "max-h-0 overflow-hidden"
        }`}
      >
        {options.map((option) => (
          <label key={option.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={option.name.toString()}
              value={option.id}
              checked={selectedFilters.includes(option.id)}
              onChange={(e) => onFilterChange(e, filterType)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
