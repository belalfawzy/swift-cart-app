"use server";
import { changePassword } from "@/api/auth.api";

export default async function changePasswordAction(
  currentPassword: string,
  password: string,
  rePassword: string
) {
  try {
    const res = await changePassword(currentPassword, password, rePassword);
    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Unknown error occurred");
  }
}

