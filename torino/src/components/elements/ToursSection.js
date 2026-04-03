import Link from "next/link";
import TourGrid from "../Module/TourGrid";
import { getAllTours } from "../utils/tourService";

export default async function TourList() {
  const Alltours = await getAllTours();

  const tours = Alltours.slice(0, 8);
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 font-sans">
        توری برای نمایش یافت نشد.
      </div>
    );
  }

  return (
    <section className="max-w-full container mx-auto px-10 md:px-31 mt-16 font-sans">
      <Link href="/tour">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">همه تورها</h3>
      </Link>

      <TourGrid tours={tours} />
    </section>
  );
}
