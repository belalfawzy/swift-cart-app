"use server";
import getMyToken from "@/utilities/myToken";
import { OrderResponse } from "@/types/order.type";

// Get user orders
export async function getUserOrders(userId: string): Promise<OrderResponse> {
  const token = await getMyToken();
  if (!token) throw new Error("Please Login First..");

  console.log("API call - User ID:", userId);
  console.log("API call - Token:", token);

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  console.log("API response status:", res.status);
  console.log("API response headers:", res.headers);

  const payload = await res.json();
  console.log("API response payload:", payload);
  
  if (!res.ok) {
    throw new Error(payload.message || `HTTP error! status: ${res.status}`);
  }

  // Handle different response structures
  if (Array.isArray(payload)) {
    // If payload is directly an array
    return {
      status: "success",
      results: payload.length,
      data: payload
    };
  } else if (payload.data && Array.isArray(payload.data)) {
    // If payload has data property with array
    return payload;
  } else {
    // Fallback
    return {
      status: "success",
      results: 0,
      data: []
    };
  }
}
