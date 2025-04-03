import React, { createContext, useState, useContext, useEffect } from "react";
import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
  fetchCartItems,
  apiUpdateCartItem,
} from "../api";
import { useAuth } from "./AuthContext";
export interface CartItem {
  _id?: number;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string | null;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { authState } = useAuth();

  const getUserId = () => {
    if (!authState.user) {
      throw new Error("User is not authenticated");
    }
    return authState.user.userId;
  };

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const userId = getUserId();
        const cart = await fetchCartItems(userId);
        setCartItems(cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (authState.user) {
      fetchUserCart();
    }
  }, [authState.user]);

  const addToCart = async (item: CartItem) => {
    try {
      const userId = getUserId();
      const payload = {
        userId,
        productId: item.productId,
        name: item.name,
        price: item.price,
        size: item.size || null,
        quantity: item.quantity,
        image: item.image,
      };

      const updatedCart = await apiAddToCart(payload);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const userId = getUserId();
      const cartItem = cartItems.find((item) => item.productId === productId);

      if (!cartItem) return;

      const updatedCart = await apiRemoveFromCart(cartItem._id!, userId);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const userId = getUserId();
      const updatedCart = await apiClearCart(userId);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const updateCartItem = async (productId: string, newQuantity: number) => {
    try {
      const userId = getUserId();
      const cartItem = cartItems.find((item) => item.productId === productId);

      if (!cartItem) return;

      if (newQuantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const payload = {
        userId,
        productId: cartItem.productId,
        name: cartItem.name,
        price: cartItem.price,
        size: cartItem.size || null,
        quantity: newQuantity,
        image: cartItem.image,
      };

      const updatedCart = await apiUpdateCartItem(cartItem._id!, payload);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
