"use server";
import { getWishlist } from "@/api/wishlist.api";

export default async function getWishlistAction() {
  try {
    const res = await getWishlist();
    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error getting wishlist:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred");
  }
}
