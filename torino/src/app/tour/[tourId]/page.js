import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getDurationDays,
  getVehicleName,
  toPersianNumbers,
  convertToPersianDate,
} from "@/components/utils/functions";

import { FaRoute } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import { FaBusSimple } from "react-icons/fa6";
import { MdAirplanemodeActive } from "react-icons/md";
import { TbShip } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { cityNameMapper } from "@/components/utils/cityMapper";
import ReserveButton from "@/components/Module/ReserveButton";

async function TourPage({ params }) {
  const { tourId } = await params;

  const res = await fetch(`http://localhost:6500/tour/${tourId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }
  const tourData = await res.json();

  return (
    <section className="container max-w-full mx-auto md:bg-gray-200 font-sans py-15">
      <div className="flex flex-col mx-auto items-center md:items-start rounded-lg bg-white md:mx-31 px-5 md:my-10 md:pt-5">
        <div className="flex flex-col justify-start md:flex-row  md:w-full ">
          <div>
            <Image
              src={tourData.image}
              alt={tourData.title}
              width={397}
              height={265}
              unoptimized={true}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between md:flex-col md:justify-start w-full md:px-5 py-5 md:py-0">
            <div className="flex flex-row justify-between md:flex-col md:justify-start">
              <div className="text-3xl font-bold">{tourData.title}</div>
              <div className="md:pt-5">
                {getDurationDays(
                  tourData.startDate,
                  tourData.endDate,
                ).toLocaleString("fa-IR")}
                {"  "} روز و{"  "}
                {(
                  getDurationDays(tourData.startDate, tourData.endDate) - 1
                ).toLocaleString("fa-IR")}{" "}
                شب
              </div>
            </div>
            <div className="flex flex-row pt-5 gap-15 text-gray-500 md:justify-start justify-between md:w-3/4">
              {tourData.options.map((option, index) => (
                <div key={index} className="">
                  {option}
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-between text-center w-full md:pt-5 pt-10 ">
              <div className="text-3xl text-blue-400">
                {Number(tourData.price).toLocaleString("fa-IR")}{" "}
                <span className="text-sm text-black">تومان</span>{" "}
              </div>
              <div>
                <ReserveButton tourId={tourId} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center text-center mt-8 w-full py-4 overflow-x-auto [&::-webkit-scrollbar]:hidden divide-x  divide-gray-300">
          {/* ۱. مبدا */}
          <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
            <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
              <FaRoute />
              <span>مبدا</span>
            </div>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {cityNameMapper[tourData.origin.name] || tourData.origin.name}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
            <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
              <FaCalendarAlt />
              <span>تاریخ رفت</span>
            </div>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {convertToPersianDate(tourData.startDate)}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
            <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
              <IoCalendarSharp />
              <span>تاریخ برگشت</span>
            </div>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {convertToPersianDate(tourData.endDate)}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
            <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
              {getVehicleName(tourData.fleetVehicle) === "پرواز" ? (
                <MdAirplanemodeActive />
              ) : getVehicleName(tourData.fleetVehicle) === "اتوبوس" ? (
                <FaBusSimple />
              ) : getVehicleName(tourData.fleetVehicle) === "کشتی" ? (
                <TbShip />
              ) : (
                <FaRoute />
              )}{" "}
              <span>حمل و نقل</span>
            </div>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              {getVehicleName(tourData.fleetVehicle)}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
            <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
              <FaRoute />
              <span>ظرفیت</span>
            </div>
            <div className="font-bold text-gray-800 text-sm md:text-base">
              حداکثر {tourData.capacity.toLocaleString("fa-IR")} نفر
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
            <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
              <FaRoute />
              <span>بیمه</span>
            </div>
            <div className="font-bold text-sm md:text-base">
              {tourData.insurance ? (
                <div className="flex flex-row gap-1 items-center text-green-600">
                  <FaCheck size={12} />
                  دارد
                </div>
              ) : (
                <div className="flex flex-row gap-1 items-center text-red-500">
                  <ImCross size={10} />
                  ندارد
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourPage;
