"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  try {
    const encriptedToken =
      (await cookies()).get(`next-auth.session-token`)?.value ||
      (await cookies()).get(`__Secure-next-auth.session-token`)?.value;

    if (!encriptedToken) {
      return null;
    }

    const accessToken = await decode({
      token: encriptedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });


    return accessToken?.token;
  } catch (err : unknown) {
    return null;
  }
}