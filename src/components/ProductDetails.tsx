import productInfo from "./../data/product-info.json";
import productImages from "./../data/product-images.json";
import { useParams } from "react-router-dom";

export function ProductDetails() {
  const { productId } = useParams();
  return (
    <div>
      {productInfo
        .filter((product) => product.product_id === productId)
        .map((product) => (
          <>
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </>
        ))}
      <div className="grid grid-cols-2 gap-4">
        {productImages
          .filter((image) => image.product_id === productId)
          .map((image) => (
            <img
              key={image.product_id}
              src={image.image_url}
              alt={""}
              className="object-cover w-full rounded-lg"
            />
          ))}
      </div>
    </div>
  );
}
