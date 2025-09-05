import React, { useState } from "react";
import capture from "../assets/capture.png";

const CaptureButton = ({ id, label, takePhoto, weight, direction, color = "#1a1b1c" }) => {
  const [pressed, setPressed] = useState(false);

  const isLeft = direction === "left";
  const isSemiBold = weight === "semi-bold";

  const handlePressDown = () => {
    setPressed(true); // show immediately
  };

  const handlePressUp = () => {
    setPressed(false)
  };

  return (
    <button
      id={id}
      onMouseDown={handlePressDown}
      onMouseUp={handlePressUp}
      onMouseLeave={handlePressUp}
      onTouchStart={handlePressDown}
      onTouchEnd={handlePressUp}
      onClick={takePhoto}
      className={`relative flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal cursor-pointer h-9 px-3 py-1 hover:scale-105 duration-300 ease-in-out
        ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Wrapper for the image + overlay */}
      <div className="relative rounded-full overflow-hidden">
        <img
          src={capture}
          alt="take picture"
          className="block rounded-full transition ease-in-out"
        />
        {/* Overlay shown while pressed */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ease-in-out rounded-full ${
            pressed ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <span
        className={`hidden sm:block absolute top-[8px] sm:relative sm:top-0 uppercase ${
          isSemiBold && "font-semibold"
        }`}
        style={{ color }}
      >
        {label}
      </span>
    </button>
  );
};

export default CaptureButton;
