import React from 'react';

export default function ProgressRing({
                                         size = 120,
                                         stroke = 2,
                                         percent = 25,
                                         color = '#1a1b1c',
                                         bg = '#C1C2C3',
                                         cap = 'butt', // 'butt' | 'round' | 'square'
    className = '',
                                     }) {
    // clamp percent
    const p = Math.max(0, Math.min(100, percent));
    const radius = (size - stroke) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = circumference * (1 - p / 100);

    return (<div className={`relative`}>
        <svg
            width={size}
            height={size}
            className={className}
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-label={`Progress ${p}%`}
        >
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke={bg}
                strokeWidth={stroke}
                fill="none"
            />
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke={color}
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                strokeLinecap={cap}
                transform={`rotate(-90 ${cx} ${cy})`}
                style={{transition: 'stroke-dashoffset 600ms ease'}}
            />
        </svg>
        <div className={`size-[${size}px] absolute left-1/2 top-1/2 -translate-1/2 text-xl sm:text-2xl md:text-3xl lg:text-[40px]`}>{`${percent}`}%</div>
    </div>
    );
}
