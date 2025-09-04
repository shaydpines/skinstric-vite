import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import DemographicList from "../components/DemographicList.jsx";
import ActionButton from "../components/ActionButton.jsx";

export default function Summary() {
  const location = useLocation();
  const data = useRef(null);
  const [category, setCategory] = useState(null);
  const [circleName, setCircleName] = useState("Name");
  const [circlePercent, setCirclePercent] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState(["", "", ""]);

  const categoryIndexMap = { race: 0, age: 1, gender: 2 };

  const handleSelect = (cat, name, percent) => {
    // Always update selectedAttributes
    const index = categoryIndexMap[cat];
    setSelectedAttributes((prev) =>
      prev.map((item, i) => (i === index ? name : item))
    );

    // Update the circle immediately if this is the active tab
    if (cat === category) {
      setCircleName(name);
      setCirclePercent(percent);
    }
  };

  useEffect(() => {
    data.current = location.state?.data;
  }, [location.state?.data]);

  // Default to race tab on mount
  useEffect(() => {
    setCategory("race");
  }, []);

  // Keep the circle in sync with the active tab
  useEffect(() => {
    if (!category) return;

    const index = categoryIndexMap[category];
    const selectedName = selectedAttributes[index];

    if (selectedName && data.current?.[category]) {
      const value = data.current[category][selectedName];
      if (value !== undefined) {
        setCircleName(selectedName);
        setCirclePercent(Math.round(value * 100));
      }
    }
  }, [category, selectedAttributes]);

  return (
    <>
      <Nav text={`ANALYSIS`} />
      <Header text={`A.I. ANALYSIS`} />
      <div className={`px-9`}>
        <h3 className="mt-20 text-4xl md:text-5xl font-normal leading-[64px] tracking-tighter">
          DEMOGRAPHICS
        </h3>
        <h4 className="text-sm leading-[24px]">PREDICTED RACE &amp; AGE</h4>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start mt-10 mb-32">
          {/* Sidebar */}
          <div className={`w-full md:w-[15%]`}>
            <div
              onClick={() => setCategory("race")}
              className={`w-full border-t-[#1a1b1c] border-t-[1px] ${
                category === "race"
                  ? `bg-[#1a1b1c] text-white`
                  : `bg-[#F3F3F4] hover:bg-[#E1E1E2] cursor-pointer`
              }`}
            >
              <div className={`p-2 mb-2`}>
                <p className={`uppercase mb-2 font-medium leading-[24px]`}>
                  {selectedAttributes[0]}
                </p>
                <p className={`uppercase font-medium leading-[24px]`}>Race</p>
              </div>
            </div>
            <div
              onClick={() => setCategory("age")}
              className={`w-full border-t-[#1a1b1c] border-t-[1px] ${
                category === "age"
                  ? `bg-[#1a1b1c] text-white`
                  : `bg-[#F3F3F4] hover:bg-[#E1E1E2] cursor-pointer`
              }`}
            >
              <div className={`p-2 mb-2`}>
                <p className={`uppercase mb-2 font-medium leading-[24px]`}>
                  {selectedAttributes[1]}
                </p>
                <p className={`uppercase font-medium leading-[24px]`}>Age</p>
              </div>
            </div>
            <div
              onClick={() => setCategory("gender")}
              className={`w-full border-t-[#1a1b1c] border-t-[1px] ${
                category === "gender"
                  ? `bg-[#1a1b1c] text-white`
                  : `bg-[#F3F3F4] hover:bg-[#E1E1E2] cursor-pointer`
              }`}
            >
              <div className={`p-2 mb-2`}>
                <p className={`uppercase mb-2 font-medium leading-[24px]`}>
                  {selectedAttributes[2]}
                </p>
                <p className={`uppercase font-medium leading-[24px]`}>Sex</p>
              </div>
            </div>
          </div>

          {/* Circle */}
          <div className="relative bg-[#F3F3F4] w-full m-2 sm:my-0 sm:self-stretch border-t-[#1a1b1c] border-t-[1px] flex flex-col justify-between items-center sm:items-start">
            <p className="z-1 text-[30px] xs:text-[40px] mb-2 sm:mx-5 mt-2 capitalize">
              {circleName}
            </p>
            <div className={`p-5 sm:w-full sm:flex sm:justify-end`}>
              <ProgressRing
                className={`size-[200px] xs:size-[300px] sm:size-[208px] md:size-[320px] lg:size-[350px]`}
                percent={circlePercent}
              />
            </div>
          </div>

          {/* Demographic List */}
          <div className="bg-[#F3F3F4] sm:self-stretch min-w-full sm:min-w-[200px] m-2 sm:m-0 border-t-[#1a1b1c] border-t-[1px]">
            <div className={`p-4 flex justify-between items-center`}>
              <div className={`mr-2 capitalize`}>
                {category === "gender" ? "sex" : category}
              </div>
              <div>AI Confidence</div>
            </div>
            <DemographicList
              data={data.current}
              category={category}
              handleSelect={handleSelect}
              selectedAttributes={selectedAttributes}
            />
          </div>
        </div>

        {/* Buttons */}
        <Link to={`/select`} className={`fixed bottom-15 left-9 scale-125`}>
          <ActionButton id={`Back`} label={`Back`} direction={"left"} />
        </Link>
        <Link
          to={`/`}
          state={{ data: data.current }}
          className={`fixed bottom-15 right-9 scale-125`}
        >
          <ActionButton id={`Home`} label={`Home`} direction={`right`} />
        </Link>
      </div>
    </>
  );
}
