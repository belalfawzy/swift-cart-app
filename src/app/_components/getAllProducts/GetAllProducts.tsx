import getProducts from "@/api/products.api";
import React from "react";
import SingleProducts from "../SingleProduct/SingleProducts";
import { ProductType } from "@/types/product.type";

export default async function GetAllProducts() {
  const data = await getProducts();

  return (
    <div className="flex flex-wrap w-[80%] mx-auto">
      {data.map((currentProduct : ProductType) => (
        <SingleProducts key={currentProduct.id} product={currentProduct} />
      ))}
    </div>
  );
}


