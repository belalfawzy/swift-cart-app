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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema, ChangePasswordSchemaType } from "@/schema/forgotPassword.schema";
import changePasswordAction from "@/PasswordActions/changePassword.action";
import { signOut } from "next-auth/react";

// No need for UserData interface since we'll use session data

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordForm = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  const handleChangePassword = async (values: ChangePasswordSchemaType) => {
    setIsChangingPassword(true);
    try {
      const res = await changePasswordAction(values.currentPassword, values.password, values.rePassword);
      console.log("Password change response:", res);
      
      // Check for success in different possible response formats
      if (res.status === "success" || res.message === "success" || res.data?.message === "success") {
        showSuccessToast("Password changed successfully! Redirecting to login...");
        // Reset form with empty values
        passwordForm.reset({
          currentPassword: "",
          password: "",
          rePassword: "",
        });
        // Reset password visibility states
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        // Clear any form errors
        passwordForm.clearErrors();
        // Exit edit mode
        setIsEditingPassword(false);
        // Automatic logout and redirect after password change
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 2000);
      } else {
        const errorMessage = res.message || res.data?.message || "Failed to change password";
        showErrorToast(errorMessage);
      }
    } catch (error) {
      console.error("Password change error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to change password";
      showErrorToast(errorMessage);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCancelPasswordEdit = () => {
    passwordForm.reset({
      currentPassword: "",
      password: "",
      rePassword: "",
    });
    setIsEditingPassword(false);
    // Reset password visibility states
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    // Clear any form errors
    passwordForm.clearErrors();
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Profile...</h2>
            <p className="text-gray-600">Please wait while we load your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-lock text-6xl text-gray-300"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You need to be signed in to view your profile.
            </p>
            <a
              href="/login"
              className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">View your account information and manage your password.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-teal-600">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {session?.user?.name || "User"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {session?.user?.email || "user@example.com"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Role</span>
                    <span className="text-sm font-medium text-gray-800 capitalize">
                      {session?.user?.role || "User"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">User ID</span>
                    <span className="text-sm font-medium text-gray-800 font-mono">
                      {session?.user?.id ? session.user.id.slice(-8) : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      <i className="fa-solid fa-circle text-xs mr-2"></i>
                      Active
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Account Security</p>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center text-green-600">
                          <i className="fa-solid fa-shield-check text-sm mr-1"></i>
                          <span className="text-xs">Secure</span>
                        </div>
                        <div className="flex items-center text-blue-600">
                          <i className="fa-solid fa-key text-sm mr-1"></i>
                          <span className="text-xs">Password</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Password Settings */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Password Settings</h3>
                  <p className="text-sm text-gray-600 mt-1">Change your account password</p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Password Header with Edit Button */}
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {isEditingPassword ? "Enter your current password and new password" : "Update your account password for better security"}
                      </p>
                    </div>
                    {!isEditingPassword ? (
                      <Button
                        onClick={() => setIsEditingPassword(true)}
                        variant="outline"
                        disabled={isChangingPassword}
                        className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:border-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="fa-solid fa-edit mr-2"></i>
                        Edit Password
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleCancelPasswordEdit}
                          variant="outline"
                          disabled={isChangingPassword}
                          className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fa-solid fa-times mr-2"></i>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Current Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showCurrentPassword ? "text" : "password"}
                                  placeholder={isEditingPassword ? "Enter your current password" : "Click Edit Password to change"}
                                  disabled={!isEditingPassword || isChangingPassword}
                                  className={`h-12 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12 ${
                                    !isEditingPassword ? 'bg-gray-50 text-gray-500' : ''
                                  }`}
                                  {...field}
                                />
                                {isEditingPassword && (
                                  <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    disabled={isChangingPassword}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <i className={`fa-solid ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
                                  </button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showNewPassword ? "text" : "password"}
                                  placeholder={isEditingPassword ? "Enter new password" : "Click Edit Password to change"}
                                  disabled={!isEditingPassword || isChangingPassword}
                                  className={`h-12 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12 ${
                                    !isEditingPassword ? 'bg-gray-50 text-gray-500' : ''
                                  }`}
                                  {...field}
                                />
                                {isEditingPassword && (
                                  <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    disabled={isChangingPassword}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <i className={`fa-solid ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
                                  </button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="rePassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Confirm New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder={isEditingPassword ? "Confirm new password" : "Click Edit Password to change"}
                                  disabled={!isEditingPassword || isChangingPassword}
                                  className={`h-12 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12 ${
                                    !isEditingPassword ? 'bg-gray-50 text-gray-500' : ''
                                  }`}
                                  {...field}
                                />
                                {isEditingPassword && (
                                  <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={isChangingPassword}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
                                  </button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {isEditingPassword && (
                        <div className="pt-4 border-t border-gray-200">
                          <Button
                            type="submit"
                            disabled={isChangingPassword}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            {isChangingPassword ? (
                              <>
                                <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Updating Password...
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-key mr-2"></i>
                                Update Password
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
