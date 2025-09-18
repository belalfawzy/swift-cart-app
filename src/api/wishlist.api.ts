"use server";
import getMyToken from "@/utilities/myToken";
import { WishlistResponse, AddToWishlistResponse, RemoveFromWishlistResponse } from "@/types/wishlist.type";

// Get user's wishlist
export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
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
  console.log("Get wishlist response:", payload);
  
  if (!res.ok) {
    // Check if it's a password change error
    if (payload.message && payload.message.includes("password")) {
      throw new Error("PASSWORD_CHANGED");
    }
    throw new Error(payload.message || `HTTP error! status: ${res.status}`);
  }
  
  return payload;
}

// Add product to wishlist
export async function addProductToWishlist(productId: string): Promise<AddToWishlistResponse> {
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
  console.log("Add to wishlist response:", payload);
  
  if (!res.ok) {
    // Check if it's a password change error
    if (payload.message && payload.message.includes("password")) {
      throw new Error("PASSWORD_CHANGED");
    }
    throw new Error(payload.message || `HTTP error! status: ${res.status}`);
  }
  
  return payload;
}

// Remove product from wishlist
export async function removeProductFromWishlist(productId: string): Promise<RemoveFromWishlistResponse> {
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
