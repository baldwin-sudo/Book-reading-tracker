"use client";
import Context from "@/context/Context";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import BookDetails from "./BookDetails";
import MyNotes from "./Notes";

export default function Page({ params }) {
  // Get book ID from URL params
  const { id } = params;
  const bookId = Number(id);

  const router = useRouter();
  const { state } = useContext(Context);
  const { books } = state;

  // Find the book using the id
  const book = books.find((book) => book.id === bookId);

  const [showNotes, setShowNotes] = useState(false);

  const data = [
    { id: 1, page: 10, content: "a" },
    { id: 2, page: 10, content: "b" },
    { id: 3, page: 10, content: "c" },
  ];

  return (
    <>
      {!book ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="text-5xl font-bold text-center bg-neutral-400 w-fit mx-auto px-6 py-3 text-white rounded-lg">
            {book?.title || "Unknown Book"}
          </h1>
          <div className="flex gap-10 w-fit mt-10 mx-auto">
            <button
              onClick={() => router.push("/home")}
              className="bg-green-600 px-3 py-0.5 text-white font-bold text-xl rounded-lg transition-opacity transition-transform duration-300 hover:opacity-70 hover:scale-110"
            >
              Go Home
            </button>
            <button
              onClick={() => setShowNotes(false)}
              className="bg-amber-500 py-1.5 px-3 rounded-lg text-xl font-bold transition-transform transition-opacity *:duration-300 hover:opacity-70 hover:scale-110"
              disabled={!showNotes}
              style={{ border: !showNotes ? "black solid" : "" }}
            >
              Details
            </button>
            <button
              onClick={() => setShowNotes(true)}
              className="bg-amber-500 py-1.5 px-3 rounded-lg text-xl font-bold transition-opacity transition-transform duration-300 hover:opacity-70 hover:scale-110"
              disabled={showNotes}
              style={{ border: showNotes ? "black solid" : "" }}
            >
              My Notes
            </button>
          </div>
          {showNotes ? (
            <MyNotes data={data} />
          ) : (
            <BookDetails book={book} id={id} />
          )}
        </div>
      )}
    </>
  );
}
