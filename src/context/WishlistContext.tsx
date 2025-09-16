"use client";
import getWishlistAction from "../WishlistActions/getWishlist.action";
import { createContext, useEffect, useState, ReactNode } from "react";
import { WishlistData } from "@/types/wishlist.type";

// 1. Define the type for the context value
type WishlistContextType = {
  wishlistItems: WishlistData[];
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistData[]>>;
  numberOfWishlistItems: number;
  setNumberOfWishlistItems: React.Dispatch<React.SetStateAction<number>>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
};

// 2. Create the context with a default value (use undefined to force checks)
export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// 3. Type for the provider props
type WishlistContextProviderProps = {
  children: ReactNode;
};

// 4. Create the provider component
export default function WishlistContextProvider({
  children,
}: WishlistContextProviderProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistData[]>([]);
  const [numberOfWishlistItems, setNumberOfWishlistItems] = useState<number>(0);

  // Function to check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Function to refresh wishlist
  const refreshWishlist = async () => {
    try {
      const res = await getWishlistAction();
      setWishlistItems(res.data);
      setNumberOfWishlistItems(res.count);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Error refreshing wishlist:", err.message);
        // Reset wishlist on error
        setWishlistItems([]);
        setNumberOfWishlistItems(0);
      }
    }
  };

  async function getUserWishlist() {
    try {
      const res = await getWishlistAction();
      setWishlistItems(res.data);
      setNumberOfWishlistItems(res.count);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Error getting wishlist:", err.message);
        setWishlistItems([]);
        setNumberOfWishlistItems(0);
      }
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        setWishlistItems, 
        numberOfWishlistItems, 
        setNumberOfWishlistItems,
        isInWishlist,
        refreshWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
