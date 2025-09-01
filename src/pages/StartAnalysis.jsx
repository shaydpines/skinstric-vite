import React from 'react'
import {Link} from "react-router-dom";
import SpinningSquares from "../components/SpinningSquares.jsx";
import ActionButton from "../components/ActionButton.jsx";
import camera from "../assets/camera.png";
import gallery from "../assets/gallery.png";
import wand from "../assets/wand.png";

export default function StartAnalysis() {
    return (
        <>
            <div className="absolute top-16 left-9"><p
                className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p></div>
            <div
                className="absolute top-16 right-9 transition-opacity duration-300 opacity-100">
                <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
                <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden"></div>
            </div>
            <div
                className={"relative w-svw h-svh sm:overflow-hidden py-12 sm:pt-24 flex justify-center items-center sm:pt-0"}>
                <div className={"w-full md:mx-12 lg:mx-24 xl:mx-36 flex flex-col sm:flex-row justify-between items-center"}>
                    <div className={"relative bg-amber-200/40 size-[200px] m-16"}>
                        <div
                            className={`scale-50 lg:scale-68 absolute left-1/2 top-1/2 -translate-1/2 flex justify-center items-center`}>
                            <SpinningSquares slowSeconds={0}/>
                        </div>
                        <img src={camera} alt={"camera"} className={`absolute left-1/2 top-1/2 -translate-1/2`}/>
                        <p className="absolute bottom-0 sm:top-0 sm:right-0 translate-x-1/3 sm:translate-x-4/5 translate-y-1/2 sm:translate-y-0 text-sm font-normal leading-[24px]">ALLOW
                            A.I.<br/>TO
                            SCAN YOUR FACE
                        </p>
                        <img src={wand} alt={"wand"} className={`hidden sm:block scale-50 lg:scale-100 absolute right-0 -translate-x-2/8 lg:translate-x-1/20 translate-y-3/8 lg:-translate-y-1/20 z-[-1]`}/>
                    </div>
                    <div className={"relative bg-amber-200/40 size-[200px] m-16"}>
                        <div
                            className={`scale-50 lg:scale-68 absolute left-1/2 top-1/2 -translate-1/2 flex justify-center items-center`}>
                            <SpinningSquares slowSeconds={0}/>
                        </div>
                        <img src={gallery} alt={"camera"} className={`absolute left-1/2 top-1/2 -translate-1/2`}/>
                        <p className="absolute bottom-0 translate-x-1/3 sm:-translate-x-3/4 translate-y-1/2 sm:translate-y-0 text-sm sm:text-right font-normal leading-[24px]">ALLOW
                            A.I.<br/>ACCESS GALLERY
                        </p>
                        <img src={wand} alt={"wand"} className={`hidden sm:block scale-50 lg:scale-100 absolute rotate-180 translate-x-2/8 lg:-translate-x-1/20 bottom-0 -translate-y-3/8 lg:translate-y-1/20 z-[-1]`}/>
                    </div>
                </div>
            </div>
            <Link to={`/`} className={`fixed bottom-15 left-9 scale-125`}>
                <ActionButton id={`Back`} label={`Back`} direction={"left"}/>
            </Link>
        </>
    )
}
