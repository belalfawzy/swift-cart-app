"use server";
import { addProductToWishlist } from "@/api/wishlist.api";

export default async function addToWishlistAction(productId: string) {
  try {
    const res = await addProductToWishlist(productId);
    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error adding to wishlist:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred");
  }
}
