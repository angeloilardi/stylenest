import { useEffect, useState, type ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, CartContextType } from "./CartTypes";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart: CartContextType["addToCart"] = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart: CartContextType["removeFromCart"] = (
    itemIdentifier
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          cartItem.productId !== itemIdentifier.productId ||
          cartItem.color !== itemIdentifier.color ||
          cartItem.size !== itemIdentifier.size
      )
    );
  };

  const clearCart: CartContextType["clearCart"] = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
