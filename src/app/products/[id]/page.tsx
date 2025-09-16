import getProductDetails from "@/api/details.api";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
import SingleProducts from "@/app/_components/SingleProduct/SingleProducts";
import relatedProducts from "@/paramsAction/relatedProducts.action";
import { ProductType } from "@/types/product.type";
import Image from "next/image";
import React from "react";
import WishlistBtn from "@/app/_components/WishlistBtn/WishlistBtn";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getProductDetails(id);
  if (!data) return <h1>No Product Here</h1>;

  const myrelatedProducts = await relatedProducts(data.category._id);

  return (
    <>
      <div className="w-[70%] mx-auto flex my-12">
        <div className="w-1/4 p-4">
          <div>
            <Image src={data.imageCover} className="w-full" alt="" width={500} height={500} />
          </div>
        </div>
        <div className="w-3/4 p-4">
          <h1 className="my-4 font-bold text-3xl">{data.title}</h1>
          <p className="text-slate-500 mb-4">{data.description}</p>
          <p className="text-emerald-600">{data.category.name}</p>
          <div className="flex justify-between w-full my-4 bg-slate-100 p-2 rounded-lg">
            <span>{data.price} EGP</span>
            <span>
              {data.ratingsAverage}
              <i className="fas fa-star text-yellow-500"></i>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <AddBtn id={data.id} />
            </div>
            <WishlistBtn productId={data.id} className="w-12 h-12" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap w-[80%] mx-auto">
        {myrelatedProducts.data.map((currentProduct: ProductType) => (
          <SingleProducts key={currentProduct.id} product={currentProduct} />
        ))}
      </div>
    </>
  );
}