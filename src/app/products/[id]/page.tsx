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
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row my-12 px-4">
        <div className="w-full lg:w-1/4 p-4">
          <div className="relative w-full h-64 lg:h-80 overflow-hidden rounded-lg">
            <Image src={data.imageCover} className="object-cover" alt={data.title} fill />
          </div>
        </div>
        <div className="w-full lg:w-3/4 p-4">
          <h1 className="my-4 font-bold text-2xl sm:text-3xl">{data.title}</h1>
          <p className="text-slate-500 mb-4 text-sm sm:text-base">{data.description}</p>
          <p className="text-emerald-600 text-sm sm:text-base">{data.category.name}</p>
          <div className="flex justify-between w-full my-4 bg-slate-100 p-3 rounded-lg">
            <span className="text-lg sm:text-xl font-semibold">{data.price} EGP</span>
            <span className="text-sm sm:text-base flex items-center gap-1">
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

      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="flex flex-wrap">
          {myrelatedProducts.data.map((currentProduct: ProductType) => (
            <SingleProducts key={currentProduct.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
}