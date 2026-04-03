// مسیر پیشنهادی: src/components/Module/ProfileTabs.js
"use client";
import React, { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import { TbSunset2Filled } from "react-icons/tb";
import { IoMdCard } from "react-icons/io";

function ProfileTabs({ profileTab, myToursTab, transactionsTab }) {
  const [menuState, setMenuState] = useState("1");

  return (
    <section className="font-sans container max-w-full mx-auto px-10 lg:px-31 py-10 lg:items-start ">
      <div className=" flex flex-col lg:flex-row">
        <div className="h-fit flex flex-row lg:flex-col justify-between items-center py-5 lg:py-0 lg:w-1/5 lg:rounded-xl border-gray-400 lg:border-2 text-center">
          <div
            className={`flex flex-row gap-2 items-center hover:text-brandcolor w-full lg:text-center lg:pr-4 lg:hover:bg-green-200 lg:py-4 border-b-2 lg:border-gray-200 pb-2 justify-center hover:rounded-t-xl lg:justify-start lg:pb-4 ${menuState === "1" ? "text-brandcolor" : ""} cursor-pointer`}
            onClick={() => setMenuState("1")}
          >
            <div>
              <RiUser3Fill />
            </div>
            <div>پروفایل</div>
          </div>
          <div
            className={`flex flex-row gap-2 items-center hover:text-brandcolor w-full lg:hover:bg-green-200 lg:pr-4 lg:py-4 border-b-2 lg:border-gray-200 pb-2 lg:pb-4 justify-center lg:justify-start ${menuState === "2" ? "text-brandcolor" : ""} cursor-pointer`}
            onClick={() => setMenuState("2")}
          >
            <div>
              <TbSunset2Filled />
            </div>
            <div>تورهای من</div>
          </div>
          <div
            className={`flex flex-row gap-2 items-center hover:text-brandcolor w-full lg:hover:bg-green-200 lg:py-4 lg:pr-4 border-b-2 lg:border-b-0 pb-2 lg:pb-4 justify-center lg:justify-start lg:hover:rounded-b-xl ${menuState === "3" ? "text-brandcolor" : ""} cursor-pointer`}
            onClick={() => setMenuState("3")}
          >
            <div>
              <IoMdCard />
            </div>
            <div>تراکنش‌ها</div>
          </div>
        </div>

        {/* محتوای سمت چپ */}
        <div className="lg:w-4/5 lg:pr-5">
          <div>
            {menuState === "1" && profileTab}
            {menuState === "2" && myToursTab}
            {menuState === "3" && transactionsTab}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileTabs;
