"use client";
import React, { useMemo } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FiCalendar } from "react-icons/fi";

export default function TourCalendar({
  apiData,
  selectedOrigin,
  selectedDestination,
  onDateSelect,
}) {
  const availableDates = useMemo(() => {
    if (!apiData || apiData.length === 0) return [];

    const filteredTours = apiData.filter((tour) => {
      const matchOrigin = selectedOrigin
        ? tour.origin.id === selectedOrigin.id
        : true;
      const matchDestination = selectedDestination
        ? tour.destination.id === selectedDestination.id
        : true;
      return matchOrigin && matchDestination;
    });

    return filteredTours.map((tour) => {
      const date = new Date(tour.startDate);

      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    });
  }, [apiData, selectedOrigin, selectedDestination]);

  const mapDays = ({ date }) => {
    const gregorianDate = new Date(date.toDate());
    const dateString = `${gregorianDate.getFullYear()}-${gregorianDate.getMonth() + 1}-${gregorianDate.getDate()}`;

    const hasTour = availableDates.includes(dateString);

    if (hasTour) {
      return {
        style: {
          backgroundColor: "#16a34a",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(22, 163, 74, 0.4)",
        },
        className: "cursor-pointer hover:bg-green-700",
      };
    }
  };

  return (
    <div className="relative flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl p-3 md:border-none md:bg-transparent md:flex-1 w-full">
      <FiCalendar className="text-gray-500 text-lg" />

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        onChange={(dateObject) => {
          if (dateObject) {
            onDateSelect(dateObject.toDate());
          }
        }}
        mapDays={mapDays}
        inputClass="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 cursor-pointer"
        containerClassName="w-full"
        placeholder="تاریخ"
      />
    </div>
  );
}
