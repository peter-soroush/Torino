import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  const phoneNumber = "021-8574";
  return (
    <footer>
      <div className="max-w-full px-12 md:px-31 container flex flex-col border-t border-gray-300 pt-10 md:flex-row mx-auto font-sans justify-between  bg-gray-50">
        <div className="flex flex-row space-x-10 md:space-x-0 lg:space-x-10 space-y-5 md:space-y-0 justify-between ">
          <div className=" items-start flex flex-col gap-5">
            <h3 className="font-bold text-2xl">تورینو</h3>
            <Link href="/">درباره ما</Link>
            <Link href="/">تماس با ما</Link>
            <Link href="/"> چرا تورینو </Link>
            <Link href="/">بیمه مسافرتی</Link>
          </div>
          <div className="flex flex-col gap-5 pr-20 md:pr-10">
            <h3 className="font-bold text-2xl ">خدمات مشتریان</h3>
            <Link href="/">پشتیبانی آنلاین</Link>
            <Link href="/">راهنمای خرید</Link>
            <Link href="/"> راهنمای استرداد</Link>
            <Link href="/">پرسش و پاسخ</Link>
          </div>
        </div>
        <div
          className="flex flex-row-reverse md:flex-col md:justify-end md:items-end mt-5
         md:mt-0 space-y-3 md:space-y-12 justify-between pb-5"
        >
          <div className="flex flex-col items-end space-y-7 md:space-y-10">
            <Link href="/">
              {" "}
              <Image
                src="/images/Logo.png"
                alt="logo"
                width={146}
                height={44}
                className="w-30 md:w-[146px] h-auto cursor-pointer"
                loading="eager"
              />
            </Link>
            <div className="flex items-center text-gray-700   text-xl">
              <span>تلفن پشتیبانی : </span>
              <span dir="ltr"> ۰۲۱-۸۵۷۴ </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-center gap-4 md:gap-2 lg:gap-8 max-w-[200px] md:max-w-full lg:max-w-full lg:flex-row-reverse md:flex-row-reverse">
            <Image
              src="/images/OthersLogo1.png"
              alt="logo"
              width={68}
              height={74}
              className="w-12 lg:w-[68px] md:w-[40] h-auto cursor-pointer"
              loading="eager"
            />
            <Image
              src="/images/OthersLogo2.png"
              alt="logo"
              width={68}
              height={74}
              className="w-12 lg:w-[68px] md:w-[40] h-auto cursor-pointer"
              loading="eager"
            />
            <Image
              src="/images/OthersLogo3.png"
              alt="logo"
              width={68}
              height={74}
              className="w-12 lg:w-[68px] md:w-[40] h-auto cursor-pointer"
              loading="eager"
            />
            <Image
              src="/images/OthersLogo4.png"
              alt="logo"
              width={68}
              height={74}
              className="w-12 lg:w-[68px] md:w-[40] h-auto cursor-pointer  "
              loading="eager"
            />
            <Image
              src="/images/OthersLogo5.png"
              alt="logo"
              width={68}
              height={74}
              className="w-12 lg:w-[68px] md:w-[40] h-auto cursor-pointer"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div></div>
      <div className="max-w-full mx-16 md:mx-auto h-15 justify-center border-t border-gray-300 items-center flex text-center font-medium text-tcolor font-sans">
        <h2>کلیه حقوق این وب‌سایت متعلق به تورینو میباشد.</h2>
      </div>
    </footer>
  );
}

export default Footer;
