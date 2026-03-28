import React from "react";
import { FiMapPin, FiGlobe, FiCalendar } from "react-icons/fi";

export default function SearchForm() {
  return (
    <div className="w-full max-w-4xl mx-auto px-10 md:px-20 mt-15 font-sans">
      <h2 className="text-center text-gray-700 font-bold text-xl md:text-3xl mb-6">
        <span className="text-green-600">تورینو</span> برگزار کننده بهترین
        تورهای داخلی و خارجی
      </h2>

      <form className="flex flex-col gap-1 md:flex-row md:items-center md:bg-white md:border md:border-gray-200 md:rounded-xl md:p-2 md:shadow-lg">
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-1 md:gap-0">
          <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl p-3 md:border-none md:bg-transparent md:flex-1">
            <FiMapPin className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="مبدا"
              className=" bg-transparent outline-none w-16 md:w-full text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="mr-6 max-md:hidden md:block w-px h-6 bg-gray-300 self-center"></div>

          <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl p-3 md:border-none md:bg-transparent md:flex-1">
            <FiGlobe className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="مقصد"
              className="bg-transparent outline-none w-16 md:w-full text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="mr-6 max-md:hidden md:block w-px h-6 bg-gray-300 self-center"></div>

        <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl p-3 md:border-none md:bg-transparent md:flex-1">
          <FiCalendar className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="تاریخ"
            className="bg-transparent outline-none w-16 md:w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-brandcolor text-white font-medium rounded-xl py-3 md:rounded-xl md:px-15 hover:bg-green-700 transition-colors"
        >
          جستجو
        </button>
      </form>
    </div>
  );
}
