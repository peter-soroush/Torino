"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import {
  getDurationDays,
  getPersianMonth,
  getVehicleName,
} from "../utils/functions";
import Link from "next/link";

export default function TourGrid({ tours }) {
  const [showAll, setShowAll] = useState(false);
  console.log({ tours });
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
        {tours.map((tour, index) => {
          const subtitleText = `${getPersianMonth(tour.startDate)} . ${getDurationDays(tour.startDate, tour.endDate).toLocaleString("fa-IR")} روزه - ${getVehicleName(tour.fleetVehicle)} - ${tour.options[0] || ""}`;

          const isHiddenOnMobile = !showAll && index >= 4;

          return (
            <Link key={tour.id} href={`/tour/${tour.id}`}>
              <div
                className={`flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${isHiddenOnMobile ? "max-lg:hidden lg:flex" : "flex"}`}
              >
                <div className="relative w-full h-44 bg-gray-100">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <div className="mb-4">
                    <h4 className="font-bold text-xl text-gray-900 mb-2 truncate">
                      {tour.title}
                    </h4>
                    <p
                      className="text-gray-500 text-sm truncate"
                      title={subtitleText}
                    >
                      {subtitleText}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between items-center">
                    <button className="cursor-pointer bg-[#28a745] text-white px-6 py-1.5 rounded-md text-sm font-medium hover:bg-green-600 transition-colors shadow-sm">
                      رزرو
                    </button>
                    <div className="flex items-center gap-1.5" dir="ltr">
                      <span className="text-gray-500 text-xs mt-1">تومان</span>
                      <span className="text-[#00b3e9] font-bold text-lg">
                        {tour.price.toLocaleString("fa-IR")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {!showAll && tours.length > 4 && (
        <div className="mt-8 flex justify-center lg:hidden ">
          <button
            onClick={() => setShowAll(true)}
            className="flex  justify-center w-full mx-1 py-1 text-gray-500 cursor-pointer"
          >
            مشاهده بیشتر
            <IoIosArrowDown className="text-gray-500 mr-2" />
          </button>
        </div>
      )}
    </>
  );
}
