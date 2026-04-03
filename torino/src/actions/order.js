"use server";
import { cookies } from "next/headers";

export async function submitOrder(passengerData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, message: "لطفا وارد حساب کاربری شوید." };

  try {
    const res = await fetch("http://localhost:6500/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // دیتای فرم مسافر که از کلاینت می‌آید را به بک‌اند می‌فرستیم
      body: JSON.stringify(passengerData),
    });

    if (res.status === 401 || res.status === 403) {
      // پرتاب به روت خروج تا کوکی پاک شود و به صفحه اصلی برود
      redirect("/api/auth/signout");
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data.message || "خطا در ثبت سفارش" };
    }

    return { success: true, message: "سفارش شما با موفقیت ثبت شد!" };
  } catch (error) {
    return { success: false, message: "ارتباط با سرور برقرار نشد." };
  }
}
