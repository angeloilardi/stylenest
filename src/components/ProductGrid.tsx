import React, { useState, useEffect } from "react";
import products from "../data/products.json";
import inventory from "../data/inventory.json";
import productReviews from "../data/product-reviews.json";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { CiFilter } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";

interface Filters {
  collections: string[];
  sizes: (string | number)[];
  categories: string[];
  colors: string[];
  ratings: number[];
}

interface ProductReview {
  product_id: string;
  user_id: string;
  rating: number;
  content: string | null;
  created_at: string;
}

const ProductGrid: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    collections: [],
    sizes: [],
    categories: [],
    colors: [],
    ratings: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

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

    const productReview = (productReviews as ProductReview[]).find(
      (review) => review.product_id === product.product_id
    );
    const productRating = productReview?.rating;

    const ratingMatch =
      filters.ratings.length === 0 ||
      (productRating !== undefined &&
        filters.ratings.includes(Math.floor(productRating)));

    if (!collectionMatch || !categoryMatch || !ratingMatch) {
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

      return sizeMatch && colorMatch && ratingMatch;
    });
  });

  return (
    <div className="p-4">
      <div className="xl:flex xl:justify-center xl:gap-4">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <div className="flex flex-col">
          <div className="flex justify-between xl:justify-end text-sm my-6">
            <button
              className="border border-neutral-200 px-2 flex items-center gap-2 rounded-md xl:hidden"
              onClick={() => setIsModalOpen(true)}
            >
              <CiFilter /> Filter
            </button>

            <button className="border shadow border-neutral-200 p-4 flex items-center gap-2 rounded-md">
              Sort by <IoChevronDownOutline />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
      </div>
    </div>
  );
};

export default ProductGrid;
