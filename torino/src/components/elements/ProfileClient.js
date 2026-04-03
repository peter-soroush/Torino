"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toPersianNumbers } from "../utils/functions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfileClient({ userData, token }) {
  const router = useRouter();

  // استیت‌های مدیریت مودال
  const [editingSection, setEditingSection] = useState(null); // 'email' | 'personal' | 'bank'
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (section) => {
    setEditingSection(section);

    if (section === "email") {
      setFormData({ email: userData.email || "" });
    } else if (section === "personal") {
      setFormData({
        firstName: userData.firstName || "",
        nationalCode: userData.nationalCode || "",
        birthDate: userData.birthDate || "",
        // افزودن جنسیت با مقدار پیش‌فرض
        gender: userData.gender || "male",
      });
    } else if (section === "bank") {
      setFormData({
        shaba: userData.shaba || "",
        cardNumber: userData.cardNumber || "",
        accountNumber: userData.accountNumber || "",
      });
    }
  };

  // مدیریت تغییرات اینپوت‌ها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ارسال درخواست PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`http://localhost:6500/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("خطا در بروزرسانی اطلاعات");

      toast.success("اطلاعات با موفقیت ذخیره شد");
      setEditingSection(null);
      router.refresh(); // رفرش کردن صفحه برای دریافت دیتای جدید از سرور
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative">
      {/* -------------------- بدنه اصلی پروفایل -------------------- */}
      <div className="flex flex-col gap-5 w-full">
        {/* باکس شماره تماس و ایمیل */}
        <div className="w-full border-2 border-gray-300 rounded-lg py-3 space-y-5">
          <div className="px-5 text-lg">اطلاعات حساب کاربری</div>
          <div className="flex flex-col lg:flex-row justify-between px-5">
            <div className="flex flex-row justify-between lg:px-5 gap-5 items-center">
              <div className="text-sm ">شماره موبایل</div>
              <div className="font-semibold">
                {toPersianNumbers(userData.mobile)}
              </div>
            </div>
            <div className="flex flex-row justify-between lg:px-5 gap-5 lg:gap-20 items-center">
              <div className="flex flex-row gap-5">
                <div className="text-sm">ایمیل</div>
                <div>{userData.email || " - "}</div>
              </div>
              <div
                onClick={() => openModal("email")}
                className="flex flex-row items-center justify-between gap-2 text-sky-400 cursor-pointer hover:text-sky-600"
              >
                <CiEdit />
                <div className="text-sm">
                  {userData.email ? "ویرایش" : "افزودن"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* باکس اطلاعات شخصی */}
        <div className="flex flex-col border-2 border-gray-300 rounded-lg py-3 space-y-5 px-5">
          <div className="flex flex-row justify-between">
            <div>اطلاعات شخصی</div>
            <div
              onClick={() => openModal("personal")}
              className="flex flex-row items-center gap-3 text-sm text-sky-400 cursor-pointer hover:text-sky-600"
            >
              <CiEdit />
              <div>ویرایش اطلاعات</div>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 space-y-5 lg:space-y-0 lg:gap-y-5">
            <div className="flex flex-row justify-between lg:justify-start gap-20">
              <div className="text-sm">نام و نام خانوادگی</div>
              <div>{userData.firstName || " "}</div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-5">
              <div className="text-sm">کد ملی</div>
              <div>
                {userData.nationalCode
                  ? toPersianNumbers(userData.nationalCode)
                  : " - "}
              </div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-35">
              <div className="text-sm">جنسیت</div>
              {/* ترجمه داینامیک مقادیر بک‌اند به فارسی */}
              <div>
                {userData.gender === "female"
                  ? "زن"
                  : userData.gender === "male"
                    ? "مرد"
                    : userData.gender || " - "}
              </div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-5">
              <div className="text-sm">تاریخ تولد</div>
              <div>
                {userData.birthDate
                  ? toPersianNumbers(userData.birthDate)
                  : " - "}
              </div>
            </div>
          </div>
        </div>

        {/* باکس اطلاعات مالی */}
        <div className="flex flex-col border-2 border-gray-300 rounded-lg py-3 space-y-5 px-5">
          <div className="flex flex-row justify-between">
            <div>اطلاعات مالی</div>
            <div
              onClick={() => openModal("bank")}
              className="flex flex-row items-center gap-3 text-sm text-sky-400 cursor-pointer hover:text-sky-600"
            >
              <CiEdit />
              <div>ویرایش اطلاعات</div>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 space-y-5 lg:space-y-0 lg:gap-y-5">
            <div className="flex flex-row justify-between lg:justify-start gap-20">
              <div className="text-sm">شماره شبا</div>
              <div>{userData.shaba || "-"}</div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-5">
              <div className="text-sm">شماره کارت</div>
              <div>{toPersianNumbers(userData.cardNumber || "-")}</div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-16">
              <div className="text-sm">شماره حساب</div>
              <div>{toPersianNumbers(userData.accountNumber || "-")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- مودال ویرایش پویا -------------------- */}
      {editingSection && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="font-bold text-lg mb-6 border-b pb-2">
              {editingSection === "email" && "ویرایش ایمیل"}
              {editingSection === "personal" && "ویرایش اطلاعات شخصی"}
              {editingSection === "bank" && "ویرایش اطلاعات مالی"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* فرم ایمیل */}
              {editingSection === "email" && (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="ایمیل خود را وارد کنید"
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500 text-left"
                  dir="ltr"
                />
              )}

              {/* فرم اطلاعات شخصی */}
              {/* فرم اطلاعات شخصی */}
              {editingSection === "personal" && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    placeholder="نام و نام خانوادگی"
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    name="nationalCode"
                    value={formData.nationalCode || ""}
                    onChange={handleChange}
                    placeholder="کد ملی"
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate || ""}
                    onChange={handleChange}
                    placeholder="تاریخ تولد (مثال: ۱۳۷۰/۰۱/۰۱)"
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500 text-left"
                    dir="ltr"
                  />

                  {/* لیست کشویی برای جنسیت */}
                  <select
                    name="gender"
                    value={formData.gender || "male"}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500 bg-white cursor-pointer"
                  >
                    {/* اگر بک‌اند شما کلمات فارسی می‌گیرد، value ها را به "مرد" و "زن" تغییر دهید */}
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                </>
              )}

              {/* فرم اطلاعات بانکی */}
              {editingSection === "bank" && (
                <>
                  <input
                    type="text"
                    name="shaba"
                    value={formData.shaba || ""}
                    onChange={handleChange}
                    placeholder="شماره شبا (بدون IR)"
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber || ""}
                    onChange={handleChange}
                    placeholder="شماره کارت ۱۶ رقمی"
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber || ""}
                    onChange={handleChange}
                    placeholder="شماره حساب"
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-sky-500"
                  />
                </>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-brandcolor text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? "در حال ثبت..." : "تایید و ذخیره"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
