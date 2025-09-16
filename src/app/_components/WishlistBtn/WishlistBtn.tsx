"use client";
import React, { useContext, useState } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import { toast } from "sonner";
import addToWishlistAction from "@/WishlistActions/addToWishlist.action";
import removeFromWishlistAction from "@/WishlistActions/removeFromWishlist.action";

interface WishlistBtnProps {
  productId: string;
  className?: string;
}

export default function WishlistBtn({ productId, className = "" }: WishlistBtnProps) {
  const wishlistContext = useContext(WishlistContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!wishlistContext) {
    throw new Error("WishlistContext is not available");
  }

  const { isInWishlist, refreshWishlist } = wishlistContext;
  const isInWishlistState = isInWishlist(productId);

  const handleToggleWishlist = async () => {
    setIsLoading(true);
    try {
      if (isInWishlistState) {
        await removeFromWishlistAction(productId);
        toast.success("Removed from wishlist", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        await addToWishlistAction(productId);
        toast.success("Added to wishlist", {
          position: "top-center",
          duration: 3000,
        });
      }
      await refreshWishlist();
    } catch (error) {
      if (error instanceof Error && error.message.includes("Login")) {
        toast.error("Login Required", {
          position: "top-center",
          duration: 4000,
          description: "Please log in to add products to your wishlist.",
          style: {
            background: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
      } else {
        toast.error(isInWishlistState ? "Failed to remove from wishlist" : "Failed to add to wishlist", {
          position: "top-center",
          duration: 3000,
        });
      }
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
        isInWishlistState
          ? "bg-red-100 text-red-500 hover:bg-red-200"
          : "bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500"
      } ${className}`}
      title={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLoading ? (
        <i className="fa-solid fa-spinner fa-spin text-sm"></i>
      ) : (
        <i className={`fa-solid fa-heart text-sm ${isInWishlistState ? "text-red-500" : "text-gray-500"}`}></i>
      )}
    </button>
  );
}
