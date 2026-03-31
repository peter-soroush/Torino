import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { loginUser } from "@/actions/auth"; // اکشنی که در مرحله قبل ساختیم
import OtpInput from "../elements/OtpInput";

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone");
  const [mobile, setMobile] = useState(""); // تغییر نام Number به mobile
  const [otpCode, setOtpCode] = useState(""); // ذخیره کد تایپ شده

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ریست کردن مودال وقتی بسته می‌شود
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("phone");
        setMobile("");
        setOtpCode("");
        setError("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // مرحله ۱: ارسال شماره موبایل به سرور
  const handleSendOtp = async () => {
    setError("");

    if (!mobile || mobile.length !== 11 || !mobile.startsWith("09")) {
      setError("شماره موبایل باید ۱۱ رقم باشد و با 09 شروع شود.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:6500/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("کد تایید بک‌اند (برای تست):", data.code);
        setStep("otp");
      } else {
        setError(data.message || "خطا در ارسال پیامک");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد");
    } finally {
      setIsLoading(false);
    }
  };

  // مرحله ۲: چک کردن کد و لاگین نهایی
  const handleVerifyOtp = async () => {
    setError("");

    if (otpCode.length < 6) {
      setError("لطفاً کد تایید ۶ رقمی را کامل وارد کنید.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:6500/auth/check-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, code: otpCode }),
      });

      const data = await res.json();

      if (res.ok) {
        // ذخیره توکن‌ها در کوکی سرور
        await loginUser(data);
        onClose(); // بستن موفقیت‌آمیز مودال
      } else {
        setError(data.message || "کد وارد شده فاقد اعتبار است!");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 font-sans"
      dir="rtl"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 w-screen flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl relative transition-all">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-800 transition-colors"
          >
            ✕
          </button>

          <DialogTitle className="text-center text-2xl font-semibold text-gray-800 mb-6">
            {step === "phone" ? "ورود به تورینو" : "کد تایید را وارد کنید"}
          </DialogTitle>

          {/* نمایش ارورهای API */}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {step === "phone" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 text-right">
                  شماره موبایل خود را وارد کنید
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  value={mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setMobile(val);
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 text-left focus:ring-2 focus:ring-green-500 outline-none placeholder:text-right"
                />
                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 rounded-lg transition-colors mt-2"
                >
                  {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="flex flex-col gap-2 animate-in fade-in zoom-in duration-300">
                <p className="text-sm text-gray-600 text-center mb-4">
                  کد تایید به شماره{" "}
                  <span dir="ltr" className="font-bold">
                    {mobile}
                  </span>{" "}
                  ارسال شد.
                </p>

                {/* دریافت کد وارد شده از کامپوننت فرزند */}
                <OtpInput onChange={(code) => setOtpCode(code)} />

                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    {isLoading ? "در حال بررسی..." : "ورود به تورینو"}
                  </button>
                  <button
                    onClick={() => setStep("phone")}
                    className="text-sm text-gray-500 mt-2 hover:text-gray-800"
                  >
                    ویرایش شماره موبایل
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
