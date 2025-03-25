import React from "react";
import BookCardSkeleton from "./BookCardSkeleton"; // Assuming the skeleton for individual book card is in a separate file.

export default function BooksListSkeleton() {
  return (
    <div className="border-red flex flex-wrap gap-17 justify-center p-8">
      {/* Display skeletons for multiple books */}
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
    </div>
  );
}
