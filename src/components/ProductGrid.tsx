import React, { useState } from "react";
import products from "../data/products.json";
import inventory from "../data/inventory.json";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

interface Filters {
  collections: string[];
  sizes: (string | number)[];
  categories: string[];
  colors: string[];
}

const ProductGrid: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    collections: [],
    sizes: [],
    categories: [],
    colors: [],
  });

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  const filteredProducts = products.filter((product) => {
    // Check for a match against the collection and category filters
    const collectionMatch =
      filters.collections.length === 0 ||
      filters.collections.includes(product.collection);

    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    // If a product doesn't match the collection or category filters, it's immediately excluded
    if (!collectionMatch || !categoryMatch) {
      return false;
    }

    // Check for a match against the size and color filters by looking at the inventory
    const inventoryMatches = inventory.filter(
      (item) => item.product_id === product.product_id
    );

    // If no size or color filters are selected, all associated inventory items are considered a match
    if (filters.sizes.length === 0 && filters.colors.length === 0) {
      return true;
    }

    // Check if at least one inventory item matches the size and color filters
    return inventoryMatches.some((item) => {
      // Use a helper function to safely check for matches with potential null values
      const isFiltered = (
        filterValues: (string | number)[],
        productAttribute: string | number | null
      ) => {
        return (
          filterValues.length === 0 ||
          (productAttribute !== null && filterValues.includes(productAttribute))
        );
      };

      const sizeMatch = isFiltered(filters.sizes, item.size);
      const colorMatch = isFiltered(filters.colors, item.color);

      return sizeMatch && colorMatch;
    });
  });

  return (
    <div className="flex p-4">
      <div className="hidden xl:block min-w-[250px]">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
