import { useState } from "react";
import { useCart } from "./../context/Cart/usecart";
import { AiOutlineClose } from "react-icons/ai";
import { RiShoppingBag3Line } from "react-icons/ri";

export default function CartModal() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleRemove = (
    itemId: string,
    color: string,
    size: string | number | null
  ) => {
    removeFromCart({ productId: itemId, color, size });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Cart button */}
      <button onClick={toggleModal} className="flex gap-2">
        <RiShoppingBag3Line size={24} /> ({totalItems})
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-white w-96 rounded-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={toggleModal}
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.productId}</p>
                      <p className="text-sm text-gray-500">
                        {item.color} | {item.size}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        handleRemove(item.productId, item.color, item.size)
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {cart.length > 0 && (
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
