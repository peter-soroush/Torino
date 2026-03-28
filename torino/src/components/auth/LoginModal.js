// src/components/auth/LoginModal.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import OtpInput from "../elements/OtpInput";

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone");
  const [Number, setNumber] = useState("");

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setStep("phone"), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendOtp = () => {
    if (!Number) {
      alert("لطفا شماره موبایل خود را وارد کنید.");
      return;
    }

    if (Number.length !== 11 || !Number.startsWith("09")) {
      alert("شماره موبایل باید ۱۱ رقم باشد و با 09 شروع شود.");
      return;
    }

    console.log("درخواست پیامک برای شماره:", Number);
    setStep("otp");
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
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          <DialogTitle className="text-center text-2xl font-semibold text-gray-800 mb-6">
            {step === "phone" ? "ورود به تورینو" : "کد تایید را وارد کنید."}
          </DialogTitle>

          <div className="flex flex-col gap-4">
            {step === "phone" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 text-right">
                  شماره موبایل خود را وارد کنید
                </label>
                <input
                  type="tel"
                  placeholder="۰۹۱۲***۳۴۵۶"
                  className="w-full border border-gray-300 rounded-lg p-3 text-left focus:ring-2 focus:ring-green-500 outline-none placeholder:text-right"
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setNumber(val);
                  }}
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors mt-2"
                >
                  ارسال کد تایید
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="flex flex-col gap-2 animate-in fade-in zoom-in duration-300">
                <p className="text-sm text-gray-600 text-center mb-4">
                  کد تایید به شماره {Number} ارسال شد.
                </p>
                <OtpInput />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    ورود به تورینو
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
