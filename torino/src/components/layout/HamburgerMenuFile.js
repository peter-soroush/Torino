import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RiHome5Line } from "react-icons/ri";
import { BsAirplane } from "react-icons/bs";
import { RxSpeakerQuiet } from "react-icons/rx";
import { LuPhone } from "react-icons/lu";
import Link from "next/link";

function HamburgerMenuFile({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="relative z-50 font-sans text-lg"
        dir="rtl"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity" />

        <div className="fixed inset-0 w-1/2 flex items-start justify-center p-4 h-screen mr-0 px-0 py-0 ">
          <DialogPanel className="h-full w-full max-w-md bg-white rounded-tl-2xl rounded-bl-2xl p-6 shadow-xl relative transition-all">
            <div className="flex flex-col gap-8 mt-10 ">
              <Link href="/">
                <div className="flex flex-row gap-4 items-center text-brandcolor hover:text-brandcolor cursor-pointer">
                  <div className="">
                    <RiHome5Line className="" size={20} />
                  </div>
                  <div>صفحه اصلی</div>
                </div>
              </Link>
              <div className="flex flex-row gap-4 items-center hover:text-brandcolor cursor-pointer">
                <div>
                  <BsAirplane
                    enableBackground={true}
                    size={20}
                    className="border-1 p-1 rounded-md hover:text-brandcolor cursor-pointer "
                  />
                </div>
                <div> خدمات گردشگری</div>
              </div>
              <div className="flex flex-row gap-4 items-center hover:text-brandcolor cursor-pointer">
                <div>
                  <RxSpeakerQuiet className="" size={20} />
                </div>
                <div> درباره ما</div>
              </div>
              <div className="flex flex-row gap-4 items-center hover:text-brandcolor cursor-pointer">
                <div>
                  <LuPhone size={20} />
                </div>
                <div> تماس با ما</div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default HamburgerMenuFile;
