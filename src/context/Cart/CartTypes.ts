export interface CartItem {
    productId: string;
    color: string;
    size: string | number | null;
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemIdentifier: Omit<CartItem, "quantity">) => void;
    clearCart: () => void;
}
