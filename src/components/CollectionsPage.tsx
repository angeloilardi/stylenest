import collection from "../data/collections.json";
import Button from "./ui/Button";

const CollectionsPage = () => {
  return (
    <div className="flex gap-6 flex-wrap">
      {collection.map((col) => (
        <div key={col.collection_id} className="mb-10 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-5">{col.name}</h2>
          <div className="h-80 w-100">
            <img
              src={col.image_url}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <p className="mb-3">{col.description}</p>
          <a href={`/collection/${col.collection_id}`} className="mt-auto">
            <Button>Shop {col.name}</Button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CollectionsPage;
