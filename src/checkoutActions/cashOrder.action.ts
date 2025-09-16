"use server";

import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/myToken";

export default async function CashOrder(
  cartId: string,
  formValues: checkoutSchemaType
) {
  const token = await getMyToken();
  if (!token) throw new Error("Login First");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        shippingAddress: {
          details: formValues.details,
          phone: formValues.phone,
          city: formValues.city
        }
      }),
    }
  );

  const payload = await res.json();
  return payload;
}
