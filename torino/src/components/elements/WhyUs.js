"use client";
import React, { useState } from "react";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { BsQuestionOctagonFill, BsQuestionCircleFill } from "react-icons/bs";
import { toPersianNumbers } from "../utils/functions";

// آرایه تصاویر تستی
const images = [
  "/images/img1.png",
  "/images/img2.png",
  "/images/img3.png",
  "/images/img4.png",
];

// تابع کمکی برای فارسی کردن اعداد

function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <>
      {/* تعریف گرادیانت برای آیکون‌های سوال */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="custom-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#28A745" offset="0%" />
            <stop stopColor="#10411B" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <section className="container mx-auto max-w-full px-10 md:px-31 mt-16 font-sans">
        <div className="flex flex-col md:flex-row md:w-full lg:gap-40 gap-5 ">
          <div className="w-full md:w-1/2 space-y-10">
            <div className="text-3xl md:text-4xl font-extrabold flex items-center gap-4">
              <BsQuestionOctagonFill
                className="max-md:flex md:hidden"
                size={30}
                style={{
                  fill: "url(#custom-gradient)",
                  transform: "scaleX(-1)",
                }}
              />
              <BsQuestionCircleFill
                className="max-md:hidden md:flex"
                size={30}
                style={{
                  fill: "url(#custom-gradient)",
                  transform: "scaleX(-1)",
                }}
              />
              <h3>
                چرا <span className="text-brandcolor">تورینو </span>؟
              </h3>
            </div>

            <div className="max-md:hidden md:flex flex-col text-justify leading-loose mt-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                تور طبیعت گردی و تاریخی
              </h2>
              <p className="text-gray-600 text-xl leading-12 ">
                اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در
                دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید
                تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های
                گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای
                فرهنگی و تاریخی را خریداری کنید.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0 gap-8">
            <div className="relative w-full md:w-[350px] h-[280px] md:h-[380px] flex justify-center items-center">
              {images.map((img, index) => {
                const offset =
                  (index - activeIndex + images.length) % images.length;
                let transformClasses = "";

                if (offset === 0) {
                  transformClasses = "z-40 scale-100 translate-x-0 shadow-2xl";
                } else if (offset === 1) {
                  transformClasses =
                    "z-30 scale-[0.85] -translate-x-12 lg:-translate-x-18 shadow-xl";
                } else if (offset === 2) {
                  transformClasses =
                    "z-20 scale-[0.70] -translate-x-24 lg:-translate-x-34 shadow-md";
                } else if (offset === 3) {
                  transformClasses =
                    "z-10 scale-[0.55] -translate-x-36 lg:-translate-x-50 md:opacity-100";
                }

                return (
                  <div
                    key={index}
                    className={`absolute right-4 md:right-18 lg:-right-24 md:h-80 md:w-[250px] lg:mt-20 w-[220px] lg:w-[389px] h-full lg:h-120 transition-all duration-700 ease-in-out rounded-[2rem] overflow-hidden cursor-pointer ${transformClasses}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <Image
                      src={img}
                      alt={`Torino Feature ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 220px, 280px"
                      className="object-cover"
                      loading="eager"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center text-gray-500 gap-4 mt-4 md:mt-8 md:mt-20 ">
              <button
                onClick={prevSlide}
                className="p-2 hover:text-brandcolor transition-colors"
              >
                <HiOutlineArrowRight size={22} className="text-gray-400" />
              </button>

              <span className="font-medium text-lg text-gray-700" dir="ltr">
                {toPersianNumbers(activeIndex + 1)} /{" "}
                {toPersianNumbers(images.length)}
              </span>

              <button
                onClick={nextSlide}
                className="p-2 hover:text-brandcolor transition-colors"
              >
                <HiOutlineArrowLeft size={22} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-full mx-auto px-10 md:px-31 mt-16 py-8 font-sans border-t-gray-200 border-t-1 pt-5">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-row justify-start md:justify-center  items-center gap-4">
            <div>
              <Image
                src="/images/item1.png"
                alt=""
                width={100}
                height={100}
                className="w-[64px] h-[64px] md:w-[99.12px] md:h-auto"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-2xl font-bold">
                {" "}
                بصرفه ترین قیمت
              </h3>
              <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
            </div>
          </div>
          <div className="flex flex-row justify-start md:justify-center items-center gap-4">
            <div>
              <Image
                src="/images/item2.png"
                alt=""
                width={99.12}
                height={99.12}
                className="w-[64px] h-[64px] md:w-[99.12px] md:h-auto"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-2xl font-bold"> پشتیبانی</h3>
              <p>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</p>
            </div>
          </div>
          <div className="flex flex-row justify-start md:justify-center  items-center gap-4">
            <div>
              <Image
                src="/images/item3.png"
                alt=""
                width={99.12}
                height={99.12}
                className="w-[64px] h-[64px] md:w-[99.12px] md:h-auto"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-2xl font-bold">رضایت کاربران</h3>
              <p> رضایت بیش از 10هزار کاربر از تور های ما. </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyUs;
