"use client";
import AddToCart from "@/CartActions/addProduct.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import QuantityControls from "../QuantityControls/QuantityControls";
import { signOut } from "next-auth/react";

export default function AddBtn({ id }: { id: string }) {
  const context = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!context) throw new Error("CartContext is not available");

  const { numberOfItems, setnumberOfItems, isInCart, refreshCart } = context;
  const isInCartState = isInCart(id);

  async function checkAdd(id: string) {
    setIsLoading(true);
    try {
      const res = await AddToCart(id);
      if (res.status === "success") {
        toast.success("Product added to cart successfully.", {
          position: "top-center",
          duration: 3000,
          description: "You can view your cart or continue shopping.",
          style: {
            background: "#14b8a6", /* teal-500 */
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(20, 184, 166, 0.3)",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
        setnumberOfItems(numberOfItems + 1);
        await refreshCart();
      } else {
        toast.error("Failed to add product to cart", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("Login")) {
        toast.error("Login Required", {
          position: "top-center",
          duration: 4000,
          description: "Please log in to add products to your cart.",
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
      } else if (err instanceof Error && err.message === "PASSWORD_CHANGED") {
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
        toast.error("Failed to add product to cart", {
          position: "top-center",
          duration: 3000,
        });
      }
      console.error("Error adding to cart:", err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isInCartState) {
    return (
      <div className="mt-2">
        <QuantityControls productId={id} />
      </div>
    );
  }

  return (
    <Button
      onClick={() => checkAdd(id)}
      disabled={isLoading}
      className="relative bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-teal-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 text-sm"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Adding...
        </>
      ) : (
        <>
          <i className="fa-solid fa-cart-plus mr-1 text-sm"></i>
          Add to Cart
        </>
      )}
    </Button>
  );
}