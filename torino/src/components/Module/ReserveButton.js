"use client";
import React, { useState } from "react";
import { addToBasket } from "@/actions/basket";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function ReserveButton({ tourId }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReserve = async () => {
    setIsLoading(true);

    try {
      const response = await addToBasket(tourId);

      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/basket/${tourId}`);
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("یک خطای غیرمنتظره رخ داد.");
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
