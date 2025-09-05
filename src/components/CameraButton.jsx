import React from "react";
import SpinningSquares from "./SpinningSquares";
import rounded_backdrop from "../assets/rounded_backdrop.png";
import camera from "../assets/camera.png";
import wand from "../assets/wand.png";

export default function CameraButton({ toggleModal }) {
  return (
    <>
      <div className={"relative size-[200px] m-16"}>
        <div
          className={`scale-50 md:scale-66 lg:scale-68 absolute left-1/2 top-1/2 -translate-1/2 flex justify-center items-center`}
        >
          <SpinningSquares />
        </div>
        <div
          onClick={toggleModal}
          className={`absolute left-1/2 top-1/2 -translate-1/2 rounded-full transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer`}
        >
          <img
            src={rounded_backdrop}
            className="absolute inset-0 w-full h-full rounded-full z-[-1] scale-135"
            alt="backdrop"
          />
          <img
            src={camera}
            alt={"camera"}
            className={`block rounded-full relative scale-135 transition-transform duration-500 ease-in-out`}
          />
        </div>
        <p className="absolute bottom-0 sm:top-0 sm:right-0 translate-x-1/3 sm:translate-x-3/4 md:translate-x-9/10 lg:translate-x-31/30 translate-y-1/2 sm:-translate-y-1/80 md:-translate-y-1/8 lg:-translate-y-1/5 text-sm font-normal leading-[24px]">
          ALLOW A.I.
          <br />
          TO SCAN YOUR FACE
        </p>
        <img
          src={wand}
          alt={"wand"}
          className={`hidden sm:block scale-50 md:scale-75 lg:scale-100 absolute right-0 -translate-x-2/8 md:-translate-x-1/10 lg:translate-x-1/20 translate-y-3/8 md:translate-y-1/10 lg:-translate-y-1/20 z-[-1]`}
        />
      </div>
    </>
  );
}
