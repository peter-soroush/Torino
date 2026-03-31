"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function loginUser(authData) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", authData.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  cookieStore.set("refreshToken", authData.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  cookieStore.set("userData", JSON.stringify(authData.user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userData");

  revalidatePath("/");
}
