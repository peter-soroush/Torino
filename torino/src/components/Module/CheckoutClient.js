"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { submitOrder } from "@/actions/order";
import { getDurationDays } from "@/components/utils/functions";
import { RiCalendarLine, RiUser3Fill } from "react-icons/ri";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { toast } from "react-toastify";

export default function CheckoutClient({ basketData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    nationalCode: "",
    gender: "",
  });

  const [birthDate, setBirthDate] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.nationalCode) {
      toast.warning("لطفا نام و کد ملی را وارد کنید.");
      return;
    }

    setIsLoading(true);

    let formattedDate = "";
    if (birthDate) {
      const jsDate = new Date(birthDate.toDate?.() || birthDate);
      formattedDate = jsDate.toISOString().split("T")[0];
    }

    const payload = {
      nationalCode: formData.nationalCode,
      fullName: formData.fullName,
      gender: formData.gender,
      birthDate: formattedDate,
    };

    const response = await submitOrder(payload);

    if (response.success) {
      toast.success(response.message);
      setTimeout(() => {
        router.push("/profile");
      }, 2500);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <section className="flex lg:flex-row flex-col font-sans px-10 lg:px-31 justify-between py-10 rounded-lg lg:mb-40 mb-10">
      <div className="flex lg:flex-col flex-col bg-white lg:w-5/7 rounded-lg border-2 border-gray-300">
        <div className="flex flex-row gap-2 px-5 py-5">
          <RiUser3Fill className="text-xl lg:flex" />
          <div className="text-2xl">مشخصات مسافر</div>
        </div>

        <div className="flex flex-col lg:grid grid-cols-3 gap-5 px-5 py-5">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="نام و نام خانوادگی"
          />
          <input
            name="nationalCode"
            value={formData.nationalCode}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="کد ملی"
          />

          <div className="relative w-full">
            {/* آیکون در سمت راست فیکس می‌شود */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
              <RiCalendarLine className="text-gray-400 text-xl" />
            </div>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={birthDate}
              onChange={setBirthDate}
              containerClassName="w-full"
              inputClass="w-full border border-gray-300 rounded-md py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="تاریخ تولد"
            />
          </div>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="جنسیت"
            required
          >
            {" "}
            <option value="" disabled hidden>
              جنسیت
            </option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>
      </div>

      {/* ----------------- فاکتور و دکمه ثبت ----------------- */}
      <div className="lg:w-2/7 bg-white lg:mx-2 rounded-b-lg py-5 px-3 mt-5 lg:mt-0 border-2 border-gray-300 rounded-lg">
        <div className="flex flex-row justify-between border-dashed border-b-2 border-gray-300 pb-0 lg:pb-4">
          <div className="text-2xl font-semibold">{basketData?.title}</div>
          <div className="text-gray-500 text-sm">
            {/* اگر بک‌اند تاریخ رفت و برگشت را فرستاده بود، اینجا محاسبه کنید */}
            محاسبه زمان
          </div>
        </div>

        <div className="flex flex-row justify-between px-3 pt-8">
          <div className="text-lg">قیمت نهایی</div>
          <div className="flex flex-row gap-1 items-center">
            <div className="text-sky-500 text-3xl font-bold">
              {basketData?.price?.toLocaleString("fa-IR") || "۰"}
            </div>
            <span className="text-sm">تومان</span>
          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="cursor-pointer text-xl w-full py-3 mt-8 bg-[#28a745] text-white px-6 rounded-md hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50"
          >
            {isLoading ? "در حال پرداخت..." : "ثبت و خرید نهایی"}
          </button>
        </div>
      </div>
    </section>
  );
}
