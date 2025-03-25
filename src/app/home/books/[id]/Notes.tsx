import SearchBar from "@/ui/components/SearchBar";
import { useState } from "react";

export default function MyNotes({ data }) {
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState("");
  function handleChange(e) {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearchedTerm(searchTerm);
    const notes = data.filter((note) =>
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedNotes(notes);
  }
  const handleShowAll = () => {
    setSearchedTerm("");
    setSearchedNotes([]);
  };
  const displayedNotes = searchedTerm === "" ? data : searchedNotes;

  return (
    <>
      {/* <h1 className="text-3xl font-bold text-center mt-5">My Notes</h1> */}
      <div className="flex items-center justify-center mt-10 gap-10">
        <SearchBar
          center={false}
          searchedTerm={searchedTerm}
          handleChange={handleChange}
        />
        <button
          onClick={handleShowAll}
          className=" py-1.5 px-5 bg-blue-500 font-bold text-xl rounded-lg shadow-2xs  text-white transition-all duration-300 hover:opacity-70 hover:scale-110"
        >
          show All
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden m-10">
        <thead className="bg-neutral-800 text-white">
          <tr>
            <th className="py-3 px-6 text-xl border-r-2 text-left w-20">
              Page
            </th>
            <th className="py-3 px-6 text-xl border-r-2 text-left">
              Note Content
            </th>
            <th className="py-3 px-6 text-xl text-left w-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedNotes.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
              }`}
            >
              <td className="py-3 px-6 border-r-2 border-gray-800">
                {row.page}
              </td>
              <td className="py-3 px-6 border-r-2 border-gray-800">
                {row.content}
              </td>
              <td className="py-3 px-6 border-r-2 border-gray-800">
                <div className="flex justify-center items-center gap-10">
                  <button className="py-1.5 px-5 bg-green-500 font-bold text-xl rounded-lg text-white transition-all duration-300 hover:opacity-70 hover:scale-110">
                    Update
                  </button>
                  <button className="py-1.5 px-5 bg-red-500 font-bold text-xl rounded-lg text-white transition-all duration-300 hover:opacity-70 hover:scale-110">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr key={"add"} className={" bg-gray-100 "}>
            <td className="py-3 px-6  border-gray-800 "></td>
            <td className="py-3 px-6  border-gray-800 ">
              <textarea className="border-2 w-11/12 text-xl" />
            </td>
            <td className=" py-3 px-6 flex items-center  justify-center ">
              <button className="mt-3 py-1.5 px-5 bg-blue-500 font-bold text-xl rounded-lg  text-white transition-all duration-300 hover:opacity-70 hover:scale-110">
                add Note
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
