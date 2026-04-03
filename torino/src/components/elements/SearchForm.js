"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiMapPin, FiGlobe, FiCalendar } from "react-icons/fi";
import OriginLocation from "./OriginLocation";
import DestinationLocation from "./DestinationLocation";
import { useRouter } from "next/navigation";
import { getAllTours } from "../utils/tourService";
import TourCalendar from "../Module/TourCalendar";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SearchForm() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [apiData, setApiData] = useState([]);

  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [originInputValue, setOriginInputValue] = useState("");

  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const tours = await getAllTours();
        setApiData(tours);
      } catch (error) {
        console.error("خطا در دریافت تورها:", error);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target))
        setIsOriginOpen(false);
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      )
        setIsDestinationOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOriginOpen(false);
        setIsDestinationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectOrigin = (cityObj) => {
    setSelectedOrigin(cityObj);
    setOriginInputValue(cityObj.label);
    setIsOriginOpen(false);
  };
  const handleOriginInputChange = (e) => {
    setOriginInputValue(e.target.value);
    setSelectedOrigin(null);
    setIsOriginOpen(true);
  };
  const handleSelectDestination = (cityObj) => {
    setSelectedDestination(cityObj);
    setDestinationInputValue(cityObj.label);
    setIsDestinationOpen(false);
  };
  const handleDestinationInputChange = (e) => {
    setDestinationInputValue(e.target.value);
    setSelectedDestination(null);
    setIsDestinationOpen(true);
  };

  const handleSearch = () => {
    // 🔥 لایه محافظتی: اگر هر ۳ فیلد کاملاً خالی بودند، متوقف شو!
    if (!selectedOrigin?.id && !selectedDestination?.id && !selectedDate) {
      toast.warning(
        "لطفاً حداقل یک مورد (مبدا، مقصد یا تاریخ) را برای جستجو انتخاب کنید.",
      );
      return;
    }

    const params = new URLSearchParams();

    if (selectedOrigin?.id) {
      params.append("originId", selectedOrigin.id);
    }
    if (selectedDestination?.id) {
      params.append("destinationId", selectedDestination.id);
    }
    if (selectedDate) {
      params.append("date", selectedDate);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-10 md:px-20 mt-15 font-sans">
      <h2 className="text-center text-gray-700 font-bold text-xl md:text-3xl mb-6">
        <span className="text-green-600">تورینو</span> برگزار کننده بهترین
        تورهای داخلی و خارجی
      </h2>

      <form className="flex flex-col gap-1 md:flex-row md:items-center md:bg-white md:border md:border-gray-200 md:rounded-2xl md:p-2 md:shadow-lg">
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-1 md:gap-0">
          <div
            ref={originRef}
            className="relative flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl p-3 md:border-none md:bg-transparent md:flex-1"
          >
            <FiMapPin className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="مبدا"
              value={originInputValue}
              onChange={handleOriginInputChange}
              onClick={() => setIsOriginOpen(true)}
              className="bg-transparent outline-none w-16 md:w-full text-gray-700 placeholder-gray-400"
            />
            {isOriginOpen && (
              <OriginLocation
                apiData={apiData}
                searchQuery={originInputValue}
                onSelect={handleSelectOrigin}
                selectedDestination={selectedDestination}
              />
            )}
          </div>

          <div className="mr-6 max-md:hidden md:block w-px h-6 bg-gray-300 self-center"></div>

          <div
            ref={destinationRef}
            className="relative flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl p-3 md:border-none md:bg-transparent md:flex-1"
          >
            <FiGlobe className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="مقصد"
              value={destinationInputValue}
              onChange={handleDestinationInputChange}
              onClick={() => setIsDestinationOpen(true)}
              className="bg-transparent outline-none w-16 md:w-full text-gray-700 placeholder-gray-400"
            />
            {isDestinationOpen && (
              <DestinationLocation
                apiData={apiData}
                searchQuery={destinationInputValue}
                onSelect={handleSelectDestination}
                selectedOrigin={selectedOrigin}
              />
            )}
          </div>
        </div>

        <div className="mr-6 max-md:hidden md:block w-px h-6 bg-gray-300 self-center"></div>

        <TourCalendar
          apiData={apiData}
          selectedOrigin={selectedOrigin}
          selectedDestination={selectedDestination}
          // 🔥 این خط بسیار مهم است! باید استیت را آپدیت کند نه اینکه فقط لاگ بگیرد
          onDateSelect={(date) => setSelectedDate(date)}
        />

        <button
          type="button"
          onClick={handleSearch}
          className="w-full cursor-pointer md:w-auto bg-brandcolor text-white font-medium rounded-xl py-3 md:px-10 hover:bg-green-700 transition-colors"
        >
          جستجو
        </button>
      </form>
    </div>
  );
}
