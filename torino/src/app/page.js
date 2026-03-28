import Banner from "@/components/elements/Banner";
import HeaderBanner from "@/components/elements/HeaderBanner";
import SearchForm from "@/components/elements/SearchForm";
import TourList from "@/components/elements/ToursSection";
import WhyUs from "@/components/elements/WhyUs";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeaderBanner />
      <SearchForm />
      <TourList />
      <Banner />
      <WhyUs />
    </>
  );
}
