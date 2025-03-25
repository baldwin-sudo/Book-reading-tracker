import React from "react";

export default function BookCardSkeleton() {
  return (
    <div className="w-100 h-120 border-2 bg-gray-300 animate-pulse rounded-lg flex flex-col justify-center items-center gap-5 p-5">
      {/* Placeholder for status badge */}
      <div className="absolute top-0 right-0 px-3 py-1.5 rounded-tr-lg rounded-bl-lg bg-gray-400 text-white font-bold">
        {/* Placeholder for status text */}
      </div>

      {/* Placeholder for book title */}
      <div className="h-6 bg-gray-400 w-3/4 mb-2 rounded"></div>

      {/* Placeholder for image */}
      <div className="h-48 w-full bg-gray-400 rounded-t-md"></div>

      {/* Placeholder for progress bar */}
      <div className="w-3/4 h-2 bg-gray-400 rounded mt-2"></div>

      {/* Placeholder for buttons */}
      <div className="flex gap-4 mt-4">
        <div className="h-10 w-20 bg-gray-400 rounded-lg"></div>
        <div className="h-10 w-20 bg-gray-400 rounded-lg"></div>
      </div>
    </div>
  );
}
