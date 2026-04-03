import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { toPersianNumbers } from "../utils/functions";

async function ProfileInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/");
  }

  const res = await fetch(`http://localhost:6500/user/profile`, {
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
    <section>
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full border-2 border-gray-300 rounded-lg py-3 space-y-5">
          <div className="px-5 text-lg">اطلاعات حساب کاربری</div>
          <div className="flex flex-col lg:flex-row justify-between px-5">
            <div className="flex flex-row justify-between lg:px-5 space-y-5 gap-5">
              <div className="text-sm">شماره موبایل</div>
              <div className="font-semibold">
                {toPersianNumbers(data.mobile)}
              </div>
            </div>
            <div className="flex flex-row justify-between lg:px-5 gap-20 space-y-5 ">
              <div className="flex flex-row gap-5">
                <div className="text-sm">ایمیل</div>
                <div> - </div>
              </div>
              <div className="flex flex-row justify-between lg:px-5 gap-2 text-sky-400 cursor-pointer">
                <div>
                  <CiEdit />
                </div>
                <div className="text-sm">افزودن</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-2 border-gray-300 rounded-lg py-3 space-y-5 px-5 ">
          <div className="flex flex-row justify-between">
            <div>اطللاعات شخصی</div>
            <div className="flex flex-row gap-3 text-sm text-sky-400">
              <div>
                <CiEdit />
              </div>
              <div className="cursor-pointer">ویرایش اطلاعات</div>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 space-y-5 ">
            <div className="flex flex-row justify-between lg:justify-start gap-20">
              <div className="text-sm">نام و نام خانوادگی</div>
              <div>احمدرضا سروش</div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-5">
              <div className="text-sm">کد ملی</div>
              <div>{toPersianNumbers("1234567890")}</div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-35">
              <div className="text-sm">جنسیت</div>
              <div>مرد</div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start gap-5">
              <div className="text-sm">تاریخ تولد</div>
              <div>{toPersianNumbers("1370/01/01")}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col border-2 border-gray-300 rounded-lg py-3 space-y-5 px-5 ">
            <div className="flex flex-row justify-between">
              <div>اطللاعات شخصی</div>
              <div className="flex flex-row gap-3 text-sm text-sky-400">
                <div>
                  <CiEdit />
                </div>
                <div className="cursor-pointer">ویرایش اطلاعات</div>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 space-y-5 ">
              <div className="flex flex-row justify-between lg:justify-start gap-20">
                <div className="text-sm"> شماره شبا</div>
                <div>- </div>
              </div>
              <div className="flex flex-row justify-between lg:justify-start gap-5">
                <div className="text-sm">شماره کارت </div>
                <div>{toPersianNumbers("6037-9917-5025-6536")} </div>
              </div>
              <div className="flex flex-row justify-between lg:justify-start gap-16">
                <div className="text-sm">شماره حساب</div>
                <div>-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileInfo;
