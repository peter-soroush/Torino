import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { CiEdit } from "react-icons/ci";
import {
  convertToPersianDate,
  getLongPersianDate,
  getTourStatus,
  getVehicleName,
  toPersianNumbers,
} from "../utils/functions";
import { MdAirplanemodeActive } from "react-icons/md";
import { FaBusSimple } from "react-icons/fa6";
import { TbCarSuv, TbShip } from "react-icons/tb";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { cityNameMapper } from "../utils/cityMapper";
import { PiSunHorizon } from "react-icons/pi";

async function MyToursInfo() {
  const today = new Date();
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/");
  }

  const res = await fetch(`http://localhost:6500/user/tours`, {
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

  if (data.length == 0) {
    return (
      <div>
        <p>توری یافت نشد</p>
      </div>
    );
  }
  return (
    <section className="flex flex-col border-2 border-gray-300 rounded-lg p-5 gap-5 ">
      {data.map((tourItem) => (
        <div
          key={tourItem.id}
          className="border-2 border-gray-300 rounded-lg p-5 gap-5 space-y-5"
        >
          <div className="flex flex-row justify-between gap-2 items-center">
            <div className="flex flex-row gap-3 items-center">
              <div>
                <PiSunHorizon />
              </div>
              <div className="text-xs lg:text-sm">{tourItem.title}</div>
            </div>
            <div className="flex flex-row gap-2">
              <div>
                {getVehicleName(tourItem.fleetVehicle) === "هواپیما" ? (
                  <MdAirplanemodeActive />
                ) : getVehicleName(tourItem.fleetVehicle) === "اتوبوس" ? (
                  <FaBusSimple />
                ) : getVehicleName(tourItem.fleetVehicle) === "کشتی" ? (
                  <TbShip />
                ) : getVehicleName(tourItem.fleetVehicle) === "آفرود" ? (
                  <TbCarSuv />
                ) : getVehicleName(tourItem.fleetVehicle) === "ون" ? (
                  <LiaShuttleVanSolid />
                ) : (
                  <IoCarSportOutline />
                )}{" "}
              </div>
              <div className="text-xs lg:text-sm">
                سفر با {getVehicleName(tourItem.fleetVehicle)}{" "}
              </div>
            </div>

            <div className="text-sm font-medium">
              {getTourStatus(tourItem.startDate, tourItem.endDate)}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  w-full lg:gap-10 gap-3">
            <div className="flex flex-row lg:w-1/3 justify-between lg:justify-start lg:gap-10">
              <div className="flex flex-row text-sm gap-1 items-center font-semibold ">
                {cityNameMapper[tourItem.origin.name] || tourItem.origin.name}{" "}
                به{" "}
                {cityNameMapper[tourItem.destination.name] ||
                  tourItem.destination.name}
              </div>
              <div className="text-gray-500 text-sm">
                {getLongPersianDate(tourItem.startDate)}
              </div>
            </div>
            <div className="flex flex-row lg:w-1/3 justify-between ">
              <div className="text-sm gap-1 items-center font-semibold">
                تاریخ برگشت
              </div>
              <div className="text-gray-500 text-sm">
                {getLongPersianDate(tourItem.endDate)}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-between lg:justify-start border-t border-gray-300 pt-3 items-center">
            <div className="flex flex-row gap-5 outline-l pl-5 border-l-2 items-center border-gray-300">
              <div className="text-[10px] md:text-sm items-center text-gray-500 ">
                شماره تور
              </div>
              <div className="text-sm font-bold">
                {toPersianNumbers(tourItem.id.slice(19, 28))}
              </div>
            </div>
            <div className="flex flex-row gap-5 items-center">
              <div className="text-[10px] md:text-sm items-center text-gray-500">
                مبلغ پرداخت شده
              </div>
              <div className="text-sm font-bold">
                {toPersianNumbers(tourItem.price.toLocaleString("fa-IR"))}
                <span className="text-[10px] text-gray-500"> تومان </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MyToursInfo;
