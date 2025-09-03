// src/components/DottedSquare.jsx
import React from "react";

// simple class combiner that supports strings and {className: boolean} objects
const cx = (...args) =>
    args
        .flatMap(a => {
            if (!a) return [];
            if (typeof a === "string") return [a];
            if (Array.isArray(a)) return a.filter(Boolean);
            if (typeof a === "object") return Object.keys(a).filter(k => a[k]);
            return [];
        })
        .join(" ");

// turn #RRGGBB + opacity → #RRGGBBAA (or adjust #RRGGBBAA)
function withOpacity(color, opacity) {
    if (opacity == null || opacity === 1) return color;

    const hex6 = /^#([0-9a-f]{6})$/i;
    const hex8 = /^#([0-9a-f]{8})$/i;

    const clamp = v => Math.max(0, Math.min(255, v));
    const toHex = v => clamp(v).toString(16).padStart(2, "0");

    if (hex6.test(color)) {
        const alpha = toHex(Math.round(opacity * 255));
        return `${color}${alpha}`;
    }
    if (hex8.test(color)) {
        const [, body] = color.match(hex8);
        const baseAlpha = parseInt(body.slice(6, 8), 16);
        const mixed = Math.round(baseAlpha * opacity);
        return `#${body.slice(0, 6)}${toHex(mixed)}`;
    }
    // fallback: leave as-is for non-hex colors
    return color;
}

function Square({
                    size,
                    color,
                    opacity,
                    borderWidth,
                    borderStyle,
                    rotation,
                    angle,
                    zIndex,
                    position,
                    transition,
                    visible,
                    className,
                    style,
                }) {
    // compute placement + transform (inline to avoid conflicting with Tailwind transform utilities)
    const posStyles = (() => {
        switch (position) {
            case "left":
                return { left: 0, top: "50%", transform: `translate(0,-50%) rotate(${rotation + angle}deg)` };
            case "right":
                return { right: 0, bottom: "50%", transform: `translate(0,50%) rotate(${rotation + angle}deg)` };
            default:
                return { left: "50%", top: "50%", transform: `translate(-50%,-50%) rotate(${rotation + angle}deg)` };
        }
    })();

    return (
        <div
            className={cx(
                "absolute",
                transition && "transition-opacity duration-500",
                { "opacity-0": !visible, "opacity-100": visible },
                className
            )}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderWidth,
                borderStyle,
                borderColor: withOpacity(color, opacity),
                transformOrigin: "center center",
                zIndex,
                ...posStyles,
                ...style,
            }}
        />
    );
}

export default function DottedSquare({
                                         size = 360,
                                         lgSize,                           // optional: renders a separate lg variant
                                         color = "#A0A4AB",
                                         opacity = 1,
                                         borderWidth = 3,
                                         borderStyle = "dotted",
                                         rotation = 45,
                                         zIndex = -10,
                                         position = "center",              // "center" | "left" | "right"
                                         className = "",
                                         style = {},
                                         angle = 0,                        // for external rotation (spinners)
                                         transition = false,
                                         visible = true,
                                     }) {
    // If lgSize is provided, render a mobile and a desktop version with visibility classes.
    if (lgSize) {
        return (
            <>
                <Square
                    size={size}
                    color={color}
                    opacity={opacity}
                    borderWidth={borderWidth}
                    borderStyle={borderStyle}
                    rotation={rotation}
                    angle={angle}
                    zIndex={zIndex}
                    position={position}
                    transition={transition}
                    visible={visible}
                    className={cx("block lg:hidden", className)}
                    style={style}
                />
                <Square
                    size={lgSize}
                    color={color}
                    opacity={opacity}
                    borderWidth={borderWidth}
                    borderStyle={borderStyle}
                    rotation={rotation}
                    angle={angle}
                    zIndex={zIndex}
                    position={position}
                    transition={transition}
                    visible={visible}
                    className={cx("hidden lg:block", className)}
                    style={style}
                />
            </>
        );
    }

    return (
        <Square
            size={size}
            color={color}
            opacity={opacity}
            borderWidth={borderWidth}
            borderStyle={borderStyle}
            rotation={rotation}
            angle={angle}
            zIndex={zIndex}
            position={position}
            transition={transition}
            visible={visible}
            className={className}
            style={style}
        />
    );
}
