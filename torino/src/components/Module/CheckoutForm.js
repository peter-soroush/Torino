"use client";
import React, { useState } from "react";
import { submitOrder } from "@/actions/order"; // اکشنی که در گام قبل ساختیم
import { useRouter } from "next/navigation";

export default function CheckoutForm({ basketData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // نگهداری اطلاعات مسافر
  const [formData, setFormData] = useState({
    fullName: "",
    nationalCode: "",
    birthDate: "",
    gender: "",
  });

  const handleSubmitOrder = async () => {
    // اعتبارسنجی ساده
    if (!formData.fullName || !formData.nationalCode) {
      alert("لطفا نام و کد ملی را وارد کنید.");
      return;
    }

    setIsLoading(true);
    // ارسال دیتا به سرور اکشن
    const response = await submitOrder(formData);

    if (response.success) {
      alert("خرید شما نهایی شد!");
      // انتقال به صفحه پروفایل یا تاییده خرید
      router.push("/profile");
    } else {
      alert(response.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* اینپوت‌های مسافر */}
      <div className="flex flex-col lg:grid grid-cols-3 gap-5 px-5 py-5">
        <input
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="نام و نام خانوادگی"
        />
        <input
          value={formData.nationalCode}
          onChange={(e) =>
            setFormData({ ...formData, nationalCode: e.target.value })
          }
          className="border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="کد ملی"
        />
        {/* سایر اینپوت‌ها... */}
      </div>

      {/* دکمه ثبت نهایی (این را جایگزین دکمه قبلی کنید) */}
      <div className="px-5 pb-5">
        <button
          onClick={handleSubmitOrder}
          disabled={isLoading}
          className="cursor-pointer text-xl w-full py-3 mt-8 bg-[#28a745] text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? "در حال ثبت..." : "ثبت و خرید نهایی"}
        </button>
      </div>
    </>
  );
}
