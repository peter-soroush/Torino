"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addToBasket(tourId) {
  // ۱. باز کردن صندوقچه کوکی‌ها در امن‌ترین لایه‌ی سرور
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // ۲. بررسی لاگین بودن کاربر
  if (!token) {
    return {
      success: false,
      status: 401,
      message: "برای رزرو تور، ابتدا باید وارد حساب کاربری خود شوید.",
    };
  }

  try {
    // ۳. ارسال درخواست به بک‌اندِ اصلی (همراه با توکن)
    const res = await fetch(`http://localhost:6500/basket/${tourId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 کلید طلاییِ ورود به اندپوینت‌های محافظت شده
      },
    });

    const data = await res.json().catch(() => ({})); // اگر بک‌اند دیتای خالی فرستاد، کرش نکند

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message:
          data.message || "متاسفانه مشکلی در افزودن به سبد خرید پیش آمد.",
      };
    }

    // ۴. آپدیت کردنِ کشِ صفحه‌ی سبد خرید (تا اگر کاربر رفت اونجا، دیتای جدید رو ببینه)
    revalidatePath("/cart");

    return {
      success: true,
      message: "تور با موفقیت به سبد خرید شما اضافه شد!",
    };
  } catch (error) {
    console.error("Basket Error:", error);
    return { success: false, message: "ارتباط با سرور برقرار نشد." };
  }
}
