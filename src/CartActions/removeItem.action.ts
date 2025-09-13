"use server";

import getMyToken from "@/utilities/myToken";

export default async function RemoveItemFromCart(id: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please, Login First");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const payload = await res.json();
  return payload;
}