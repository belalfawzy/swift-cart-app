import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";
import WishlistBtn from "../WishlistBtn/WishlistBtn";

export default function SingleProducts({ product }: { product: ProductType }) {
  return (
    <>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="p-2">
          <Card className="gap-1 px-2 py-2 h-full">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <div className="relative w-full aspect-square overflow-hidden rounded-md">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  </div>
                </CardTitle>
                <CardDescription className="text-emerald-500">
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold line-clamp-2 text-sm sm:text-base">{product.title}</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full items-center">
                  <span className="text-sm sm:text-base font-medium">{product.price} EGP</span>
                  <span className="text-xs sm:text-sm flex items-center gap-1">
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>

            <div className="px-1 pb-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <AddBtn id={product.id}/>
                </div>
                <div className="flex-shrink-0">
                  <WishlistBtn productId={product.id} className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}