"use server"
import getMyToken from "@/utilities/myToken";

export default async function AddToCart(id: string) {
  const token = await getMyToken();

  if (!token) throw new Error("Please, Login First...");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const payload = await res.json();
  console.log("Add to cart response:", payload);
  
  if (!res.ok) {
    // Check if it's a password change error
    if (payload.message && payload.message.includes("password")) {
      throw new Error("PASSWORD_CHANGED");
    }
    throw new Error(payload.message || `HTTP error! status: ${res.status}`);
  }
  
  return payload;
}