import React from 'react'
import radio_button from "../assets/radio_button.png";
import radio_button_selected from "../assets/radio_button_selected.png";


export default function DemographicList({ data, category }) {
    if (!data || !data[category]) return null;

    let entries = Object.entries(data[category]);

    if (category === "age") {
        // Define chronological order of age bins
        const ageOrder = ["0-2", "3-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70+"];
        entries = entries.sort(
            (a, b) => ageOrder.indexOf(a[0]) - ageOrder.indexOf(b[0])
        );
    } else {
        // Sort by descending percentage
        entries = entries.sort((a, b) => b[1] - a[1]);
    }

    return (
        <>
            {entries.map(([name, value], index) => {
                const percent = Math.round(value * 100); // convert to %
                return (
                    <div
                        key={index}
                        className="px-4 py-2 flex justify-between items-center hover:bg-[#E1E1E2] cursor-pointer"
                    >
                        <div className="flex items-center">
                            <img
                                className="size-3 mr-2"
                                src={radio_button}
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
