"use client";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
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
      showSuccessToast("Quantity updated");
    } catch (error) {
      showErrorToast("Failed to update quantity");
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
        showSuccessToast("Item removed from cart");
      } catch (error) {
        showErrorToast("Failed to remove item");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Decrease quantity
      setIsLoading(true);
      try {
        await updateProductQuantity(productId, quantity - 1);
        await refreshCart();
        showSuccessToast("Quantity updated");
      } catch (error) {
        showErrorToast("Failed to update quantity");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (quantity === 0) {
    return null; // Don't show controls if item is not in cart
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        onClick={handleDecrease}
        disabled={isLoading}
        size="sm"
        variant="outline"
        className="w-8 h-8 p-0 rounded-full hover:bg-red-50 hover:border-red-300"
      >
        <i className="fa-solid fa-minus text-xs"></i>
      </Button>
      
      <span className="min-w-[2rem] text-center font-semibold text-gray-700">
        {quantity}
      </span>
      
      <Button
        onClick={handleIncrease}
        disabled={isLoading}
        size="sm"
        variant="outline"
        className="w-8 h-8 p-0 rounded-full hover:bg-green-50 hover:border-green-300"
      >
        <i className="fa-solid fa-plus text-xs"></i>
      </Button>
    </div>
  );
}
