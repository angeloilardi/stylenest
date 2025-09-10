import ProductCard from "./ProductCard";

interface Product {
  product_id: string;
  name: string;
}

const MoreFromCollection = ({ products }: { products: Product[] }) => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl">In This Collection</h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-10">
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
