"use server";
import getMyToken from "@/utilities/myToken";

// Forgot Password
export async function forgotPassword(email: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const payload = await res.json();
  return payload;
}

// Verify Reset Code
export async function verifyResetCode(resetCode: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resetCode }),
  });

  const payload = await res.json();
  return payload;
}

// Reset Password
export async function resetPassword(email: string, newPassword: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });

  const payload = await res.json();
  return payload;
}

// Change Password (for logged in users)
export async function changePassword(currentPassword: string, password: string, rePassword: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please Login First");

  console.log("API call - Token:", token ? "Token exists" : "No token");
  console.log("API call - Request body:", { currentPassword: "***", password: "***", rePassword: "***" });

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, password, rePassword }),
  });

  console.log("API response status:", res.status);
  console.log("API response headers:", Object.fromEntries(res.headers.entries()));

  const payload = await res.json();
  console.log("API response payload:", payload);
  
  if (!res.ok) {
    throw new Error(payload.message || `HTTP error! status: ${res.status}`);
  }
  
  return payload;
}

// Update User Data
export async function updateUserData(name: string, email: string, phone: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please Login First");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone }),
  });

  const payload = await res.json();
  return payload;
}

// Get User Data
export async function getUserData() {
  const token = await getMyToken();
  if (!token) throw new Error("Please Login First");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/getMe`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
