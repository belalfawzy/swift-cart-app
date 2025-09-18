"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { toast } from "sonner";
import updateProductQuantity from "@/CartActions/updateProductQuantity.action";
import removeItem from "@/CartActions/removeItem.action";

interface QuantityControlsProps {
  productId: string;
  className?: string;
}

export default function QuantityControls({ productId, className = "" }: QuantityControlsProps) {
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!cartContext) {
    throw new Error("CartContext is not available");
  }

  const { getProductQuantity, refreshCart } = cartContext;
  const quantity = getProductQuantity(productId);

  const handleIncrease = async () => {
    setIsLoading(true);
    try {
      await updateProductQuantity(productId, quantity + 1);
      await refreshCart();
      toast.success("Quantity updated", {
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to update quantity", {
        position: "top-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 1) {
      // Remove item from cart
      setIsLoading(true);
      try {
        await removeItem(productId);
        await refreshCart();
        toast.success("Item removed from cart", {
          position: "top-center",
          duration: 2000,
        });
      } catch (error) {
        toast.error("Failed to remove item", {
          position: "top-center",
          duration: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Decrease quantity
      setIsLoading(true);
      try {
        await updateProductQuantity(productId, quantity - 1);
        await refreshCart();
        toast.success("Quantity updated", {
          position: "top-center",
          duration: 2000,
        });
      } catch (error) {
        toast.error("Failed to update quantity", {
          position: "top-center",
          duration: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      await removeItem(productId);
      await refreshCart();
      toast.success("Item removed from cart", {
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to remove item", {
        position: "top-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (quantity === 0) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between bg-teal-50 rounded-lg p-1.5 border border-teal-200 ${className}`}>
      <div className="flex items-center space-x-2">
        <Button
          onClick={handleDecrease}
          disabled={isLoading}
          className="w-8 h-8 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin text-xs"></i> : "-"}
        </Button>
        <span className="text-xs font-semibold text-teal-700 w-5 text-center">
          {quantity}
        </span>
        <Button
          onClick={handleIncrease}
          disabled={isLoading}
          className="w-8 h-8 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin text-xs"></i> : "+"}
        </Button>
      </div>
      <Button
        onClick={handleRemove}
        disabled={isLoading}
        className="w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        title="Remove from cart"
      >
        {isLoading ? <i className="fas fa-spinner fa-spin text-xs"></i> : <i className="fas fa-trash text-xs"></i>}
      </Button>
    </div>
  );
}
