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
import { showSuccessToast, showErrorToast } from "@/utils/toast";
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
        showSuccessToast("You're In! Welcome back! Let's go shopping!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        showErrorToast(`Oops, Try Again! ${res?.error || "Invalid email or password."}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : "An unexpected error occurred.";
      showErrorToast(`Oops, Try Again! ${errorMessage}`, {
        action: {
          label: "Try Again",
          onClick: () => form.reset(),
        },
      });
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