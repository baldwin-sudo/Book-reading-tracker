import ProgressBar from "@/ui/components/ProgressBar";
import { useState, useCallback, useContext, useEffect } from "react";
import debounce from "lodash/debounce";
import Context from "@/context/Context";

export default function BookDetails({ book, id }: { book: any; id: string }) {
  const colors = {
    "to-read": "blue",
    reading: "red",
    finished: "green",
  };

  const { state, dispatch } = useContext(Context);

  // Find the current book from the global state
  const currentBook = state.books.find((b) => b.id === id) || book;

  const [current_page, setCurrentPage] = useState(currentBook.current_page);
  const [status, setStatus] = useState(currentBook.status);

  // Update local state when global state changes
  useEffect(() => {
    const updatedBook = state.books.find((b) => b.id === id);
    if (updatedBook) {
      setCurrentPage(updatedBook.current_page);
      setStatus(updatedBook.status);
    }
  }, [state.books, id]);

  const debouncedUpdateBook = useCallback(
    debounce(async (newCurrentPage: number, newStatus: string) => {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("current_page", newCurrentPage.toString());
        formData.append("status", newStatus);

        const response = await fetch(`/api/books/`, {
          method: "PUT",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update book");
        }

        const result = await response.json();

        // Dispatch update to global state
        dispatch({
          type: "updateBook",
          payload: {
            id,
            updates: {
              current_page: newCurrentPage,
              status: newStatus,
            },
          },
        });
      } catch (error) {
        // Revert to the book's original state from global state
        const originalBook = state.books.find((b) => b.id === id);
        if (originalBook) {
          setCurrentPage(originalBook.current_page);
          setStatus(originalBook.status);
        }
      }
    }, 1000),
    [id, dispatch, state.books]
  );

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = Number(e.target.value);

    let newStatus = status;
    if (newPage > 0 && newPage < currentBook.total_pages) {
      newStatus = "reading";
    } else if (newPage >= currentBook.total_pages) {
      newStatus = "finished";
    }

    // Immediately update local state
    setCurrentPage(newPage);
    setStatus(newStatus);

    // Trigger debounced update
    debouncedUpdateBook(newPage, newStatus);
  };

  return (
    <div className="mt-20 flex flex-col justify-center items-center lg:flex-row gap-10 lg:gap-30 pb-10">
      <img
        src={currentBook.book_url}
        alt="book img"
        className="border-2 w-80 h-100"
      />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl underline font-bold">Book Info :</h1>
        {/* ... rest of the component remains the same ... */}
        <p className="text-lg">{book.content}</p>
        <p>
          <span className="font-bold text-xl">Current Page : </span>
          <input
            type="number"
            value={current_page}
            min="0"
            max={currentBook.total_pages}
            className="border-2 w-20 text-center px-2 rounded-lg"
            onChange={handlePageChange}
          />
        </p>
        <ProgressBar
          current_page={current_page}
          total_pages={currentBook.total_pages}
        />
        <p>
          <span className="font-bold text-xl">Status : </span>
          <span
            className="inline px-3 py-1.5 rounded-lg text-white font-bold"
            style={{
              backgroundColor: colors[status as keyof typeof colors] || "gray",
            }}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
}
