import React from "react";
import products from "../data/products.json";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center items-center">
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
