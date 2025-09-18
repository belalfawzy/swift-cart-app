"use server";
import { removeProductFromWishlist } from "@/api/wishlist.api";

export default async function removeFromWishlistAction(productId: string) {
  try {
    const res = await removeProductFromWishlist(productId);
    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error removing from wishlist:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred");
  }
}
