import React from 'react'

export default function Landing() {
    return (<div className="flex flex-col justify-center items-center h-screen">
        <div className="text-[60px]/8 lg:text-[100px]/10">Sophisticated</div>
        <div className="text-[60px] lg:text-[100px]">skincare</div>
        <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
            Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</p>
        <div className="hidden lg:block fixed bottom-[calc(4vh)] left-[calc(2vw)] 2xl:left-[calc(4vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
            <p>Skinstric developed an A.I. that creates a<br/>highly-personalized routine tailored to<br/>what your skin
                needs.</p></div>
    </div>)
}
