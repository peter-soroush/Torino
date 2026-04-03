import TourGrid from "@/components/Module/TourGrid";
import { getAllTours } from "@/components/utils/tourService";
import React from "react";

async function Alltours() {
  const Alltours = await getAllTours();

  console.log(Alltours.length);
  const tours = Alltours.slice(0, Alltours.length);
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 font-sans">
        توری برای نمایش یافت نشد.
      </div>
    );
  }
  return (
    <div className="font-sans lg:py-25 px-5">
      <TourGrid tours={tours} showAllstat={true} />
    </div>
  );
}

export default Alltours;
