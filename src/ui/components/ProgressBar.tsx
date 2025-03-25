import React from "react";

export default function ProgressBar({ total_pages, current_page }) {
  const progress = Math.floor(
    (Number(current_page) / Number(total_pages)) * 100
  );

  return (
    <div className="flex  gap-1.5 font-bold ">
      {" "}
      <div className=" rounded-lg  bg-neutral-500 w-80 h-fit">
        <div
          className="py-2.5 bg-green-600 rounded-lg"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <p className="">{progress}%</p>
    </div>
  );
}
