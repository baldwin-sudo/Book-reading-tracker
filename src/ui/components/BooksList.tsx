import React, { Suspense } from "react";
import BookCard from "./BookCard";

export default function BooksList({ books }) {
  return (
    <div className="border-red flex flex-wrap gap-17 justify-center   p-8">
      {books.map(function (book, index) {
        return <BookCard key={book.id} book={book} />;
      })}
    </div>
  );
}
