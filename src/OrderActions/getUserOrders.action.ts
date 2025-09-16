"use server";
import { getUserOrders } from "@/api/orders.api";

export default async function getUserOrdersAction(userId: string) {
  try {
    console.log("Action - Getting orders for user:", userId);
    const res = await getUserOrders(userId);
    console.log("Action - Orders result:", res);
    return res;
  } catch (err: unknown) {
    console.error("Action - Error getting user orders:", err);
    if (err instanceof Error) {
      console.log("Error getting user orders:", err.message);
      throw err;
    }
    throw new Error("Unknown error occurred");
  }
}
