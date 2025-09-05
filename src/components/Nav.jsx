import React from "react";
import { Link } from "react-router-dom";
import left_bracket from "../assets/left_bracket.png";
import right_bracket from "../assets/right_bracket.png";

export default function Nav({ text, background }) {
  return (
    <div className={`fixed top-0 left-0 flex flex-row h-[64px] w-full justify-between py-3 mb-3 z-[1000] ${background && `bg-${background}`}`}>
      <div className="flex flex-row pt-1 scale-75 justify-center items-center">
        <Link
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-1000"
          to="/"
        >
          SKINSTRIC
        </Link>
        <img src={left_bracket} alt="" />
        <p className="text-[#1a1b1c83] text-sm font-semibold leading-[16px] px-1">
          {text}
        </p>
        <img src={right_bracket} alt="" />
      </div>
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold  transition-colors  disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
        ENTER CODE
      </button>
    </div>
  );
}
