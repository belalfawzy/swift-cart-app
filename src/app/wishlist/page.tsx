"use client";
import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import { WishlistData } from "@/types/wishlist.type";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showSuccessToast, showErrorToast, showInfoToast } from "@/utils/toast";
import removeFromWishlistAction from "@/WishlistActions/removeFromWishlist.action";
import AddBtn from "../_components/AddBtn/AddBtn";

export default function WishlistPage() {
  const wishlistContext = useContext(WishlistContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!wishlistContext) {
    throw new Error("WishlistContext is not available");
  }

  const { wishlistItems, refreshWishlist } = wishlistContext;

  const handleRemoveFromWishlist = async (productId: string) => {
    setIsLoading(true);
    try {
      await removeFromWishlistAction(productId);
      await refreshWishlist();
      showSuccessToast("Product removed from wishlist");
    } catch (error) {
      showErrorToast("Failed to remove product from wishlist");
      console.error("Error removing from wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-heart text-6xl text-gray-300"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products to your wishlist by clicking the heart icon on any product you love.
            </p>
            <Link href="/products">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item: WishlistData) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <Link href={`/products/${item.id}`} className="flex-1 flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFromWishlist(item.id);
                        }}
                        disabled={isLoading}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors duration-200"
                      >
                        <i className="fa-solid fa-heart text-red-500 text-sm"></i>
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1">
                  <CardDescription className="text-teal-500 text-sm mb-2">
                    {item.category.name}
                  </CardDescription>
                  <CardTitle className="text-lg font-semibold line-clamp-2 mb-3">
                    {item.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {item.category.name} • {item.brand.name}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-800">
                      {item.price} EGP
                    </span>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-500 text-sm mr-1"></i>
                      <span className="text-sm text-gray-600">
                        {item.ratingsAverage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Brand: {item.brand?.name || 'N/A'}</span>
                    <span>Rating: {item.ratingsAverage || 'N/A'}</span>
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="p-4 pt-0 mt-auto">
                <div className="w-full">
                  <AddBtn id={item.id} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
