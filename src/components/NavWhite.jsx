import React from "react";
import { Link } from "react-router-dom";
import left_bracket_white from "../assets/left_bracket_white.png";
import right_bracket_white from "../assets/right_bracket_white.png";

export default function NavCamera({ text }) {
  return (
    <div className="fixed top-0 left-0 flex flex-row h-[64px] w-full justify-between py-3 mb-3 z-[1000]">
      <div className="flex flex-row pt-1 scale-75 justify-center items-center">
        <Link
          className="text-[#FCFCFC] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] z-1000"
          to="/"
        >
          SKINSTRIC
        </Link>
        <img src={left_bracket_white} alt="" style={{
            color: "#FCFCFC",
        }} />
        <p className="text-[#FCFCFC] text-sm font-semibold leading-[16px] px-1">
          {text}
        </p>
        <img src={right_bracket_white} alt="" />
      </div>
    </div>
  );
}
