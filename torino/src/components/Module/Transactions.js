import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import {
  convertToPersianDate,
  convertToPersianDateTime,
  toPersianNumbers,
} from "../utils/functions";

async function Transactions() {
  const today = new Date();
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/");
  }

  const res = await fetch(`http://localhost:6500/user/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    redirect("/api/auth/signout");
  }

  const data = await res.json();
  console.log(data);
  return (
    <div className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
      <div className="grid grid-cols-3 lg:grid-cols-4 bg-gray-100 py-4 px-2 lg:px-6 text-center text-sm lg:text-base font-semibold text-gray-700">
        <div>تاریخ و ساعت</div>
        <div>مبلغ (تومان)</div>

        <div className="max-lg:hidden lg:block">نوع تراکنش</div>
        <div>شماره سفارش</div>
      </div>
      <div className="flex flex-col">
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-3 lg:grid-cols-4 items-center py-5 px-2 lg:px-6 text-center text-xs lg:text-sm text-gray-800 ${
              index !== data.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>{convertToPersianDateTime(item.createdAt)}</div>
            <div>{toPersianNumbers(item.amount.toLocaleString("fa-IR"))}</div>

            <div className="max-lg:hidden lg:block ">
              ثبت نام در تور گردشگری
            </div>
            <div className="flex flex-row justify-center gap-2">
              <span className="lg:block max-lg:hidden">سفارش</span>

              {toPersianNumbers(item.id.slice(0, 8))}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            تراکنشی برای نمایش وجود ندارد.
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
