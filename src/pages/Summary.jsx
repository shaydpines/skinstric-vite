import React, {useEffect, useRef, useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import DemographicList from "../components/DemographicList.jsx";
import ActionButton from "../components/ActionButton.jsx";

export default function Summary() {
    const location = useLocation();
    const data = useRef(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        console.log(`summary`)
        data.current = location.state?.data
        setTimeout(() => {
            console.log(data.current)
        }, 10)
    }, [location.state?.data])

    useEffect(() => {
        setCategory('race')
    }, [])

    return (<>
            <Nav text={`ANALYSIS`}/>
            <Header text={`A.I. ANALYSIS`}/>
            <div className={`px-9`}>
                <h3 className="mt-20 text-4xl md:text-5xl font-normal leading-[64px] tracking-tighter">
                    DEMOGRAPHICS
                </h3>
                <h4 className="text-sm leading-[24px]">
                    PREDICTED RACE &amp; AGE
                </h4>
                <div
                    className={`w-full flex flex-col md:flex-row justify-between items-center md:items-start mt-10 mb-32`}>
                    <div className={`w-full md:w-[15%]`}>
                        <div
                            onClick={() => setCategory('race')}
                            className={`w-full border-t-[#1a1b1c] border-t-[1px] ${category === 'race' ? `bg-[#1a1b1c] text-white` : `bg-[#F3F3F4] hover:bg-[#E1E1E2] cursor-pointer`}`}>
                            <div className={`p-2 mb-2`}>
                                <p className={`uppercase mb-2 font-medium leading-[24px]`}>Southeast Asian</p>
                                <p className={`uppercase font-medium leading-[24px]`}>Race</p>
                            </div>
                        </div>
                        <div
                            onClick={() => setCategory('age')}
                            className={`w-full border-t-[#1a1b1c] border-t-[1px] ${category === 'age' ? `bg-[#1a1b1c] text-white` : `bg-[#F3F3F4] hover:bg-[#E1E1E2] cursor-pointer`}`}>
                            <div className={`p-2 mb-2`}>
                                <p className={`uppercase mb-2 font-medium leading-[24px]`}>30-39</p>
                                <p className={`uppercase font-medium leading-[24px]`}>Age</p>
                            </div>
                        </div>
                        <div
                            onClick={() => setCategory('gender')}
                            className={`w-full border-t-[#1a1b1c] border-t-[1px] ${category === 'gender' ? `bg-[#1a1b1c] text-white` : `bg-[#F3F3F4] hover:bg-[#E1E1E2] cursor-pointer`}`}>
                            <div className={`p-2 mb-2`}>
                                <p className={`uppercase mb-2 font-medium leading-[24px]`}>Female</p>
                                <p className={`uppercase font-medium leading-[24px]`}>Sex</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`relative bg-[#F3F3F4] w-full m-2 md:my-0 border-t-[#1a1b1c] border-t-[1px] flex flex-col justify-between items-center md:items-start`}>
                        <p className="z-1 text-[30px] xs:text-[40px] mb-2 md:ml-5 mt-2">Middle
                            eastern</p>
                        <div className={`mb-5 px-5 md:w-full md:flex md:justify-end`}>
                            <ProgressRing className={`size-[200px] xs:size-[320px] md:size-[350px] lg:size-[400px]`}
                                          percent={75}/>
                        </div>
                    </div>
                    <div
                        className={`bg-[#F3F3F4] md:self-stretch min-w-full md:min-w-[200px] border-t-[#1a1b1c] border-t-[1px]`}>
                        <div className={`p-4 flex justify-between items-center`}>
                            <div className={`mr-2 capitalize`}>{category === 'gender' ? 'sex' : category}</div>
                            <div>AI Confidence</div>
                        </div>
                        <DemographicList data={data.current} category={category}/>
                    </div>
                </div>
                <Link to={`/select`} className={`fixed bottom-15 left-9 scale-125`}>
                    <ActionButton id={`Back`} label={`Back`} direction={"left"}/>
                </Link>
                <Link to={`/`} state={{data: data.current}} className={`fixed bottom-15 right-9 scale-125`}>
                    <ActionButton id={`Home`} label={`Home`} direction={`right`}/>
                </Link>
            </div>
        </>
    )
}
