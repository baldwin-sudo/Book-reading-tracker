"use client";
import { useContext, useState, useEffect } from "react";
import Context from "@/context/Context";
import BooksList from "@/ui/components/BooksList";
import SearchBar from "@/ui/components/SearchBar";
import { useRouter } from "next/navigation";
import BooksListSkeleton from "@/ui/components/BooksLIstSkeleton";
export default function Page() {
  const router = useRouter();
  const {
    state: { status, books },
    dispatch,
  } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term);
    const searchResults = books.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchedBooks(searchResults);
  };

  // Check if books are empty (or loading)
  const isBooksEmpty = books === null;

  return (
    <div className="">
      <div className="flex items-center justify-center gap-10">
        <SearchBar
          center={false}
          searchedTerm={searchTerm}
          handleChange={handleChange}
        />
        <button
          onClick={() => {
            router.push("/home/createRecord");
          }}
          className="bg-teal-600 px-3 py-1.5 text-white font-bold text-xl rounded-lg transition-opacity transition-transform duration-300 hover:opacity-70 hover:scale-110"
        >
          Create record
        </button>
      </div>

      {/* Display Skeleton if books array is empty, else display the BooksList */}
      {isBooksEmpty ? (
        <BooksListSkeleton />
      ) : (
        <BooksList books={searchTerm === "" ? books : searchedBooks} />
      )}
    </div>
  );
}
