import React from "react";
import collections from "./../data/collections.json";
import inventory from "./../data/inventory.json";
import categories from "./../data/categories.json";
import FilterGroup from "./FilterGroup";
import ColorFilterGroup from "./ColorFilterGroup";
import SIZE_OPTIONS from "../constants/Constants";
import RatingFilterGroup from "./RatingFilterGroup";

interface Filters {
  collections: string[];
  sizes: (string | number)[];
  categories: string[];
  colors: string[];
  ratings: number[];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  isModalOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  isModalOpen,
  onClose,
}) => {
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: keyof Filters
  ) => {
    const { value, checked } = e.target;
    const parsedValue =
      (filterType === "sizes" || filterType === "ratings") &&
      !isNaN(Number(value))
        ? Number(value)
        : value;
    const currentValues = filters[filterType] as (string | number)[];

    const updatedValues = checked
      ? [...currentValues, parsedValue]
      : currentValues.filter((item) => item !== parsedValue);

    const newFilters = {
      ...filters,
      [filterType]: updatedValues,
    };
    onFilterChange(newFilters as Filters);
  };

  const sidebarClasses = `
    w-full
    xl:relative xl:block xl:min-w-[300px] xl:w-1/4
    ${
      isModalOpen
        ? "fixed inset-0 z-50 transform translate-x-0 transition-transform duration-300"
        : "fixed inset-0 z-50 transform -translate-x-full transition-transform duration-300 xl:translate-x-0"
    }
  `;

  const sizeOptions = Array.from(
    new Set(
      inventory
        .flatMap((item) => item.size)
        .filter((size) => size !== null && size !== undefined)
    )
  ).map((size) => ({
    id: size,
    name:
      SIZE_OPTIONS[SIZE_OPTIONS.findIndex((s) => s.id === size)]?.name || size,
  }));

  const colorOptions = Array.from(
    new Set(
      inventory
        .flatMap((item) => item.color)
        .filter((color) => color !== null && color !== undefined)
    )
  ).map((color) => color);

  return (
    <>
      <div className={sidebarClasses}>
        <div
          className={`fixed inset-0 bg-gray-900/50 transition-opacity duration-300
          ${
            isModalOpen
              ? "opacity-100 xl:hidden"
              : "opacity-0 pointer-events-none"
          }
          `}
          onClick={onClose}
        ></div>

        <div
          className={`relative xl:h-auto h-full max-w-[350px] overflow-y-scroll bg-white p-4`}
        >
          {isModalOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-b-neutral-200">
              <h3 className="text-xl font-bold">Filters</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full focus:outline-none"
              >
                &times;
              </button>
            </div>
          )}
          <div className="py-4 h-full overflow-y-auto">
            <FilterGroup
              title="Collection:"
              filterType="collections"
              options={collections.map((c) => ({
                id: c.collection_id,
                name: c.name,
              }))}
              selectedFilters={filters.collections}
              onFilterChange={handleCheckboxChange}
            />

            <FilterGroup
              title="Sizes:"
              filterType="sizes"
              options={sizeOptions}
              selectedFilters={filters.sizes}
              onFilterChange={handleCheckboxChange}
            />

            <ColorFilterGroup
              colors={colorOptions}
              selectedColors={filters.colors}
              onFilterChange={handleCheckboxChange}
            />

            <FilterGroup
              title="Categories:"
              filterType="categories"
              options={categories.map((c) => ({
                id: c.category_id,
                name: c.name,
              }))}
              selectedFilters={filters.categories}
              onFilterChange={handleCheckboxChange}
            />
            <RatingFilterGroup
              ratingsRange={5}
              selectedRatings={filters.ratings}
              onFilterChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
