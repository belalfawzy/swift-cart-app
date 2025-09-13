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
import { loginSchema, LoginSchemaType } from "@/schema/loginschema.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginSchemaType) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success(
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-check-circle text-teal-600 text-2xl animate-pulse"></i>
            <div>
              <strong className="text-base">You&apos;re In!</strong>
              <p className="text-sm">Welcome back! Let&apos;s go shopping!</p>
            </div>
          </div>,
          {
            position: "top-center",
            duration: 6000,
            style: {
              background: "var(--success-bg)", /* teal-300 to teal-400 */
              color: "#1f2937", /* gray-800 */
              border: "1px solid var(--success-border)", /* teal-200 */
              borderRadius: "12px",
              boxShadow: "0 6px 16px rgba(20, 184, 166, 0.3)",
              fontSize: "16px",
              padding: "16px",
            },
            className: "hover:scale-105 transition-transform duration-200",
            actionButtonStyle: {
              background: "var(--success-action-bg) !important", /* teal-500 */
              color: "white !important",
              borderRadius: "8px !important",
              padding: "6px 12px !important",
              fontSize: "14px !important",
            },
          }
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error(
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-exclamation-circle text-red-600 text-2xl animate-pulse"></i>
            <div>
              <strong className="text-base">Oops, Try Again!</strong>
              <p className="text-sm">{res?.error || "Invalid email or password."}</p>
            </div>
          </div>,
          {
            position: "top-center",
            duration: 6000,
            style: {
              background: "var(--error-bg)", /* red-300 to red-400 */
              color: "#1f2937", /* gray-800 */
              border: "1px solid var(--error-border)", /* red-200 */
              borderRadius: "12px",
              boxShadow: "0 6px 16px rgba(239, 68, 68, 0.3)",
              fontSize: "16px",
              padding: "16px",
            },
            className: "hover:scale-105 transition-transform duration-200",
          }
        );
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : "An unexpected error occurred.";
      toast.error(
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-exclamation-circle text-red-600 text-2xl animate-pulse"></i>
          <div>
            <strong className="text-base">Oops, Try Again!</strong>
            <p className="text-sm">{errorMessage}</p>
          </div>
        </div>,
        {
          position: "top-center",
          duration: 6000,
          closeButton: true,
          action: {
            label: "Try Again",
            onClick: () => form.reset(),
          },
          style: {
            background: "var(--error-bg)", /* red-300 to red-400 */
            color: "#1f2937", /* gray-800 */
            border: "1px solid var(--error-border)", /* red-200 */
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(239, 68, 68, 0.3)",
            fontSize: "16px",
            padding: "16px",
          },
          className: "hover:scale-105 transition-transform duration-200",
          actionButtonStyle: {
            background: "var(--error-action-bg) !important", /* red-500 */
            color: "white !important",
            borderRadius: "8px !important",
            padding: "6px 12px !important",
            fontSize: "14px !important",
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-12 px-4">
      <Card className="bg-white border-gray-200 shadow-lg rounded-xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Sign In
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue shopping
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-10 rounded-lg bg-gray-50 transition-all duration-300"
                          aria-describedby="email-error"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="email-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-10 rounded-lg bg-gray-50 transition-all duration-300"
                          aria-describedby="password-error"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage id="password-error" />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center text-sm">
                <Link
                  href="/forgot-password"
                  className="text-teal-600 hover:text-teal-700 transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
                <Link
                  href="/register"
                  className="text-teal-600 hover:text-teal-700 transition-colors duration-200"
                >
                  Create an Account
                </Link>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-lg hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging In...</span>
                  </div>
                ) : (
                  <>
                    <i className="fa-solid fa-right-to-bracket mr-2"></i>
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}