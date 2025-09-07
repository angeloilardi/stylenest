import RatingStars from "./ui/RatingStars";

interface RatingFilterGroupProps {
  ratingsRange: number;
  selectedRatings: number[];
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: "ratings"
  ) => void;
}

const RatingFilterGroup: React.FC<RatingFilterGroupProps> = ({
  ratingsRange,
  selectedRatings,
  onFilterChange,
}) => {
  const ratings = Array.from(
    { length: ratingsRange },
    (_, i) => ratingsRange - i
  );
  return (
    <div className="flex flex-col py-4 border-b border-b-neutral-200">
      <h4 className="font-bold text-sm mb-2">Ratings:</h4>
      <div className="flex flex-wrap gap-1 flex-col">
        {ratings.map((rating) => (
          <label htmlFor={`rating-${rating}`} key={rating}>
            <input
              id={`rating-${rating}`}
              type="checkbox"
              name="rating"
              value={rating}
              checked={selectedRatings.includes(rating)}
              onChange={(e) => onFilterChange(e, "ratings")}
              className="hidden peer"
            />
            <RatingStars rating={rating} ratingRange={ratingsRange} />
            <span className="ml-2 sr-only">{rating} stars</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilterGroup;
