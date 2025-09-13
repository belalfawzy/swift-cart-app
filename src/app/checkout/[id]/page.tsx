"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import OnlineCheckout from "@/checkoutActions/checkout.action";

export default function Checkout() {
  const { id }: { id: string } = useParams();
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'cash'>('visa');

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
    if (paymentMethod === 'cash') {
      // معالجة الدفع النقدي (مؤقتًا)
      toast.success(
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div>
            <strong className="text-base font-semibold">Cash Payment Selected!</strong>
            <p className="text-sm">Your order has been placed successfully.</p>
          </div>
        </div>,
        {
          position: "top-center",
          duration: 5000,
        }
      );
      return;
    }

    try {
      const res = await OnlineCheckout(id, "", values);

      if (res.status === "success") {
        toast.success(
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <strong className="text-base font-semibold">Checkout Successful!</strong>
              <p className="text-sm">Redirecting to payment...</p>
            </div>
          </div>,
          {
            position: "top-center",
            duration: 5000,
            action: {
              label: "Proceed to Payment",
              onClick: () => window.location.href = res.session.url,
            },
          }
        );
        setTimeout(() => {
          window.location.href = res.session.url;
        }, 1000);
      } else {
        throw new Error(res.error || "Checkout failed. Please try again.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during checkout.";
      toast.error(
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <strong className="text-base font-semibold">Checkout Failed</strong>
            <p className="text-sm">{errorMessage}</p>
          </div>
        </div>,
        {
          position: "top-center",
          duration: 5000,
          action: {
            label: "Try Again",
            onClick: () => form.reset(),
          },
        }
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-center">
          <h1 className="font-bold text-3xl text-white">Checkout Now</h1>
          <p className="text-teal-100 mt-2">Complete your purchase securely</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('visa')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                  paymentMethod === 'visa' 
                    ? 'border-teal-500 bg-teal-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                </div>
                <span className={`font-medium ${
                  paymentMethod === 'visa' ? 'text-teal-600' : 'text-gray-600'
                }`}>Credit Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                  paymentMethod === 'cash' 
                    ? 'border-teal-500 bg-teal-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-1h16v1c0 .55-.45 1-1 1zm1-5H4V6h16v7z"/>
                    <circle cx="8.5" cy="13.5" r="1.5"/>
                  </svg>
                </div>
                <span className={`font-medium ${
                  paymentMethod === 'cash' ? 'text-teal-600' : 'text-gray-600'
                }`}>Cash</span>
              </button>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-6">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Shipping Details</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <Input
                          type="text"
                          placeholder="Enter your complete address"
                          className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-12 rounded-xl bg-gray-50 transition-all duration-300"
                          aria-describedby="details-error"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="details-error" className="text-red-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-12 rounded-xl bg-gray-50 transition-all duration-300"
                          aria-describedby="phone-error"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="phone-error" className="text-red-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">City</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <Input
                          type="text"
                          placeholder="Enter your city"
                          className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-12 rounded-xl bg-gray-50 transition-all duration-300"
                          aria-describedby="city-error"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="city-error" className="text-red-500" />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:from-teal-600 hover:to-teal-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 shadow-md shadow-teal-200"
              >
                {paymentMethod === 'visa' ? (
                  <>
                    <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                    Pay Now
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-1h16v1c0 .55-.45 1-1 1zm1-5H4V6h16v7z"/>
                      <circle cx="8.5" cy="13.5" r="1.5"/>
                    </svg>
                    Confirm Cash Payment
                  </>
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1 inline text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
              Your information is securely encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}