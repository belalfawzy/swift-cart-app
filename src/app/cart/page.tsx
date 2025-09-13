"use client";
import ClearCart from "@/CartActions/clear.action";
import getLoggedUserCart from "@/CartActions/getLoggedUserCart.action";
import RemoveItemFromCart from "@/CartActions/removeItem.action";
import UpdateProductQuantity from "@/CartActions/updateProductQuantity.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CartProductType } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const context = useContext(CartContext);
  if(!context) throw new Error("...")
  const { numberOfItems, setnumberOfItems } = context
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false);
  const [updatedisable, setupdatedisable] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);
  const [currentId, setcurrentId] = useState(""); // clicked Id
  const [total, settotal] = useState(0);
  const [cartId, setcartId] = useState("");

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        console.log(res);
        setcartId(res.cartId);
        settotal(res.data.totalCartPrice);
        setproducts(res.data.products);
        setisLoading(false);
      } else {
        setisLoading(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("There is no data here !");
        setisLoading(false);
      }
    }
  }

  async function RemoveFromCart(id: string, count: number) {
    setupdatedisable(true);
    setremoveDisable(true);
    const res = await RemoveItemFromCart(id);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Product removed successfully ❤️", {
        position: "top-center",
        duration: 2000,
      });
      getUserCart();

      setnumberOfItems(numberOfItems - count);
      setupdatedisable(false);
      setremoveDisable(false);
    } else {
      toast.error("Can't remove this product", {
        position: "top-center",
        duration: 2000,
      });
      setremoveDisable(false);
      setupdatedisable(false);
    }
  }

  async function UpdateProduct(id: string, newCount: string, sign: string) {
    setcurrentId(id);
    setupdateLoading(true);
    setupdatedisable(true);
    setremoveDisable(true);
    const res = await UpdateProductQuantity(id, newCount);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast("Product quantity updated", {
        position: "top-center",
        duration: 2000,
      });
      getUserCart();
      if (sign === "+") {
        setnumberOfItems(numberOfItems + 1);
      } else if (sign === "-") {
        setnumberOfItems(numberOfItems - 1);
      }
      setupdatedisable(false);
      setupdateLoading(false);
      setremoveDisable(false);
    } else {
      toast("Can't update product quantity", {
        position: "top-center",
        duration: 2000,
      });
      setupdatedisable(false);
      setupdateLoading(false);
      setremoveDisable(false);
    }
  }

  async function Clear() {
    const res = await ClearCart();
    if (res.message === "success") {
      setproducts([]);
      setnumberOfItems(0);
      toast.success("Cart cleared successfully", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-teal-700 text-2xl font-bold">Loading your cart...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {products?.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
              <Button
                onClick={() => Clear()}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                disabled={removeDisable}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                <h2 className="text-xl font-semibold">Total Cart Price</h2>
                <p className="text-2xl font-bold">{total} EGP</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products?.map((product: CartProductType) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 relative">
                              <Image
                                src={product.product.imageCover}
                                className="rounded-lg object-cover"
                                alt={product.product.title}
                                fill
                                sizes="64px"
                              />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.product.title}</h3>
                              <p className="text-sm text-gray-500">Unit Price: {product.price} EGP</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              disabled={updatedisable}
                              onClick={() =>
                                UpdateProduct(
                                  product.product.id,
                                  String(product.count - 1),
                                  "-"
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              type="button"
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <div className="w-12 h-8 flex items-center justify-center bg-white border-y border-gray-300">
                              {product.product.id === currentId ? (
                                updateLoading ? (
                                  <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <span className="text-sm font-medium">{product.count}</span>
                                )
                              ) : (
                                <span className="text-sm font-medium">{product.count}</span>
                              )}
                            </div>
                            <button
                              disabled={updatedisable}
                              onClick={() =>
                                UpdateProduct(
                                  product.product.id,
                                  String(product.count + 1),
                                  "+"
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              type="button"
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-gray-900">{product.price * product.count} EGP</p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            disabled={removeDisable}
                            onClick={() =>
                              RemoveFromCart(product.product.id, product.count)
                            }
                            className="flex items-center text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                  <p className="text-sm text-gray-500">{products.length} items in cart</p>
                </div>
                <p className="text-2xl font-bold text-teal-600">{total} EGP</p>
              </div>
              
              <Link href={`/checkout/${cartId}`}>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any products to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}