"use client";
import React, { useContext, useState } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import { toast } from "sonner";
import addToWishlistAction from "@/WishlistActions/addToWishlist.action";
import removeFromWishlistAction from "@/WishlistActions/removeFromWishlist.action";
import { signOut } from "next-auth/react";

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
      } else if (error instanceof Error && error.message === "PASSWORD_CHANGED") {
        toast.error("Session Expired", {
          position: "top-center",
          duration: 3000,
          description: "Your password was recently changed. Redirecting to login...",
          style: {
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
        // Automatic logout and redirect
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 2000);
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
      className={`relative flex items-center justify-center rounded-lg transition-all duration-300 ${
        isInWishlistState
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      } ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <i className={`fa-solid fa-heart text-sm`}></i>
      )}
    </button>
  );
}
