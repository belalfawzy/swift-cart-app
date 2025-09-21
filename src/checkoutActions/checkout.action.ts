"use server";

import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/myToken";

export default async function OnlineCheckout(
  cartId: string,
  _url = process.env.NEXT_URL,
  formValues: checkoutSchemaType
) {
  const token = await getMyToken();
  if (!token) throw new Error("Login First");

  // Simple solution: Always use production URL for Stripe redirect (without /allorders)
  const finalUrl = 'https://swiftcartapp.vercel.app';

  console.log("Using redirect URL:", finalUrl);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("Full API URL:", `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${finalUrl}`);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${finalUrl}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );

  const payload = await res.json();
  
  // Log the response to see what URL is being returned
  console.log("API Response:", payload);
  if (payload.session && payload.session.url) {
    console.log("Stripe session URL:", payload.session.url);
  }
  
  return payload;
}