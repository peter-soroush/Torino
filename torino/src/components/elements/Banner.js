import Image from "next/image";
import React from "react";
import { FaPhone } from "react-icons/fa6";

function Banner() {
  return (
    <section
      id="Banner"
      className="max-w-full px-10 lg:px-31 container mx-auto mt-20 font-sans"
    >
      <div className="border border-gray-300 rounded-lg flex flex-col lg:flex-row items-stretch justify-center">
        <div className="relative bg-brandcolor rounded-lg h-32 lg:h-63 w-full lg:w-4/6 ">
          <div className=" lg:left-20 flex flex-row">
            <div className="flex flex-col justify-center p-5 lg:p-15">
              <h3 className="text-white font-bold lg:text-5xl lg:text-3xl text-2xl">
                خرید تلفنی از
                <span className="text-brandcolordark font-extrabold">
                  {"  "}تورینو{" "}
                </span>
              </h3>

              <p className="text-white lg:text-3xl lg:text-2xl text-lg pt-5">
                به هرکجا که میخواهید!
              </p>
            </div>
            <div className="absolute bottom-0 lg:left-10 left-1">
              <Image
                src="/images/man-talking.png"
                alt="banner"
                width={308}
                height={225}
                className="w-52 lg:w-[308px] lg:h-auto h-42"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/6 flex lg:flex-col flex-row items-center justify-center gap-6 py-3 lg:py-0 ">
          <div className="text-gray-700 text-xl">
            <span
              dir="ltr"
              className="flex items-center justify-center gap-3 font-bold font-sans text-2xl text-black"
            >
              <FaPhone className="text-xl" />
              <span>۰۲۱-۸۵۷۴</span>
            </span>
          </div>

          <button className="bg-brandcolordark rounded-lg px-10 py-3 font-sans text-white hover:opacity-90 transition-opacity">
            اطلاعات بیشتر
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;
