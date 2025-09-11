import { useMemo, useState } from "react";
import productImages from "../data/product-images.json";
import inventory from "./../data/inventory.json";
import ColorSwatch from "./ui/ColorSwatch";
interface Product {
  product_id: string;
  name: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const colors = useMemo(() => {
    return Array.from(
      new Set(
        inventory
          .filter((item) => item.product_id === product.product_id)
          .map((item) => item.color)
          .filter((color) => color)
      )
    );
  }, [product.product_id]);
  const [currentColor, setCurrentColor] = useState<string | null>(null);

  const hasMultipleColors = colors.length > 1;

  const currentInventoryItem = useMemo(() => {
    return inventory.find(
      (item) =>
        item.product_id === product.product_id &&
        item.color === (currentColor ?? colors[0])
    );
  }, [product.product_id, currentColor, colors]);

  const listPrice = currentInventoryItem?.list_price || 0;
  const salePrice = currentInventoryItem?.sale_price || 0;
  const isDiscounted = useMemo(() => {
    return salePrice < listPrice && salePrice > 0;
  }, [salePrice, listPrice]);

  const productImage = useMemo(
    () =>
      productImages.find(
        (img) =>
          img.product_id === product.product_id &&
          img.color === (currentColor ? currentColor : colors[0])
      ),
    [product.product_id, currentColor, colors]
  );
  const imageUrl = productImage ? productImage.image_url : "";

  return (
    <div key={product.product_id} className=" focus:ring-2 w-full min-w[250px]">
      <a
        href={`/product/${product.product_id}`}
        className="flex flex-col gap-1 text-decoration-none"
      >
        <img
          // width={450}
          // height={300}
          src={imageUrl}
          alt={product.name}
          className="object-cover rounded-lg aspect-square"
          loading="lazy"
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
          <ColorSwatch
            key={index}
            color={color}
            currentColor={currentColor}
            setCurrentColor={hasMultipleColors ? setCurrentColor : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
