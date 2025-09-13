"use server";

import getMyToken from "@/utilities/myToken";

export default async function UpdateProductQuantity(
  productId: string,
  count: string
) {
  const token = await getMyToken();
  if (!token) throw new Error("Please, Login First");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: count }),
    }
  );

  const payload = await res.json();
  return payload;
}