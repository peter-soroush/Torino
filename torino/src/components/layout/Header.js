"use client";
import React, { use, useEffect, useRef, useState } from "react";
import HamburgerMenu from "../elements/HamburgerMenu";
import Image from "next/image";
import { RiUser3Fill } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import LoginModal from "../auth/LoginModal";
import HamburgerMenuFile from "./HamburgerMenuFile";
import { toPersianNumbers } from "../utils/functions";
import { IoIosArrowDown } from "react-icons/io";
import ProfleMenu from "../elements/ProfleMenu";

function Header({ isLoggedIn, userMobile }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const ProfileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ProfileMenuRef.current &&
        !ProfileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <>
      <header className="container max-w-full mx-auto px-6 lg:px-0 font-sans">
        <nav className="flex flex-row space-between items-center justify-between lg:mx-31 md:mx-5">
          <div className="max-md:hidden md:flex md:space-x-4 items-center justify-between lg:flex lg:space-x-10 my-4">
            <Link href="/">
              <Image
                src="/images/Logo.png"
                alt="logo"
                width={146}
                height={44}
                className="cursor-pointer"
                loading="eager"
              />
            </Link>
            <div className=" group text-green-800">
              <Link href="/">صفحه اصلی</Link>
              <div className="group-hover:border-b group-hover:border-blue-50"></div>
            </div>
            <div className="group text-tcolor">
              <Link href="/">خدمات گردشگری</Link>
              <div className="group-hover:border-b group-hover:border-blue-50"></div>
            </div>
            <div className="group text-tcolor">
              <Link href="/">درباره ما</Link>
              <div className="group-hover:border-b group-hover:border-blue-50"></div>
            </div>
            <div className="group text-tcolor">
              <Link href="/">تماس با ما</Link>
              <div className="group-hover:border-b group-hover:border-blue-50"></div>
            </div>
          </div>
          <div className="mx-6 my-8" ref={ProfileMenuRef}>
            <HamburgerMenu isOpen={isMenuOpen} onToggle={toggleMenu} />
          </div>
          {!isLoggedIn ? (
            <div className="flex mx-6 lg:mx-0 ">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="relative cursor-pointer md:-ml-10 max-lg:hidden md:flex flex items-center justify-center gap-2 text-green-700 border-2 border-green-700 rounded-lg px-4 py-2 md:gap-0 md:px-1 lg:gap-4 lg:px-2 hover:bg-green-50 transition-colors font-medium"
              >
                <RiUser3Fill className="text-xl lg:flex md:hidden" />
                <span className="md:text-sm lg:text-lg">ورود | ثبت نام</span>
              </button>

              <button
                className="relative cursor-pointer lg:hidden md:hidden flex items-center justify-center text-green-700 border border-green-700 rounded-lg p-2"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <FiLogIn />
              </button>
            </div>
          ) : (
            <div className="flex mx-6 lg:mx-0 ">
              <button
                onClick={toggleProfileMenu}
                className={`cursor-pointer md:-ml-10  flex items-center justify-center gap-2 text-green-700  rounded-lg px-4 py-2 md:gap-0 ${isProfileMenuOpen ? "bg-green-50" : "hover:bg-green-50"} md:px-1 lg:gap-2 lg:px-2 hover:bg-green-50 transition-colors`}
              >
                <RiUser3Fill className="text-xl lg:flex md:hidden" />
                <span className="md:text-sm lg:text-lg">
                  {toPersianNumbers(`${userMobile}`)}
                </span>
                <IoIosArrowDown />
              </button>
            </div>
          )}

          {isProfileMenuOpen && <ProfleMenu />}
        </nav>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />

        <HamburgerMenuFile
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </header>
    </>
  );
}

export default Header;
