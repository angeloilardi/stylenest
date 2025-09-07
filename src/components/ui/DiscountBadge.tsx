const DiscountBadge = ({
  listPrice,
  salePrice,
}: {
  listPrice: number;
  salePrice: number;
}) => {
  return (
    <div className="w-30 rounded-4xl border-2 border-amber-200 text-red-600/50 flex justify-center items-center bg-amber-200/30 py-2">
      <p>{`${Math.round(((listPrice - salePrice) / listPrice) * 100)}% OFF`}</p>
    </div>
  );
};
export default DiscountBadge;
