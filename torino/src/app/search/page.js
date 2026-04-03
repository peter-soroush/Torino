import ReserveButton from "@/components/Module/ReserveButton";
import SearchPagination from "@/components/Module/SearchPagination";
import { cityNameMapper } from "@/components/utils/cityMapper";
import {
  convertToPersianDate,
  getDurationDays,
  getVehicleName,
} from "@/components/utils/functions";
import { getAllTours } from "@/components/utils/tourService";
import Image from "next/image";
import Link from "next/link";

import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBusSimple, FaCheck, FaRoute } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoCalendarSharp, IoCarSportOutline } from "react-icons/io5";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { MdAirplanemodeActive, MdOutlineReduceCapacity } from "react-icons/md";
import { TbCarSuv, TbShip } from "react-icons/tb";

const ITEMS_PER_PAGE = 6;

async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const allTours = await getAllTours();

  const originId = params?.originId;
  const destinationId = params?.destinationId;
  const searchDate = params?.date;

  let filteredTours = allTours;

  if (originId) {
    filteredTours = filteredTours.filter((tour) => tour.origin.id === originId);
  }

  if (destinationId) {
    filteredTours = filteredTours.filter(
      (tour) => tour.destination.id === destinationId,
    );
  }

  if (searchDate) {
    filteredTours = filteredTours.filter((tour) =>
      tour.startDate.includes(searchDate),
    );
  }

  const currentPage = Number(params?.page) || 1;

  const totalItems = filteredTours.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (paginatedTours.length === 0) {
    return (
      <section className="container max-w-full mx-auto md:bg-gray-200 font-sans py-15 justify-center items-center text-center">
        <span className="text-2xl ">
          {" "}
          برای مبدا، مقصد یا تاریخ مورد نظر، توری یافت نشد{" "}
        </span>
        <Link href="/">
          {" "}
          <div className="py-10 ">
            <span className="bg-brandcolor px-5 py-3 rounded-lg hover:bg-green-500">
              بازگشت به صفحه اصلی
            </span>
          </div>{" "}
        </Link>
      </section>
    );
  }

  return (
    <section className="container max-w-full mx-auto md:bg-gray-200 font-sans py-15">
      {paginatedTours.map((tourData) => (
        <div
          key={tourData.id}
          className="flex flex-col mx-auto items-center md:items-start rounded-lg bg-white md:mx-31 px-5 md:my-10 md:pt-5"
        >
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
                  <ReserveButton tourId={tourData.id} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center text-center mt-8 w-full py-4 overflow-x-auto [&::-webkit-scrollbar]:hidden divide-x  divide-gray-300">
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
                {getVehicleName(tourData.fleetVehicle) === "هواپیما" ? (
                  <MdAirplanemodeActive />
                ) : getVehicleName(tourData.fleetVehicle) === "اتوبوس" ? (
                  <FaBusSimple />
                ) : getVehicleName(tourData.fleetVehicle) === "کشتی" ? (
                  <TbShip />
                ) : getVehicleName(tourData.fleetVehicle) === "آفرود" ? (
                  <TbCarSuv />
                ) : getVehicleName(tourData.fleetVehicle) === "ون" ? (
                  <LiaShuttleVanSolid />
                ) : (
                  <IoCarSportOutline />
                )}{" "}
                <span>حمل و نقل</span>
              </div>
              <div className="font-bold text-gray-800 text-sm md:text-base">
                {getVehicleName(tourData.fleetVehicle)}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
              <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
                <MdOutlineReduceCapacity />
                <span>ظرفیت</span>
              </div>
              <div className="font-bold text-gray-800 text-sm md:text-base">
                {tourData.capacity
                  ? "حداکثر" +
                    " " +
                    tourData.capacity.toLocaleString("fa-IR") +
                    " نفر"
                  : "نامشخص"}{" "}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center min-w-[33.33%] md:min-w-0 md:flex-1 px-2">
              <div className="flex flex-row gap-2 items-center text-gray-500 text-sm md:text-base">
                <AiFillSafetyCertificate />
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
      ))}
      <SearchPagination totalPages={totalPages} currentPage={currentPage} />
    </section>
  );
}

export default SearchPage;
