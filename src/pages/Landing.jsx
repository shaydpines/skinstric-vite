import React, { useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../components/ActionButton.jsx";
import Nav from "../components/Nav.jsx";

export default function Landing() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <Nav text={`INTRO`} />
      <div className="scale-65 xs:scale-80 sm:scale-90 md:scale-100 relative w-svw h-svh sm:overflow-hidden">
        {/*dotted squares*/}
        <div
          className={`absolute lg:hidden size-[420px] z-[-12] border-3 border-dotted border-[#A0A4AB55] left-1/2 top-1/2 -translate-1/2 rotate-45`}
        />
        <div
          className={`absolute size-[390px] z-[-11] border-3 border-dotted border-[#A0A4AB99] lg:border-[#A0A4AB] left-1/2 lg:left-0 top-1/2 -translate-1/2 rotate-45 transition-opacity duration-500 ${
            hovered === "right" ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`absolute size-[360px] lg:size-[390px] z-[-10] border-3 border-dotted border-[#A0A4AB] right-1/2 lg:right-0 bottom-1/2 translate-1/2 rotate-45 transition-opacity duration-500 ${
            hovered === "left" ? "opacity-0" : "opacity-100"
          }`}
        />

        {/*ripple borders*/}
        <div
          className={`absolute size-[420px] z-[-10] border-3 border-dotted border-[#A0A4AB99] left-0 top-1/2 -translate-1/2 rotate-45 opacity-0 transition-opacity duration-500 ${
            hovered === "left" ? "opacity-100" : "opacity-0 delay-100"
          }`}
        />
        <div
          className={`absolute size-[450px] z-[-10] border-3 border-dotted border-[#A0A4AB55] left-0 top-1/2 -translate-1/2 rotate-45 opacity-0 transition-opacity duration-500 ${
            hovered === "left" ? "opacity-100 delay-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute size-[420px] z-[-10] border-3 border-dotted border-[#A0A4AB99] right-0 bottom-1/2 translate-1/2 rotate-45 opacity-0 transition-opacity duration-500 ${
            hovered === "right" ? "opacity-100" : "opacity-0 delay-100"
          }`}
        />
        <div
          className={`absolute size-[450px] z-[-10] border-3 border-dotted border-[#A0A4AB55] right-0 bottom-1/2 translate-1/2 rotate-45 opacity-0 transition-opacity duration-500 ${
            hovered === "right" ? "opacity-100 delay-100" : "opacity-0"
          }`}
        />

        <div
          className={`hidden lg:flex absolute top-0 left-0 w-full h-full flex-col justify-between items-center`}
        >
          <Link
            to="/"
            className={`absolute left-0 top-1/2 -translate-y-1/2 pl-10 transition-opacity duration-500 ${
              hovered === "right" ? "opacity-0" : "opacity-100"
            }`}
            onMouseEnter={() => setHovered("left")}
            onMouseLeave={() => setHovered(null)}
          >
            <ActionButton
              id="discover-button"
              label="DISCOVER A.I."
              direction="left"
            />
          </Link>
          <Link
            to="/testing"
            className={`absolute right-0 top-1/2 -translate-y-1/2 pr-10 transition-opacity duration-500 ${
              hovered === "left" ? "opacity-0" : "opacity-100"
            }`}
            onMouseEnter={() => setHovered("right")}
            onMouseLeave={() => setHovered(null)}
          >
            <ActionButton
              id="take-test-button"
              label="TAKE TEST"
              direction="right"
            />
          </Link>
        </div>

        <div
          className={`flex flex-col justify-center items-center text-center h-full pt-8`}
        >
          <div
            className={`text-[60px]/8 lg:text-[100px]/10 transition-transform duration-700`}
            style={{
              transform:
                hovered === "left"
                  ? `translateX(calc(50vw - 340px))`
                  : hovered === "right"
                  ? `translateX(calc(-50vw + 340px))`
                  : "translateX(0)",
            }}
          >
            Sophisticated
          </div>
          <div
            className={`text-[60px] lg:text-[100px] transition-transform duration-700`}
            style={{
              transform:
                hovered === "left"
                  ? `translateX(calc(50vw - 220px))`
                  : hovered === "right"
                  ? `translateX(calc(-50vw + 220px))`
                  : "translateX(0)",
            }}
          >
            skincare
          </div>
          <p className="z-10 block lg:hidden w-[30ch] text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
          <div className="hidden lg:block fixed bottom-[calc(4vh)] left-[calc(2vw)] 2xl:left-[calc(4vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
            <p>
              Skinstric developed an A.I. that creates a<br />
              highly-personalized routine tailored to
              <br />
              what your skin needs.
            </p>
          </div>
          <Link to={"/testing"} className={`relative lg:hidden pt-2 scale-90`}>
            <ActionButton
              id="center-button"
              label="Enter Experience"
              weight={"semi-bold"}
              direction="right"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
