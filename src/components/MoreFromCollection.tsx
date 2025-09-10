import ProductCard from "./ProductCard";

interface Product {
  product_id: string;
  name: string;
}

const MoreFromCollection = ({ products }: { products: Product[] }) => {
  return (
    <section>
      <div className="mt-12 flex flex-col gap-10">
        <h2 className="text-2xl">In This Collection</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found in this collection.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default MoreFromCollection;
