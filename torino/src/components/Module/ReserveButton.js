"use client";
import React, { useState } from "react";
import { addToBasket } from "@/actions/basket";
import { useRouter } from "next/navigation";

export default function ReserveButton({ tourId }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReserve = async () => {
    setIsLoading(true);

    try {
      const response = await addToBasket(tourId);

      if (response.success) {
        alert(response.message);
        // 🔥 انتقال کاربر بعد از موفقیت‌آمیز بودن درخواست PUT
        router.push(`/basket/${tourId}`);
      } else {
        alert(response.message);
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
