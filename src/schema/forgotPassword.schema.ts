import { z } from "zod";

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// Verify Reset Code Schema
export const verifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .min(1, "Reset code is required")
    .length(6, "Reset code must be 6 digits")
    .regex(/^\d{6}$/, "Reset code must contain only numbers"),
});

export type VerifyResetCodeSchemaType = z.infer<typeof verifyResetCodeSchema>;

// Reset Password Schema
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  rePassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
});

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^01[0-9]{9}$/, "Please enter a valid Egyptian phone number"),
});

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;

