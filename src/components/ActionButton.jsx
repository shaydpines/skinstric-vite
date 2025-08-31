import React from "react";

const ActionButton = ({ id, label, weight, direction }) => {
    const isLeft = direction === "left";
    const isSemiBold = weight === "semi-bold";

    return (
        <button
            id={id}
            className={`relative flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 px-3 py-1
        ${isLeft ? "flex-row" : "flex-row-reverse"}`}
        >
            <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
            <span
                className={`absolute top-[8px] scale-[0.9] group-hover:scale-105 duration-300
          ${isLeft ? "left-[19px] rotate-180" : "right-[19px] rotate-0"}`}
            >
        ▶
      </span>
            <span className={`uppercase ${isSemiBold && `font-semibold`}`}>{label}</span>
        </button>
    );
};

export default ActionButton;