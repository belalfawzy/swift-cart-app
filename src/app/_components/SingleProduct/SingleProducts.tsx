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
      <div className="w-1/5">
        <div className="p-2">
          <Card className="gap-1 px-2 py-2">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    src={product.imageCover}
                    alt="test"
                    width={500}
                    height={500}
                  />
                </CardTitle>
                <CardDescription className="text-emerald-500">
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold line-clamp-1">{product.title}</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>

            <div className="px-1 pb-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-4/5">
                  <AddBtn id={product.id}/>
                </div>
                <div className="w-1/5 flex justify-center">
                  <WishlistBtn productId={product.id} className="w-12 h-12" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}