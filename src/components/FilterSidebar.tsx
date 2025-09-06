import React from "react";
import collections from "./../data/collections.json";
import inventory from "./../data/inventory.json";
import categories from "./../data/categories.json";
import ColorSwatch from "./ui/ColorSwatch";

interface Filters {
  collections: string[];
  sizes: (string | number)[];
  categories: string[];
  colors: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: keyof Filters
  ) => {
    const { value, checked } = e.target;
    const parsedValue =
      filterType === "sizes" && !isNaN(Number(value)) ? Number(value) : value;
    const currentValues = filters[filterType] as (string | number)[];

    const updatedValues = checked
      ? [...currentValues, parsedValue]
      : currentValues.filter((item) => item !== parsedValue);

    console.log(updatedValues);

    const newFilters = {
      ...filters,
      [filterType]: updatedValues,
    };

    console.log(newFilters);
    onFilterChange(newFilters as Filters);
  };

  return (
    <div className="max-w-xs">
      <h3>Filters</h3>
      <div className="flex flex-col mb-4">
        <label>Collection:</label>
        {collections.map((collection) => (
          <label key={collection.collection_id}>
            <input
              type="checkbox"
              name="collection"
              value={collection.collection_id}
              checked={filters.collections.includes(collection.collection_id)}
              onChange={(e) => handleCheckboxChange(e, "collections")}
            />{" "}
            {collection.name}
          </label>
        ))}
      </div>
      <div className="flex flex-col mb-4">
        <label>Sizes:</label>
        {Array.from(
          new Set(
            inventory
              .flatMap((item) => item.size)
              .filter((size) => size !== null && size !== undefined)
          )
        ).map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              name="size"
              value={String(size)}
              checked={filters.sizes.includes(size)}
              onChange={(e) => handleCheckboxChange(e, "sizes")}
            />{" "}
            {size}
          </label>
        ))}
      </div>
      <div className="flex flex-col mb-4">
        <label>Colors:</label>
        <div className="flex flex-wrap gap-1">
          {Array.from(
            new Set(
              inventory
                .flatMap((item) => item.color)
                .filter((color) => color !== null && color !== undefined)
            )
          ).map((color) => (
            <label htmlFor={`color-${color}`} key={color}>
              <input
                id={`color-${color}`}
                type="checkbox"
                name="color"
                value={color}
                checked={filters.colors.includes(color)}
                onChange={(e) => handleCheckboxChange(e, "colors")}
                className="hidden peer"
              />
              <ColorSwatch
                color={color}
                className={`p-1 peer-checked:ring-gray-500 peer-checked:ring-2 focus:ring-2 focus:ring-blue-500`}
              ></ColorSwatch>
              <span className="ml-2 capitalize sr-only">{color}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <label>Categories:</label>
        {categories.map((category) => (
          <label key={category.category_id}>
            <input
              type="checkbox"
              name="category"
              value={category.category_id}
              checked={filters.categories.includes(category.category_id)}
              onChange={(e) => handleCheckboxChange(e, "categories")}
            />{" "}
            {category.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
