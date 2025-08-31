import React, { useState, useRef, useEffect } from "react";

export default function SpinningSquares({
                                            loading,
                                            slowSeconds = 90,       // seconds per rotation (idle)
                                            fastSeconds = 10,       // seconds per rotation (loading)
                                            easing = 0.05,          // how quickly to transition between speeds
                                            ratios = [1, 0.75, 0.6],// relative speeds for each square
                                            direction = 1           // 1 = clockwise, -1 = counter-clockwise
                                        }) {
    const [angle, setAngle] = useState(0);
    const speedRef = useRef(0);
    const angleRef = useRef(0);

    // Convert seconds/rotation → degrees per frame (assuming ~60fps)
    const toSpeed = (seconds) => (360 / (60 * seconds)) * direction;

    useEffect(() => {
        let frame;
        const tick = () => {
            angleRef.current += speedRef.current;
            setAngle(angleRef.current);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const targetSpeed = loading ? toSpeed(fastSeconds) : toSpeed(slowSeconds);
        let current = speedRef.current;

        const step = () => {
            current += (targetSpeed - current) * easing;
            speedRef.current = current;
            if (Math.abs(targetSpeed - current) > 0.0001) {
                requestAnimationFrame(step);
            }
        };

        step();
    }, [loading, slowSeconds, fastSeconds, easing, direction]);

    return (
        <>
            <div
                className="absolute size-[360px] lg:size-[420px] border border-dotted border-[#A0A4AB] left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${angle * ratios[0] + 45}deg)`,
                    transformOrigin: "center center"
                }}
            />
            <div
                className="absolute size-[390px] lg:size-[450px] border border-dotted border-[#A0A4AB99] left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${angle * ratios[1] + 45}deg)`,
                    transformOrigin: "center center"
                }}
            />
            <div
                className="absolute size-[420px] lg:size-[480px] border border-dotted border-[#A0A4AB55] left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${angle * ratios[2] + 45}deg)`,
                    transformOrigin: "center center"
                }}
            />
        </>
    );
}
