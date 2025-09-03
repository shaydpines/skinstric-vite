import React from 'react'

export default function Header({ text }) {
    return (
        <div className="absolute top-16 left-9">
            <p
            className="font-semibold text-xs md:text-sm">{text}
            </p>
        </div>
    )
}
