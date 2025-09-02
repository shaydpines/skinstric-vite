import React, { useState, useEffect } from "react";

export default function DottedSquare({
                                         size = 200, // number or { base: 200, lg: 390 }
                                         gap = 20,
                                         dotRadius = 2,
                                         color = "#currentColor",
                                         className = ""
                                     }) {
    const [currentSize, setCurrentSize] = useState(
        typeof size === "number" ? size : size.base || 200
    );

    // Map Tailwind breakpoints to pixel values
    const breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536
    };

    useEffect(() => {
        const handleResize = () => {
            if (typeof size === "number") return; // fixed size

            const width = window.innerWidth;
            // Find the largest breakpoint less than width
            let matched = size.base || 200;
            Object.entries(breakpoints).forEach(([key, bp]) => {
                if (size[key] && width >= bp) {
                    matched = size[key];
                }
            });
            setCurrentSize(matched);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [size]);

    const half = currentSize / 2;
    const positions = [];

    const addSide = (x1, y1, x2, y2, skipLast = false) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const sideLength = Math.sqrt(dx * dx + dy * dy);
        const gapCount = Math.max(1, Math.round(sideLength / gap));
        const dotCount = gapCount + 1;
        const maxI = skipLast ? dotCount - 1 : dotCount;

        for (let i = 0; i < maxI; i++) {
            const t = i / (dotCount - 1);
            positions.push({ x: x1 + dx * t, y: y1 + dy * t });
        }
    };

    const inset = dotRadius;
    const topLeft = [-half + inset, -half + inset];
    const topRight = [half - inset, -half + inset];
    const bottomRight = [half - inset, half - inset];
    const bottomLeft = [-half + inset, half - inset];

    addSide(...topLeft, ...topRight, true);
    addSide(...topRight, ...bottomRight, true);
    addSide(...bottomRight, ...bottomLeft, true);
    addSide(...bottomLeft, ...topLeft, true);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${-half} ${-half} ${currentSize} ${currentSize}`}
            className={className}
        >
            {positions.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={dotRadius} fill={color} />
            ))}
        </svg>
    );
}
