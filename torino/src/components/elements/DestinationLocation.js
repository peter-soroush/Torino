"use client";
import React, { useMemo } from "react";
import { SlLocationPin } from "react-icons/sl";
import { cityNameMapper } from "../utils/cityMapper";

function DestinationLocation({
  apiData = [],
  onSelect,
  searchQuery,
  selectedOrigin,
}) {
  // استخراج مقاصد یکتا بر اساس مبدایی که انتخاب شده (اگر انتخاب شده باشد)
  const uniqueDestination = useMemo(() => {
    if (!apiData || apiData.length === 0) return [];

    const relevantTours = selectedOrigin
      ? apiData.filter(
          (tour) => tour.origin && tour.origin.id === selectedOrigin.id,
        )
      : apiData;

    const DestinationMap = new Map();
    relevantTours.forEach((tour) => {
      if (tour.destination && !DestinationMap.has(tour.destination.id)) {
        DestinationMap.set(tour.destination.id, {
          id: tour.destination.id,
          name: tour.destination.name,
          label: cityNameMapper[tour.destination.name] || tour.destination.name,
        });
      }
    });

    return Array.from(DestinationMap.values());
  }, [apiData, selectedOrigin]);

  // فیلتر کردن بر اساس حروفی که کاربر تایپ می‌کند
  const filteredDestination = useMemo(() => {
    if (!searchQuery) return uniqueDestination;
    return uniqueDestination.filter(
      (city) =>
        city.label.includes(searchQuery) ||
        city.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [uniqueDestination, searchQuery]);

  return (
    <div className="absolute top-full right-0 mt-4 bg-white z-50 rounded-2xl w-48 flex flex-col shadow-xl border border-gray-100 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
      <div className="flex flex-row px-4 bg-gray-100 text-sm py-2 cursor-default sticky top-0">
        <div className="text-gray-500 text-xs font-bold">
          {searchQuery ? "نتایج جستجو" : "پر تردد"}
        </div>
      </div>

      {apiData.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500 text-center">
          در حال بارگذاری...
        </div>
      ) : filteredDestination.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500 text-center">
          مقصدی یافت نشد.
        </div>
      ) : (
        filteredDestination.map((city) => (
          <div
            key={city.id}
            onClick={() => onSelect(city)}
            className="flex flex-row px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none items-center transition-colors"
          >
            <SlLocationPin className="ml-2 text-gray-400 shrink-0" />
            <div className="text-gray-700 truncate">{city.label}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default DestinationLocation;
