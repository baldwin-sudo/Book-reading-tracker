"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useReducer, useEffect } from "react";

const Context = createContext();

const initialState = {
  status: "loading", //
  books: [], // Books will be loaded in useEffect
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      localStorage.setItem("books", JSON.stringify(action.payload)); // Store the data
      return {
        ...state,
        status: "success",
        books: action.payload,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "dataUpdated":
      localStorage.setItem("books", JSON.stringify(action.payload)); // ✅ Save to localStorage
      return { ...state, books: action.payload };
    case "updateBook":
      const updatedBooks = state.books.map((book) =>
        book.id === action.payload.id
          ? { ...book, ...action.payload.updates }
          : book
      );

      // Save updated books to localStorage
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      return {
        ...state,
        books: updatedBooks,
      };
    case "addBook":
      return {
        ...state,
        books: [...state.books, action.payload], // Add the new book to the existing books
      };
    default:
      return state;
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, [router]); // Only runs on mount

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Context;
