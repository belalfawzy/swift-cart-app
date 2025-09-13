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
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "@/schema/registerschema.schema";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // Inside handleRegister function in Register component
async function handleRegister(values: RegisterSchemaType) {
  setIsLoading(true);
  try {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      values
    );
    if (res.data.message === "success") {
      toast.success(
        <div className="flex items-center gap-3">
          <div>
            <strong className="text-base font-semibold">Account Created!</strong>
            <p className="text-sm">Welcome! Redirecting to login...</p>
          </div>
        </div>,
        {
          position: "top-center",
          duration: 5000,
        }
      );
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof AxiosError
        ? err.response?.data.message || "Failed to register. Please try again."
        : "An unexpected error occurred.";
    toast.error(
      <div className="flex items-center gap-3">
        <i className="fa-solid fa-exclamation-circle text-red-600 text-2xl animate-pulse"></i>
        <div>
          <strong className="text-base">Registration Failed</strong>
          <p className="text-sm">{errorMessage}</p>
        </div>
      </div>,
      {
        position: "top-center",
        duration: 5000,
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
            Create Your Account
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            Join us to start shopping
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <Input
                          placeholder="Enter your full name"
                          className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-10 rounded-lg bg-gray-50 transition-all duration-300"
                          aria-describedby="name-error"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="name-error" />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <Input
                          type={showRePassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-10 rounded-lg bg-gray-50 transition-all duration-300"
                          aria-describedby="rePassword-error"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRePassword(!showRePassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
                          aria-label={showRePassword ? "Hide confirm password" : "Show confirm password"}
                        >
                          <i className={`fa-solid ${showRePassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage id="rePassword-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-400 h-10 rounded-lg bg-gray-50 transition-all duration-300"
                          aria-describedby="phone-error"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="phone-error" />
                  </FormItem>
                )}
              />
              <div className="flex justify-center text-sm">
                <Link
                  href="/login"
                  className="text-teal-600 hover:text-teal-700 transition-colors duration-200"
                >
                  Already have an account? Sign In
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
                    <span>Registering...</span>
                  </div>
                ) : (
                  <>
                    <i className="fa-solid fa-user-plus mr-2"></i>
                    Register Now
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