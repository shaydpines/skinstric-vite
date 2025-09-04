import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import ActionButton from "../components/ActionButton.jsx";

export default function Select() {
  const location = useLocation();
  const data = useRef(null);
  const [savedAttributes, setSavedAttributes] = useState(["", "", ""]);

  useEffect(() => {
  if (location.state?.data) {
    data.current = location.state.data;
  }
}, [location.state?.data]);
  
useEffect(() => {
  if (location.state?.selectedAttributes) {
    setSavedAttributes(location.state.selectedAttributes);
  }
}, [location.state?.selectedAttributes]);


  const waveRefs = useRef([]);
  const [hovered, setHovered] = useState(null);

  const restartWave = () => {
    waveRefs.current.forEach((el) => {
      if (!el) return;
      el.classList.remove("wave");
      void el.offsetWidth;
      el.classList.add("wave");
    });
  };

  const handleEnter = (index) => {
    setHovered(index);
    restartWave();
  };

  const handleLeave = () => {
    setHovered(null);
  };

  const buttons = [
    { label: "DEMOGRAPHICS", shift: "-translate-x-2 -translate-y-2" }, // top-left
    { label: "COSMETIC\nCONCERNS", shift: "translate-x-2 -translate-y-2" }, // top-right
    { label: "SKIN TYPE\nDETAILS", shift: "-translate-x-2 translate-y-2" }, // bottom-left
    { label: "WEATHER", shift: "translate-x-2 translate-y-2" }, // bottom-right
  ];

  return (
    <>
      <Nav text={`ANALYSIS`} />
      <Header text={`A.I. ANALYSIS`} />
      <p className="absolute left-9 top-20 text-xs md:text-sm mt-1 text-muted-foreground uppercase leading-[24px]">
        A.I. has estimated the following.
        <br />
        Fix estimated information if needed.
      </p>

      <div className="scale-65 xs:scale-75 sm:scale-100 relative w-svw h-svh sm:overflow-hidden">
        {/* Dotted expanding squares */}
        {[
          { base: 450, expanded: 480, opacity: 0, z: -12, color: "#A0A4AB55" },
          {
            base: 420,
            expanded: 450,
            opacity: 0.7,
            z: -11,
            color: "#A0A4AB99",
          },
          { base: 390, expanded: 420, opacity: 0.7, z: -10, color: "#A0A4AB" },
          {
            base: 322,
            expanded: 390,
            opacity: 0,
            opacity2: 1,
            z: -10,
            color: "#A0A4AB",
          },
        ].map((s, i) => (
          <div
            key={i}
            ref={(el) => (waveRefs.current[i] = el)}
            style={{
              "--size-base": `${s.base}px`,
              "--size-expanded": `${s.expanded}px`,
              "--opacity-expanded": s.opacity,
              "--opacity-end": s.opacity2 || s.opacity,
            }}
            className={`absolute size-[${s.base}px] z-[${s.z}] border-3 border-dotted border-[${s.color}] 
                      left-1/2 top-1/2 -translate-1/2 rotate-45 transition-all duration-300 ease-in-out`}
          />
        ))}

        {/* Interactive tiles */}
        <div className="absolute size-[330px] scale-98 bg-white left-1/2 top-1/2 -translate-1/2 rotate-45 flex flex-wrap">
          {buttons.map((btn, i) => (
            <div
              key={i}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              className={`relative size-[163px] transition-all duration-300 ease-in-out
                        ${i % 2 === 0 ? "mr-[2px]" : "ml-[2px]"}
                        ${i < 2 ? "mb-[2px]" : "mt-[2px]"}
                        ${
                          hovered === i && i < 1
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }
                        ${
                          hovered === i
                            ? `bg-[#A0A4AB8F] ${btn.shift}`
                            : "bg-[#A0A4AB2F]"
                        }`}
              onClick={() => {}}
            >
              <p className="absolute left-1/2 top-1/2 -translate-1/2 -rotate-45 whitespace-pre text-center">
                {btn.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Link
        to={`/start-analysis`}
        className={`fixed bottom-15 left-9 scale-125`}
      >
        <ActionButton id={`Back`} label={`Back`} direction={"left"} />
      </Link>
      <Link
        to={`/summary`}
        state={{ data: data.current, savedAttributes: savedAttributes }}
        className={`fixed bottom-15 right-9 scale-125`}
      >
        <ActionButton id={`Proceed`} label={`Proceed`} direction={`right`} />
      </Link>
    </>
  );
}
