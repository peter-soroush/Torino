"use client";
import React from "react";
import { logoutUser } from "@/actions/auth";
import { useRouter } from "next/navigation";

import { AiOutlineLogout } from "react-icons/ai";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // جلوی دزدیده شدن کلیک توسط پدرها را می‌گیرد

    await logoutUser();

    router.push("/");
  };

  return (
    <button
      type="button"
      onMouseDown={handleLogout}
      className="cursor-pointer flex flex-row border-t text-xs lg:text-sm border-gray-500 px-5 pt-2 py-2 text-red-700 hover:bg-gray-100  hover:rounded-bl-2xl hover:rounded-br-2xl"
    >
      <div>
        <AiOutlineLogout className="justify-center my-1 ml-1" />
      </div>
      <div>خروج از حساب کاربری</div>
    </button>
  );
}

export default LogoutButton;
