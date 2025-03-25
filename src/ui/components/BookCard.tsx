"use client";
import { title } from "process";
import React, { Suspense, useCallback } from "react";
import ProgressBar from "./ProgressBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import LazyImage from "./LazyImage";
export default function BookCard({ book }) {
  const router = useRouter();

  const {
    id,
    title,
    genre,
    book_url,

    status,
    total_pages,
    current_page,
    start_date,
    finish_date,
  } = book;
  const colors = {
    "to-read": "blue",
    reading: "red",
    finished: "green",
  };
  const handleDetails = () => {
    router.push(`/home/books/${book.id}`);
  };
  return (
    <div
      onClick={handleDetails}
      className="cursor-pointer relative rounded-lg bg-white shadow-xl flex flex-col justify-center items-center gap-5   flex-2/7  grow-0  p-5  transition-all duration-300 hover:scale-105 "
    >
      <p
        className="absolute top-0 right-0 px-3 py-1.5 rounded-tr-lg rounded-bl-lg text-white font-bold "
        style={{
          backgroundColor: colors[status] || "gray", // Default to gray if status is not found
        }}
      >
        {status}
      </p>
      <h1 className="text-center text-xl font-bold underline">{title}</h1>

      <LazyImage src={book_url} alt="book img" className="border-2 w-50 h-60" />

      <div className="mt-2 flex flex-col gap-5 items-center justify-center">
        <ProgressBar current_page={current_page} total_pages={total_pages} />
        <div className="flex gap-10">
          <button
            onClick={handleDetails}
            className="bg-blue-600 font-bold text-white px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-75 hover:scale-110"
          >
            Details
          </button>

          <button className="bg-orange-500 font-bold text-white px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-75 hover:scale-110">
            Go read
          </button>
        </div>
      </div>
    </div>
  );
}
