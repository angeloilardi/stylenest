import { FaStar } from "react-icons/fa";

const RatingStars = ({
  rating,
  ratingRange,
}: {
  rating: number;
  ratingRange: number;
}) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: ratingRange }, (_, i) => (
        <FaStar
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
