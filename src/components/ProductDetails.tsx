import productInfo from "./../data/product-info.json";
import productImages from "./../data/product-images.json";
import products from "./../data/products.json";
import inventory from "./../data/inventory.json";
import productReviews from "./../data/product-reviews.json";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import DiscountBadge from "./ui/DiscountBadge";
import RatingStars from "./ui/RatingStars";
import ColorSwatch from "./ui/ColorSwatch";

export function ProductDetails() {
  const { productId } = useParams();
  const colorOptions = [
    ...new Set(
      productImages
        .filter((item) => item.product_id === productId)
        .map((item) => item.color)
    ),
  ];
  const [currentColor, setCurrentColor] = useState<string | null>(
    colorOptions[0] || null
  );

  const [currentSize, setCurrentSize] = useState<string | number | null>(null);

  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  const allImages = productImages.filter((img) => img.product_id === productId);

  const imagesFilteredByColor = allImages.filter(
    (img) => img.color === currentColor
  );

  const currentInventoryItem = useMemo(() => {
    return inventory.find(
      (item) => item.product_id === productId && item.color === currentColor
    );
  }, [currentColor, productId]);

  const listPrice = currentInventoryItem?.list_price || 0;
  const salePrice = currentInventoryItem?.sale_price || 0;
  const isDiscounted = useMemo(() => {
    return salePrice < listPrice && salePrice > 0;
  }, [salePrice, listPrice]);

  const [totalReviews, setTotalReviews] = useState(0);

  const productRating = useMemo(() => {
    setTotalReviews(
      productReviews.filter((item) => item.product_id === productId).length
    );
    return (
      productReviews
        .filter((item) => item.product_id === productId)
        .reduce((acc, item) => acc + item.rating, 0) / totalReviews || 0
    );
  }, [productId, totalReviews]);

  const sizeOptions = useMemo(() => {
    return inventory
      .filter((item) => item.product_id === productId)
      .map((item) => item.size);
  }, [productId]);

  return (
    <div className="flex flex-col p-4 max-w-full">
      <div className="flex flex-col gap-11 py-18">
        <div className="w-full">
          <img
            src={imagesFilteredByColor[currentPictureIndex]?.image_url || ""}
            alt={""}
            className="object-cover w-full rounded-lg"
          />
        </div>
        <div className="flex max-w-full gap-6 snap-x overflow-x-auto">
          {imagesFilteredByColor.map((img, index) => (
            <img
              key={`image-${index}`}
              src={img.image_url}
              alt={""}
              className={`object-cover rounded-lg w-[120px] ${
                currentPictureIndex === index ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setCurrentPictureIndex(index)}
            />
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-semibold">
        {products.find((item) => item.product_id === productId)?.name}
      </h1>
      <div className="flex py-3 gap-2 items-center text-gray-500">
        {isDiscounted ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <span className="text-3xl">${salePrice}</span>
              <p className="line-through text-neutral-400">${listPrice}</p>
            </div>
            <DiscountBadge listPrice={listPrice} salePrice={salePrice} />
          </div>
        ) : (
          <span className="text-3xl">${listPrice}</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-3xl">{productRating.toFixed(1)}</span>
        <RatingStars rating={productRating} ratingRange={5} />
        <a href="#" className="text-blue-500">
          See all {totalReviews} reviews
        </a>
      </div>
      <p className="py-12">
        {products.find((item) => item.product_id === productId)?.description}
      </p>
      <div className="flex flex-col">
        <p>Available colors:</p>
        <ul className="flex gap-2 pt-10 pb-16">
          {colorOptions.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
              className="w-15 h-15"
            />
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        Available sizes:
        <ul className="flex gap-2 pt-10 pb-16 flex-wrap">
          {sizeOptions.map((size) => (
            <li
              key={size}
              className={`border border-neutral-200 p-2 rounded w-24 h-16 flex items-center justify-center cursor-pointer hover:border-black ${
                size === currentSize ? "border-black" : ""
              }`}
              onClick={() => setCurrentSize(size)}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
