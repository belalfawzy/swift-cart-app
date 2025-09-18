"use client";
import getLoggedUserCart from "../CartActions/getLoggedUserCart.action";
import { createContext, useEffect, useState, ReactNode } from "react";
import { CartProductType } from "@/types/cart.type";

// 1. Define the type for the context value
type CartContextType = {
  numberOfItems: number;
  setnumberOfItems: React.Dispatch<React.SetStateAction<number>>;
  cartItems: CartProductType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartProductType[]>>;
  isInCart: (productId: string) => boolean;
  getProductQuantity: (productId: string) => number;
  refreshCart: () => Promise<void>;
};

// 2. Create the context with a default value (use undefined to force checks)
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// 3. Type for the provider props
type CartContextProviderProps = {
  children: ReactNode;
};

// 4. Create the provider component
export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfItems, setnumberOfItems] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);

  // Function to check if product is in cart
  const isInCart = (productId: string): boolean => {
    return cartItems.some(item => item.product.id === productId);
  };

  // Function to get product quantity in cart
  const getProductQuantity = (productId: string): number => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.count : 0;
  };

  // Function to refresh cart
  const refreshCart = async () => {
    try {
      const res = await getLoggedUserCart();
      setCartItems(res.data.products);
      
      let sum = 0;
      res.data.products.forEach((product: { count: number }) => {
        sum += product.count;
      });
      setnumberOfItems(sum);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Error refreshing cart:", err.message);
        setCartItems([]);
        setnumberOfItems(0);
      }
    }
  };

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      console.log(res.data.products);
      setCartItems(res.data.products);

      let sum = 0;
      res.data.products.forEach((product: { count: number }) => {
        sum += product.count;
      });

      setnumberOfItems(sum);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("login first");
        setCartItems([]);
        setnumberOfItems(0);
      }
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider 
      value={{ 
        numberOfItems, 
        setnumberOfItems,
        cartItems,
        setCartItems,
        isInCart,
        getProductQuantity,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}