"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export default function SearchPagination({ totalPages, currentPage }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      {/* دکمه صفحه قبل */}
      <button
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronRight className="text-xl" />
      </button>

      {/* تولید شماره صفحات */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => createPageURL(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-all ${
            currentPage === page
              ? "bg-brandcolor text-white border-brandcolor shadow-md"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* دکمه صفحه بعد */}
      <button
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronLeft className="text-xl" />
      </button>
    </div>
  );
}
