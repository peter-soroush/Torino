"use client";
import React, { useMemo } from "react";
import { SlLocationPin } from "react-icons/sl";
import { cityNameMapper } from "../utils/cityMapper";

function OriginLocation({
  apiData = [],
  onSelect,
  searchQuery,
  selectedDestination,
}) {
  const uniqueOrigins = useMemo(() => {
    if (!apiData || apiData.length === 0) return [];

    const relevantTours = selectedDestination
      ? apiData.filter(
          (tour) =>
            tour.destination && tour.destination.id === selectedDestination.id,
        )
      : apiData;

    const originsMap = new Map();
    relevantTours.forEach((tour) => {
      if (tour.origin && !originsMap.has(tour.origin.id)) {
        originsMap.set(tour.origin.id, {
          id: tour.origin.id,
          name: tour.origin.name,
          label: cityNameMapper[tour.origin.name] || tour.origin.name,
        });
      }
    });

    return Array.from(originsMap.values());
  }, [apiData, selectedDestination]);

  const filteredOrigins = useMemo(() => {
    if (!searchQuery) return uniqueOrigins;
    return uniqueOrigins.filter(
      (city) =>
        city.label.includes(searchQuery) ||
        city.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [uniqueOrigins, searchQuery]);

  return (
    <div className="absolute top-full right-0 mt-4 bg-white z-50 rounded-2xl w-48 flex flex-col shadow-xl border border-gray-100 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
      <div className="flex flex-row px-4 bg-gray-100 text-sm py-2 cursor-default sticky top-0">
        <div className="text-gray-500 text-xs font-bold">
          {searchQuery ? "نتایج جستجو" : "پر تردد"}
        </div>
      </div>

      {/* منطق جدید و تمیز برای نمایش وضعیت‌ها */}
      {apiData.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500 text-center">
          در حال بارگذاری...
        </div>
      ) : filteredOrigins.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500 text-center">
          مبدایی یافت نشد.
        </div>
      ) : (
        filteredOrigins.map((city) => (
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

export default OriginLocation;
