import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import DemographicList from "../components/DemographicList.jsx";
import ActionButton from "../components/ActionButton.jsx";

export default function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [category, setCategory] = useState(null);
  const [circleName, setCircleName] = useState(null);
  const [circlePercent, setCirclePercent] = useState(null);
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

  const resetData = () => {
    const categories = ["race", "age", "gender"];
    categories.forEach((cat) => {
      const catEntries = Object.entries(data[cat] || {});
      if (!catEntries.length) return;

      // pick highest %
      const [name, value] = catEntries.reduce((max, curr) =>
        curr[1] > max[1] ? curr : max
      );

      handleSelect(cat, name, Math.round(value * 100));
    });
  };

  const backOut = () => {
    resetData();
    navigate('/select', {state: { data: data, selectedAttributes: selectedAttributes }})
  }

  useEffect(() => {
    setData(location.state?.data);

    const savedAttrs = location.state?.savedAttributes;

    if (Array.isArray(savedAttrs) && savedAttrs.some((attr) => attr !== "")) {
      setTimeout(() => {
        setSelectedAttributes(savedAttrs);
      }, 1);
    }
  }, [location.state]);

  // Default to race tab on mount
  useEffect(() => {
    setCategory("race");
  }, []);

  // Keep the circle in sync with the active tab
  useEffect(() => {
    if (!category) return;

    const index = categoryIndexMap[category];
    const selectedName = selectedAttributes[index];

    if (selectedName && data[category]) {
      const value = data[category][selectedName];
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

        <p className="sm:absolute sm:bottom-28 md:bottom-15 sm:left-1/2 sm:-translate-x-1/2 text-center mt-10 pb-1 sm:mt-0 text-[#A0A4AB] sm:text-sm md:text-base font-normal leading-[24px]">
          If A.I. estimate is wrong, select the correct one.
        </p>
        <div className="sm:mt-10">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start">
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
                data={data}
                category={category}
                handleSelect={handleSelect}
                selectedAttributes={selectedAttributes}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          onClick={backOut}
          className={`fixed bottom-15 left-9 scale-105`}
        >
          <ActionButton id={`Back`} label={`Back`} direction={"left"} />
        </div>
        <div className="fixed bottom-15 right-9 scale-105">
          <button
            onClick={resetData}
            className="mr-2 border border-solid border-[#1a1b1c] bg-white p-1 uppercase cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Reset
          </button>
          <Link
            to={`/select`}
            state={{ data: data, selectedAttributes: selectedAttributes }}
          >
            <button className="mr-2 border border-solid border-[#1a1b1c] bg-[#1a1b1c] text-white p-1 uppercase cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
