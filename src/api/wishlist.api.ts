"use server";
import getMyToken from "@/utilities/myToken";
import { WishlistResponse, AddToWishlistResponse, RemoveFromWishlistResponse } from "@/types/wishlist.type";

// Get user's wishlist
export async function getWishlist(): Promise<WishlistResponse> {
  const token = await getMyToken();
  if (!token) throw new Error("Please Login First..");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}

// Add product to wishlist
export async function addToWishlist(productId: string): Promise<AddToWishlistResponse> {
  const token = await getMyToken();
  if (!token) throw new Error("Please Login First..");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const payload = await res.json();
  return payload;
}

// Remove product from wishlist
export async function removeFromWishlist(productId: string): Promise<RemoveFromWishlistResponse> {
  const token = await getMyToken();
  if (!token) throw new Error("Please Login First..");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
