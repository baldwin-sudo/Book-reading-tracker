"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Context from "@/context/Context";

export default function Home() {
  const { state } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      router.push("/home");
    }
  }, [state.status, router]); // Redirect when status is "error"

  return (
    <div className="flex flex-col items-center">
      {state.status === "loading" && <p>Loading records...</p>}
      {state.status === "error" && <p>Error fetching data</p>}
    </div>
  );
}
