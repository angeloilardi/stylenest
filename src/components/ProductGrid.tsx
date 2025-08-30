import React from "react";
import products from "../data/products.json";
import productImages from "../data/product-images.json";
import inventory from "./../data/inventory.json";

const ProductGrid: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center items-center">
      {products.map((product) => {
        const productImage = productImages.find(
          (img) => img["product_id"] === product["product_id"]
        );
        const imageUrl = productImage ? productImage.image_url : "";

        const colors = new Set(
          inventory
            .filter((item) => item.product_id === product.product_id)
            .map((item) => item.color)
        );

        const price = inventory.find(
          (item) => item.product_id === product.product_id
        )?.list_price;

        return (
          <div
            key={product.product_id}
            className="max-h-[740px] p-2 min-w-[250px] max-w-[320px]"
          >
            <a
              href={`/product/${product.product_id}`}
              className="flex flex-col gap-1 text-decoration-none"
            >
              <img
                src={imageUrl}
                alt={product.name}
                className="object-cover aspect-[4/3] rounded-lg"
              />
              <small className="capitalize">{[...colors][0]}</small>
              <h3 className="font-semibold">{product.name}</h3>
            </a>
            <p className="py-3 text-gray-500">${price}</p>
            <div className="flex gap-2">
              {[...colors].map((color, index) => (
                <button
                  style={{ backgroundColor: color }}
                  key={index}
                  className={`w-6 h-6 rounded-full border border-gray-200`}
                ></button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
