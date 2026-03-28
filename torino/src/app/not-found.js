import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <section className="container mx-auto  items-center">
      <div className="flex flex-col-reverse md:flex-row  font-sans md:h-100 items-center md:mt-10">
        <div className="md:w-1/2 items-center justify-center text-center">
          <h3 className="text-3xl font-semibold">صفحه مورد نظر یافت نشد!</h3>
          <Link href="/">
            <button className="bg-green-200 px-5 py-2 rounded-lg md:mt-10 mt-5 mb-20 text-brandcolor cursor-pointer">
              بازگشت به صفحه اصلی
            </button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/404.png"
            alt="banner"
            width={22222}
            height={22222}
          />
        </div>
      </div>
    </section>
  );
}

export default NotFound;
