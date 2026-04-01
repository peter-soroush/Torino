import { getDurationDays } from "@/components/utils/functions";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { RiUser3Fill } from "react-icons/ri";

async function Basket({ params }) {
  const { tourid } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/");
  }

  const res = await fetch(`http://localhost:6500/basket/${tourid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-store",
  });

  const res2 = await fetch(`http://localhost:6500/basket/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-store",
  });

  if (!res2.ok) {
    console.error("خطا در دریافت سبد خرید:", res2.status);
  }

  const basketData = await res2.json();

  console.log("اطلاعات سبد خرید:", basketData);

  return (
    <section className="flex lg:flex-row flex-col font-sans px-10 lg:px-31 justify-between py-10 rounded-lg lg:mb-40 mb-10">
      <div className=" flex lg:flex-col flex-col bg-white lg:w-5/7 rounded-lg border-2 border-gray-300">
        <div className="flex flex-row gap-2 px-5 py-5 ">
          <div>
            <RiUser3Fill className="text-xl lg:flex" />
          </div>
          <div className="text-2xl">مشخصات مسافر</div>
        </div>
        <div className=" flex flex-col lg:grid grid-cols-3 gap-5 px-5 py-1">
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="نام و نام خانوادگی"
          />
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="کد ملی  "
          />
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder=" تاریخ تولد "
          />
          <input
            className="mb-5 lg:mb-5 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder=" جنسیت "
          />
        </div>
      </div>
      <div className="lg:w-2/7 bg-white lg:mx-2 rounded-b-lg py-5 px-3 mt-5 lg:mt-0 border-2 border-gray-300 rounded-lg">
        <div
          className=" flex flex-row justify-between border-dashed border-b-2 border-gray-300 pb-0 lg:pb-4
        "
        >
          <div className="text-2xl font-semibold ">{basketData.title}</div>
          <div>
            <div className="text-gray-500 text-sm">
              {getDurationDays(
                basketData.startDate,
                basketData.endDate,
              ).toLocaleString("fa-IR")}
              {"  "} روز و{"  "}
              {(
                getDurationDays(basketData.startDate, basketData.endDate) - 1
              ).toLocaleString("fa-IR")}{" "}
              شب
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between px-3 pt-8">
          <div className="text-lg">قیمت نهایی</div>
          <div className="flex flex-row gap-1 items-center">
            <div className="text-sky-500 text-3xl font-bold">
              {basketData.price.toLocaleString("fa-IR")}
            </div>
            <span className="text-sm">تومان</span>
          </div>
        </div>
        <div>
          <Link href="/actions/order">
            <button className="cursor-pointer text-xl w-full py-3 mt-8 bg-[#28a745] text-white px-6  rounded-md  hover:bg-green-600 transition-colors shadow-sm">
              ثبت و خرید نهایی
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Basket;
