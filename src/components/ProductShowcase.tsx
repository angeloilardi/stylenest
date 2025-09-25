import products from "../data/products.json";
import ProductCard from "./ProductCard";
import { useMemo } from "react";
import { compareDesc, parseISO } from "date-fns";
import Button from "./ui/Button";
import { useParams } from "react-router-dom";
import collections from "../data/collections.json";

interface ProductShowcaseProps {
  limit?: number;
}

const ProductShowcase = ({ limit = 8 }: ProductShowcaseProps) => {
  const { category, collection } = useParams();

  const title = collection
    ? collection === "latest-arrivals"
      ? "Latest Arrivals"
      : collections.find((c) => c.collection_id === collection)?.name ||
        "Collection"
    : category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Latest Arrivals";

  const productsToShow = useMemo(() => {
    let filteredProducts = [...products];

    if (collection) {
      filteredProducts = filteredProducts.filter(
        (p) => p.collection === collection
      );
    }

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }

    if (collection === "latest-arrivals") {
      // For "Latest Arrivals", we consider all products
      filteredProducts = [...products];
    }

    filteredProducts.sort((a, b) =>
      compareDesc(parseISO(a.created_at), parseISO(b.created_at))
    );

    return filteredProducts.slice(0, limit);
  }, [limit, collection, category]);

  return (
    <div>
      <div className="flex justify-between mb-10">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <a href="/products">
          <Button>View all</Button>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
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

export default ProductShowcase;
