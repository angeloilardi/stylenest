import reviews from "./../data/product-reviews.json";

import { compareDesc, format } from "date-fns";

interface ReviewsModalProps {
  onClose: () => void;
  productId: string;
}

const ReviewsModal = ({ onClose, productId }: ReviewsModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-gray-700/80 flex justify-center items-center z-50 transition-transform duration-300"
      onClick={onClose}
    >
      <div className="bg-white w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="flex flex-col gap-3 max-h-96 overflow-y-auto">
            {reviews
              .filter((review) => review.product_id === productId)
              .sort((a, b) =>
                compareDesc(new Date(a.created_at), new Date(b.created_at))
              )
              .map((review, index) => (
                <li key={index} className="border-b border-gray-200 pb-2">
                  <div className="flex flex-col gap-1 items-start mb-1">
                    <p className="text-sm text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                    <p className="font-medium">{review.content}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(new Date(review.created_at), "dd/MM/yyyy")} by{" "}
                    <span className="capitalize font-semibold">
                      {review.user_id.replace("-", " ")}
                    </span>
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewsModal;
