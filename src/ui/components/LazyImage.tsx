import React, { useState } from "react";

export default function LazyImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      {/* Fallback: Display "Loading..." or a spinner */}
      {!isLoaded && (
        <div className="h-60 w-50 bg-neutral-400 border-2 flex items-center justify-center">
          Loading Book Cover
        </div>
      )}

      {/* The image */}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleImageLoad} // Set the state when the image is loaded
        style={{ display: isLoaded ? "block" : "none" }} // Hide image until it's loaded
      />
    </div>
  );
}
