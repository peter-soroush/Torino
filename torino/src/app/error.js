"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Error() {
  return (
    <section className="container mx-auto  items-center">
      <div className="flex flex-col-reverse md:flex-row  font-sans md:h-100 items-center md:mt-10">
        <div className="md:w-1/2 items-center justify-start text-center md:text-start">
          <h3 className="text-3xl font-bold">اتصال با سرور برقرار نیست!</h3>

          <p className="  md:mt-10 mt-5 mb-20 text-2xl font-semibold">
            لطفا بعدا دوباره امتحان کنید
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/Error.png"
            alt="banner"
            width={22222}
            height={22222}
          />
        </div>
      </div>
    </section>
  );
}

export default Error;
