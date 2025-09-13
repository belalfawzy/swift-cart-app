"use server";

export default async function relatedProducts(catId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
  );

  const payload = await res.json();
  return payload;
}