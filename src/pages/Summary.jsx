import React, {useEffect, useRef} from 'react'
import {useLocation} from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import ProgressRing from "../components/ProgressRing.jsx";

export default function Summary() {
    const location = useLocation();
    const data = useRef(null);

    useEffect(() => {
        console.log(`summary`)
        data.current = location.state?.data
        setTimeout(() => {
            console.log(data.current)
        }, 1000)
    }, [location.state?.data])

    return (<>
            <Nav text={`ANALYSIS`}/>
            <Header text={`A.I. ANALYSIS`}/>
            <div className={`px-9`}>
                <h3 className="mt-24 text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
                    DEMOGRAPHICS
                </h3>
                <h4 className="text-sm md:mt-4 leading-[24px]">
                    PREDICTED RACE &amp; AGE
                </h4>
                <div className={`bg-blue-200 w-full flex flex-row justify-between mt-16`}>
                    <div className={`w-[15%] h-[300px]`}>
                        <div className={`bg-[#F3F3F4] w-full h-[60px] border-t-[#1a1b1c] border-t-[1px]`}></div>
                        <div className={`bg-[#F3F3F4] w-full h-[60px] mt-2 border-t-[#1a1b1c] border-t-[1px]`}></div>
                        <div className={`bg-[#F3F3F4] w-full h-[60px] mt-2 border-t-[#1a1b1c] border-t-[1px]`}></div>
                    </div>
                    <div className={`relative bg-[#F3F3F4] w-[55%] h-[300px] sm:h-[400px] md:h-[420px] lg:h-[500px] mx-2 border-t-[#1a1b1c] border-t-[1px]`}>
                        <p className="absolute z-1 text-[24px] sm:text-[36px] md:text-[40px] mb-2 left-5 top-2">Middle
                            eastern</p>
                        <div className={`absolute bottom-5 right-1/2 md:right-5 translate-x-1/2 md:translate-x-0`} >
                            <ProgressRing className={`xs:size-[200px] sm:size-[275px] md:size-[300px] lg:size-[400px]`} percent={75}/>
                        </div>
                    </div>
                    <div className={`bg-[#F3F3F4] w-[30%] h-[300px] border-t-[#1a1b1c] border-t-[1px]`}></div>
                </div>
            </div>
        </>
    )
}
