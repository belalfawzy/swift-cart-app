"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { verifyResetCodeSchema, VerifyResetCodeSchemaType } from "@/schema/forgotPassword.schema";

export default function VerifyResetCodePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyResetCodeSchemaType>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function handleVerifyCode(values: VerifyResetCodeSchemaType) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );

      if (res.data.status === "success") {
        setIsVerified(true);
        showSuccessToast("Code verified successfully! You can now reset your password.");
        // Store the reset code in localStorage for the next step
        localStorage.setItem("resetCode", values.resetCode);
        setTimeout(() => {
          router.push("/reset-password");
        }, 2000);
      } else {
        showErrorToast("Invalid reset code. Please try again.");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      showErrorToast(`Verification failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white border-gray-200 shadow-xl rounded-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-check text-green-600 text-2xl"></i>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Code Verified!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Redirecting you to reset your password...
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-4 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-600">Please wait...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white border-gray-200 shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-shield-check text-blue-600 text-2xl"></i>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Verify Reset Code
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter the 6-digit code we sent to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVerifyCode)} className="space-y-6">
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Reset Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="h-12 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center text-2xl tracking-widest"
                        {...field}
                        onChange={(e) => {
                          // Only allow numbers
                          const value = e.target.value.replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check mr-2"></i>
                    Verify Code
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?{" "}
              <Link
                href="/forgot-password"
                className="text-teal-600 hover:text-teal-700 font-medium underline"
              >
                Resend
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

