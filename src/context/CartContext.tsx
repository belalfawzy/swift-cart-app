"use client";
import getLoggedUserCart from "../CartActions/getLoggedUserCart.action";
import { createContext, useEffect, useState, ReactNode } from "react";

// 1. Define the type for the context value
type CartContextType = {
  numberOfItems: number;
  setnumberOfItems: React.Dispatch<React.SetStateAction<number>>;
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

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      console.log(res.data.products);

      let sum = 0;
      res.data.products.forEach((product: { count: number }) => {
        sum += product.count;
      });

      setnumberOfItems(sum);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("login first");
      }
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfItems, setnumberOfItems }}>
      {children}
    </CartContext.Provider>
  );
}