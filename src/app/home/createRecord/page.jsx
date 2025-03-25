"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Context from "@/context/Context"; // Import the context to dispatch actions

export default function Page() {
  const router = useRouter();
  const { state, dispatch } = useContext(Context); // Get dispatch from context
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    genre: "",
    total_pages: 0,
    cover: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cover: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to send to the backend
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("total_pages", formData.total_pages);
    data.append("genre", formData.genre);
    data.append("cover", formData.cover);

    try {
      // Send data to the backend (replace with your API URL)
      const response = await fetch("/api/books", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        // Dispatch the addBook action to update the state with the new book
        dispatch({ type: "addBook", payload: result });

        // Optionally: Re-fetch the books from the server to ensure the state is always in sync with the server.
        // This ensures that we have the updated list of books from the backend.
        fetch("/api/books")
          .then((res) => res.json())
          .then((data) => {
            dispatch({ type: "dataReceived", payload: data });
            // Redirect to home after successful creation
            router.push("/home");
          })
          .catch(() => dispatch({ type: "dataFailed" }));
      } else {
        console.error("Error creating book:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto gap-10">
      <button
        onClick={() => {
          router.push("/home");
        }}
        className="w-fit bg-green-600 px-3 py-1.5 text-white font-bold text-xl rounded-lg transition-opacity transition-transform duration-300 hover:opacity-70 hover:scale-110"
      >
        Home
      </button>

      <form
        onSubmit={handleSubmit}
        className="border-1 rounded-xl p-3 flex flex-col items-center justify-center gap-3 mt-10"
      >
        <h1 className="text-center text-4xl font-bold mb-5">Create Record</h1>

        <fieldset className="p-2 w-fit flex items-center justify-center">
          <label htmlFor="title" className="w-40 text-lg font-bold">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            required
            onChange={handleInputChange}
            className="border-2 rounded-lg px-1 py-0.5 w-60 outline-0 cursor-pointer transition-all duration-300 hover:scale-110 focus:scale-105 hover:border-blue-500 focus:border-blue-500"
          />
        </fieldset>

        <fieldset className="p-2 w-fit flex items-center justify-center">
          <label htmlFor="content" className="w-40 text-lg font-bold">
            Content
          </label>
          <textarea
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="border-2  rounded-lg px-1 py-0.5 w-60 outline-0 cursor-pointer transition-transformation duration-300 hover:scale-110 focus:scale-105 hover:border-blue-500 focus:border-blue-500"
          />
        </fieldset>

        <fieldset className="p-2 w-fit flex items-center justify-center">
          <label htmlFor="genre" className="w-40 text-lg font-bold">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="border-2 rounded-lg px-1 py-0.5 w-60 outline-0 cursor-pointer transition-all duration-300 hover:scale-110 focus:scale-105 hover:border-blue-500 focus:border-blue-500"
            required
          />
        </fieldset>

        <fieldset className="p-2 w-fit flex items-center justify-center">
          <label htmlFor="cover" className="w-40 text-lg font-bold">
            Cover Image
          </label>
          <input
            type="file"
            id="cover"
            name="cover"
            onChange={handleFileChange}
            className="border-2 rounded-lg px-1 py-0.5 w-60 outline-0 cursor-pointer transition-all duration-300 hover:scale-110 focus:scale-105 hover:border-blue-500 focus:border-blue-500"
            required
          />
        </fieldset>
        <fieldset className="p-2 w-fit flex items-center justify-center">
          <label htmlFor="total_pages" className="w-40 text-lg font-bold">
            Total Pages
          </label>
          <input
            type="number"
            id="total_pages"
            name="total_pages"
            onChange={handleInputChange}
            className="border-2 rounded-lg px-1 py-0.5 w-60 outline-0 cursor-pointer transition-all duration-300 hover:scale-110 focus:scale-105 hover:border-blue-500 focus:border-blue-500"
            required
          />
        </fieldset>

        <button
          type="submit"
          className="block bg-teal-600 px-3 py-1.5 text-white font-bold text-xl rounded-lg transition-opacity transition-transform duration-300 hover:opacity-70 hover:scale-110"
        >
          Create Record
        </button>
      </form>
    </div>
  );
}
