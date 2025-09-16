"use client";
import AddToCart from "@/CartActions/addProduct.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import QuantityControls from "../QuantityControls/QuantityControls";

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
        toast.error("Failed to add product.", {
          position: "top-center",
          duration: 3000,
          description: "An error occurred. Please try again.",
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
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
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
      }
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
      className="relative bg-teal-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-teal-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 mt-2 w-full"
    >
      {isLoading ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <span className="opacity-0">
            <i className="fa-solid fa-cart-plus mr-2"></i>
            Add To Cart
          </span>
        </>
      ) : (
        <>
          <i className="fa-solid fa-cart-plus mr-2"></i>
          Add To Cart
          <span className="absolute -top-2 -right-2 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-teal-500 text-xs items-center justify-center text-white">
              +
            </span>
          </span>
        </>
      )}
    </Button>
  );
}