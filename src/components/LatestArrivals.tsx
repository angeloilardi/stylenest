import products from "../data/products.json";
import ProductCard from "./ProductCard";
import { compareDesc } from "date-fns";
import Button from "./ui/Button";

const LatestArrivals = () => {
  const latestProducts = products
    .map((product) => product.created_at)
    .sort(compareDesc)
    .map((date) => {
      return products.find((p) => p.created_at === date) as {
        product_id: string;
        name: string;
      };
    })
    .slice(0, 8);

  return (
    <div>
      <div className="flex justify-between mb-10">
        <h2 className="text-2xl font-semibold">Latest Arrivals</h2>
        <Button>View all</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {latestProducts.length > 0 ? (
          latestProducts.map((product) => (
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

export default LatestArrivals;
