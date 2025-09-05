import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import NavCamera from "../components/NavWhite.jsx";
import CaptureButton from "../components/CaptureButton.jsx";
import ActionButton from "../components/ActionButton.jsx";
import SpinningSquares from "../components/SpinningSquares.jsx";
import camera from "../assets/camera.png";

export default function Camera() {
  const [imageSrc, setImageSrc] = useState(null);
  const [rawBase64, setRawBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const webcamRef = useRef(null);

  const takePhoto = () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) setImageSrc(screenshot);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
  };

  useEffect(() => {
    imageSrc && setRawBase64(imageSrc.split(",")[1]);
  }, [imageSrc]);

  useEffect(() => {
  if (webcamRef.current && webcamRef.current.video) {
    const handleLoaded = () => setLoading(false);

    webcamRef.current.video.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      webcamRef.current?.video?.removeEventListener("loadedmetadata", handleLoaded);
    };
  }
}, [webcamRef]);


  return (
    <>
      <div className="relative w-full h-screen">
        {loading &&
          <div
            className={
              "absolute top-1/2 left-1/2 -translate-1/2 scale-65 xs:scale-80 sm:scale-90 md:scale-100"
            }
          >
            <SpinningSquares />
            <div className="flex flex-col justify-center items-center">
              <img src={camera} className="scale-125 transition-opacity duration-500 ease-in-out animate-pulse mb-6" />
              <p className="uppercase text-2xl transition-opacity duration-500 ease-in-out animate-pulse">
                Setting up camera ...
              </p>
            </div>
          </div>
        } 

        {/* Fullscreen Webcam */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={"your photo"}
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            mirrored={true}
          />
        )}

        {/* Overlay */}
        <div
          className={`relative w-full h-screen z-10 ${
            loading ? "text-[#1a1b1c]" : `text-[#FCFCFC]`
          }`}
        >
          <NavCamera text={"ANALYSIS"} />
          <div className="absolute right-9 top-1/2">
            {loading ? (
              <></>
            ) : (
              !imageSrc && (
                <CaptureButton
                  label={"TAKE PICTURE"}
                  color={"#FCFCFC"}
                  takePhoto={takePhoto}
                />
              )
            )}
          </div>
          <Link
            to={"/start-analysis"}
            className={`absolute z-100 left-9 bottom-15 transition-transform duration-300 ease-in-out hover:scale-105`}
          >
            <ActionButton
              id={`Back`}
              label={`Back`}
              direction={"left"}
              color={`${loading ? "#1a1b1c" : "#FCFCFC"}`}
            />
          </Link>
          <div className="absolute hidden sm:block bottom-5 sm:bottom-8 lg:bottom-13 left-0 right-0 text-center z-20 sm:scale-80 md:scale-100 lg:scale-100">
            <p className="text-sm mb-2 font-normal leading-6">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex justify-center space-x-8 text-xs leading-6">
              <p>◇ NEUTRAL EXPRESSION</p>
              <p>◇ FRONTAL POSE</p>
              <p>◇ ADEQUATE LIGHTING</p>
            </div>
          </div>

          {imageSrc && (
            <>
              <p className="absolute left-1/2 top-2/7 -translate-1/2 text-sm mb-2 font-normal leading-6 text-[#FCFCFC]">
                Great Shot!
              </p>
              <div className="fixed z-100 bottom-15 right-9 scale-105">
                <button
                  onClick={handleReset}
                  className="mr-2 border border-solid border-[#1a1b1c] bg-[#FCFCFC] text-[#1a1b1c] p-1 uppercase cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Reset
                </button>
                <Link
                  to={"/preparing-analysis"}
                  state={{ rawBase64: rawBase64 }}
                >
                  <button className="mr-2 border border-solid border-[#1a1b1c] bg-[#1a1b1c] text-[#FCFCFC] p-1 uppercase cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                    Confirm
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
