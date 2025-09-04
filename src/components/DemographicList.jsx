import React, { useEffect } from "react";
import radio_button from "../assets/radio_button.png";
import radio_button_selected from "../assets/radio_button_selected.png";

export default function DemographicList({
  data,
  category,
  handleSelect,
  selectedAttributes,
}) {
  // Preselect highest % entry for each category once data is available
  useEffect(() => {
    if (!data) return;

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
  }, [data]);

  if (!data || !data[category]) return null;

  let entries = Object.entries(data[category]);

  if (category === "age") {
    // Display ages in chronological order
    const ageOrder = [
      "0-2",
      "3-9",
      "10-19",
      "20-29",
      "30-39",
      "40-49",
      "50-59",
      "60-69",
      "70+",
    ];
    entries = entries.sort(
      (a, b) => ageOrder.indexOf(a[0]) - ageOrder.indexOf(b[0])
    );
  } else {
    // Race/Gender sorted by descending %
    entries = entries.sort((a, b) => b[1] - a[1]);
  }

  return (
    <>
      {entries.map(([name, value], index) => {
        const percent = Math.round(value * 100);

        const isSelected =
          (category === "race" && selectedAttributes[0] === name) ||
          (category === "age" && selectedAttributes[1] === name) ||
          (category === "gender" && selectedAttributes[2] === name);

        return (
          <div
            key={index}
            onClick={() => handleSelect(category, name, percent)}
            className={`px-4 py-2 flex justify-between items-center 
              ${
                isSelected
                  ? "bg-[#1a1b1c] text-white"
                  : "hover:bg-[#E1E1E2] cursor-pointer"
              }`}
          >
            <div className="flex items-center">
              <img
                className="size-3 mr-2"
                src={isSelected ? radio_button_selected : radio_button}
                alt=""
              />
              {name}
            </div>
            <div>{percent}%</div>
          </div>
        );
      })}
    </>
  );
}
