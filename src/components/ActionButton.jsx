import React from "react";

const ActionButton = ({ id, label, weight, position }) => {
    const isLeft = position === "left";
    const isRight = position === "right";
    const isCenter = position === "center";
    const isBold = weight === "bold";
    const isSemiBold = weight === "semi-bold";

    return (
        <button
            id={id}
            className={`inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 px-3 py-1 absolute top-1/2 -translate-y-1/2
        ${isLeft ? "left-10 flex-row" : ""}
        ${isRight ? "right-10 flex-row-reverse" : ""}
        ${isCenter ? "left-1/2 -translate-x-1/2 flex-row-reverse" : ""}`}
        >
            <div className="w-[28px] h-[28px] border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
            <span
                className={`absolute top-[8px] scale-[0.9] group-hover:scale-105 duration-300
          ${isLeft ? "left-[19px] rotate-180" : "right-[19px]"}`}
            >
        ▶
      </span>
            {/* Label */}
            <span className={`uppercase ${isSemiBold && `font-semibold`}`}>{label}</span>
        </button>
    );
};

export default ActionButton;
