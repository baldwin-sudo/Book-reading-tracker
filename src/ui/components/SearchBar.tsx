import React from "react";

export default function SearchBar({ center, searchedTerm, handleChange }) {
  return (
    <input
      type="text"
      placeholder="Search ..."
      value={searchedTerm}
      onChange={handleChange}
      className=" shadow-lg w-100  block  text-2xl py-1.5 px-3 rounded-lg bg-white outline-0 cursor-pointer  transition-all duration-300 hover:scale-110 focus:scale-110"
      style={{ margin: center ? "auto" : "" }}
    />
  );
}
