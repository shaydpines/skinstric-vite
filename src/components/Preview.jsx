import React from "react";

export default function Preview({ imageUrl, loading }) {
  return (
    <div className="hidden xs:block absolute top-16 right-9 transition-opacity duration-300 opacity-100">
      <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
      <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden">
        {imageUrl && !loading && (
          <img
            src={imageUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
