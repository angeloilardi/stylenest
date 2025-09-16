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
import SIZE_OPTIONS from "../constants/Constants";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ProductSpecifications from "./ProductSpecifications";
import MoreFromCollection from "./MoreFromCollection";
import { compareDesc } from "date-fns";
import { useCart } from "./../context/Cart/useCart";

export function ProductDetails() {
  const { productId } = useParams();
  const colorOptions = useMemo(() => {
    return [
      ...new Set(
        productImages
          .filter((item) => item.product_id === productId)
          .map((item) => item.color)
      ),
    ];
  }, [productId]);

  const defaultColor = useMemo(() => {
    // Find the first available color by checking inventory stock.
    const firstAvailableColor = colorOptions.find((color) => {
      return inventory.some(
        (item) =>
          item.product_id === productId &&
          item.color === color &&
          item.stock > item.sold
      );
    });
    return firstAvailableColor || colorOptions[0] || null;
  }, [colorOptions, productId]);

  const [currentColor, setCurrentColor] = useState<string | null>(defaultColor);

  const [currentSize, setCurrentSize] = useState<string | number | null>(null);

  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const productName = useMemo(() => {
    return products.find((item) => item.product_id === productId)?.name;
  }, [productId]);

  const productDetails = useMemo(() => {
    return productInfo.filter((item) => item.product_id === productId);
  }, [productId]);

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
      .map((item) => (item.color === currentColor ? item.size : null))
      .filter((item) => item !== null);
  }, [productId, currentColor]);

  const isItemAvailableForPurchase = useMemo(() => {
    const currentItem = inventory.find(
      (item) =>
        item.product_id === productId &&
        item.color === currentColor &&
        item.size === currentSize
    );
    return currentItem && currentItem.stock > currentItem.sold;
  }, [productId, currentColor, currentSize]);

  const relatedProducts = useMemo(() => {
    const collection = products.find((p) => p.product_id === productId)
      ?.collection as string;
    if (!collection) return [];
    return products
      .filter(
        (product) =>
          product.collection === collection && product.product_id !== productId
      )
      .map((product) => product.created_at)
      .sort(compareDesc)
      .map((date) => {
        return products.find((p) => p.created_at === date) as {
          product_id: string;
          name: string;
        };
      })
      .slice(0, 4);
  }, [productId]);

  const { addToCart, cart } = useCart();

  const handleAddToCart = () => {
    if (!productId || !currentColor || !productName) return;

    if (sizeOptions.length > 0 && !currentSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      productName,
      productId,
      color: currentColor,
      size: currentSize,
      quantity,
    });
    console.log(cart);
  };

  return (
    <div className="flex flex-col mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Image gallery */}
        <div className="flex flex-col gap-11 py-18 lg:py-0">
          <div className="w-full">
            <img
              src={imagesFilteredByColor[currentPictureIndex]?.image_url || ""}
              alt={""}
              className="object-cover w-full rounded-lg lg:max-h-[600px]"
            />
          </div>
          <div className="flex max-w-full gap-6 snap-x overflow-x-auto">
            {imagesFilteredByColor.map((img, index) => (
              <img
                key={`image-${index}`}
                src={img.image_url}
                alt={""}
                className={`object-cover rounded-lg w-[120px] ${
                  currentPictureIndex === index
                    ? "border-2 border-blue-500"
                    : ""
                }`}
                onClick={() => setCurrentPictureIndex(index)}
              />
            ))}
          </div>
        </div>
        <div>
          {/* Product name */}
          <h1 className="text-2xl font-semibold">{productName}</h1>
          {/* Price */}
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
          {/* Rating */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">{productRating.toFixed(1)}</span>
            <RatingStars rating={productRating} ratingRange={5} />
            <a href="#" className="text-blue-500">
              See all {totalReviews} reviews
            </a>
          </div>
          {/* Product description */}
          <p className="py-12">
            {
              products.find((item) => item.product_id === productId)
                ?.description
            }
          </p>
          {/* Available colors */}
          <div className="flex flex-col">
            <p>Available colors:</p>
            <ul className="flex gap-2 mt-10">
              {colorOptions.map((color) => {
                const isColorAvailable = inventory.some(
                  (item) =>
                    item.product_id === productId &&
                    item.color === color &&
                    item.stock > item.sold
                );
                return (
                  <ColorSwatch
                    key={color}
                    color={color}
                    currentColor={currentColor}
                    hasTick={isColorAvailable}
                    setCurrentColor={(newColor) => {
                      if (isColorAvailable) {
                        setCurrentColor(newColor);
                        setCurrentSize(null);
                      }
                    }}
                    className={`w-15 h-15 ${
                      !isColorAvailable ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  />
                );
              })}
            </ul>
          </div>
          {/* Available sizes */}
          <div className="flex flex-col gap-4 mt-10">
            Available sizes:
            <ul className="flex gap-2 flex-wrap">
              {sizeOptions && sizeOptions.length > 0 ? (
                sizeOptions.map((size) => {
                  const currentItem = inventory.find(
                    (item) =>
                      item.product_id === productId &&
                      item.color === currentColor &&
                      item.size === size
                  );
                  const isSizeAvailable =
                    currentItem && currentItem.stock > currentItem.sold;
                  return (
                    <li
                      key={size}
                      className={`border border-neutral-200 p-2 rounded w-24 h-16 flex items-center justify-center
                      ${size === currentSize ? "border-neutral-900" : ""} ${
                        isSizeAvailable
                          ? "cursor-pointer hover:border-black"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (isSizeAvailable) {
                          setCurrentSize(size);
                        }
                      }}
                    >
                      {!Number.isNaN(size)
                        ? size.toString()
                        : SIZE_OPTIONS.find((s) => s.id === size)?.shortName ||
                          ""}
                    </li>
                  );
                })
              ) : (
                <li
                  className={`border border-neutral-200 p-2 rounded w-24 h-16 flex items-center justify-center`}
                >
                  One Size
                </li>
              )}
            </ul>
          </div>
          {/* Quantity selector */}
          <div className="flex flex-col mt-10 gap-7 mb-12">
            <p>Quantity</p>
            <div className="flex w-[186px] rounded-lg bg-neutral-100 justify-between items-center">
              <AiOutlineMinus
                role="button"
                className="w-6 h-6 m-4 text-gray-500 cursor-pointer"
                onClick={() =>
                  isItemAvailableForPurchase &&
                  setQuantity(Math.max(1, quantity - 1))
                }
              />
              <span className="text-lg">{quantity}</span>
              <AiOutlinePlus
                role="button"
                className="w-6 h-6 m-4 text-gray-500 cursor-pointer"
                onClick={() =>
                  isItemAvailableForPurchase && setQuantity(quantity + 1)
                }
              />
            </div>
          </div>
          {/* Add to Cart button */}
          <button
            className={`w-full text-white py-2 rounded-lg ${
              isItemAvailableForPurchase
                ? "bg-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isItemAvailableForPurchase}
            onClick={handleAddToCart}
            type="button"
            role="button"
          >
            Add to Cart
          </button>
          {/* Product Details */}
          <div className="flex flex-col gap-11 mt-11">
            {productDetails.map((detail) => (
              <div
                key={detail.product_id}
                className="border-b border-b-neutral-200 pb-11 last:border-0"
              >
                <h2 className="text-xl font-semibold">{detail.title}</h2>
                <ul className="list-disc pl-5">
                  {detail.description.map((desc) => (
                    <li key={desc} className="text-gray-600">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductSpecifications />
      <MoreFromCollection products={relatedProducts} />
    </div>
  );
}
