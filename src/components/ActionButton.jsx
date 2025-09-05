import React from "react";

const ActionButton = ({ id, label, weight, direction, color = "#1a1b1c" }) => {
  const isLeft = direction === "left";
  const isSemiBold = weight === "semi-bold";

  return (
    <button
      id={id}
      className={`relative flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal cursor-pointer h-9 px-3 py-1 hover:scale-105 duration-300 ease-in-out
        ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className={`w-[40px] sm:w-[30px] h-[40px] sm:h-[30px] border border-solid rotate-45 cursor-pointer`}
        style={{ borderColor: color }}
      ></div>

      <span
        className={`hidden sm:block absolute top-[8px] ${
          isLeft ? "left-[19px] rotate-180" : "right-[19px] rotate-0"
        }`}
        style={{ color }}
      >
        ▶
      </span>

      <span
        className={`absolute top-[8px] sm:relative sm:top-0 uppercase ${
          isSemiBold && `font-semibold`
        }`}
        style={{ color }}
      >
        {label}
      </span>
    </button>
  );
};

export default ActionButton;
