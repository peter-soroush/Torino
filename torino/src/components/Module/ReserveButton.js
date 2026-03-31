"use client";
import React, { useState } from "react";
import { addToBasket } from "@/actions/basket"; // ایمپورت اکشنِ جدید
import { useRouter } from "next/navigation";

export default function ReserveButton({ tourId }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReserve = async () => {
    setIsLoading(true);

    try {
      // صدا زدن سرور اکشن
      const response = await addToBasket(tourId);

      if (response.success) {
        // رزرو موفقیت‌آمیز بود!
        alert(response.message);
        // اختیاری: کاربر را بفرستیم به صفحه سبد خرید
        // router.push("/cart");
      } else {
        // اگر ارور 401 بود یعنی کاربر لاگین نیست
        if (response.status === 401) {
          alert(response.message);
          // 💡 اینجا می‌توانید کد باز کردن مودال لاگین را قرار دهید
        } else {
          // ارورهای دیگر بک‌اند (مثلاً ظرفیت پر شده)
          alert(response.message);
        }
      }
    } catch (error) {
      alert("یک خطای غیرمنتظره رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleReserve}
      disabled={isLoading}
      className="bg-brandcolor px-10 py-2 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isLoading ? "در حال پردازش..." : "رزرو و خرید"}
    </button>
  );
}
