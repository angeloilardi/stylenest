import { useEffect, useState } from "react";
import productImages from "../data/product-images.json";
import inventory from "./../data/inventory.json";

interface Product {
  product_id: string;
  name: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const colors = Array.from(
    new Set(
      inventory
        .filter((item) => item.product_id === product.product_id)
        .map((item) => item.color)
    )
  );
  const [currentColor, setCurrentColor] = useState<string | null>(colors[0]);

  const productPrices = inventory.find(
    (item) =>
      item.product_id === product.product_id && item.color === currentColor
  );

  const listPrice = productPrices?.list_price || 0;
  const salePrice = productPrices?.sale_price || 0;
  useEffect(() => {
    if (salePrice < listPrice) {
      setIsDiscounted(true);
    }
  }, [salePrice, listPrice]);

  const [isDiscounted, setIsDiscounted] = useState(false);
  const productImage = productImages.find(
    (img) => img.product_id === product.product_id && img.color === currentColor
  );
  const imageUrl = productImage ? productImage.image_url : "";

  return (
    <div
      key={product.product_id}
      className="max-h-[740px] p-2 min-w-[250px] max-w-[320px] hover:scale-105 transition-transform focus-within:ring-2"
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
        <small className="capitalize">{currentColor}</small>
        <h3 className="font-semibold">{product.name}</h3>
      </a>
      <div className="flex py-3 gap-2 items-center text-gray-500">
        {isDiscounted ? (
          <>
            <span>${salePrice}</span>
            <small className="line-through">${listPrice}</small>
          </>
        ) : (
          <span>${listPrice}</span>
        )}
      </div>
      <div className="flex gap-2">
        {colors.map((color, index) => (
          <button
            style={{ backgroundColor: color }}
            key={index}
            className={`w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform ${
              color === currentColor ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setCurrentColor(color)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
