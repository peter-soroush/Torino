// مسیر: src/app/api/auth/signout/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  // ۱. گرفتن ابزار کوکی
  const cookieStore = await cookies();

  // ۲. پاک کردن توکن (دقت کنید نام کوکی با چیزی که ذخیره کردید یکی باشد)
  cookieStore.delete("accessToken");

  // ۳. پرتاب کردن کاربر به صفحه اصلی
  return NextResponse.redirect(new URL("/", request.url));
}
