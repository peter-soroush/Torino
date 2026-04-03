"use client";
import Link from "next/link";
import React from "react";
import { toPersianNumbers } from "../utils/functions";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi2";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

function ProfleMenu() {
  const router = useRouter();
  return (
    <div className="justify-center absolute bg-white mx-5 z-50 rounded-2xl left-8 lg:left-15 md:-left-1 top-16 md:w-38 lg:w-48 w-40  flex flex-col ">
      <div className="flex flex-row px-5 bg-gray-200 text-sm lg:text-lg py-2 rounded-tl-2xl rounded-tr-2xl cursor-auto">
        <div>
          <CgProfile className="ml-1 my-1" />
        </div>
        <div className="font-bold">{toPersianNumbers("09127134110")}</div>
      </div>

      <Link
        href="/profile"
        onClick={(e) => e.preventDefault()}
        onMouseDown={(e) => {
          e.preventDefault();

          router.push("/profile");
        }}
      >
        <div className="flex flex-row px-5 pt-2 text-xs lg:text-sm py-2 hover:bg-gray-100 cursor-pointer">
          <div>
            <HiOutlineUser className="justify-center ml-1" />
          </div>
          <div>اطلاعات حساب کاربری</div>
        </div>
      </Link>
      <LogoutButton />
    </div>
  );
}
export default ProfleMenu;
