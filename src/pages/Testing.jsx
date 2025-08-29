import React, { useState, useRef, useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom";
import Nav from "../components/Nav.jsx";
import ActionButton from "../components/ActionButton.jsx";

export default function Testing() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [step, setStep] = useState("name");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const nameInputRef = useRef(null);
    const locationInputRef = useRef(null);

    useEffect(() => {
        if (step === "name" && nameInputRef.current) {
            nameInputRef.current.focus();
        } else if (step === "location" && locationInputRef.current) {
            locationInputRef.current.focus();
        }
    }, [step])

    const validateInput = (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(value.trim());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === "name") {
            if (!validateInput(name)) {
                setError("Please enter a valid name (letters only.)");
                return;
            }
            setError("");
            setStep("location");
        } else if (step === "location") {
            if (!validateInput(location)) {
                setError("Please enter a valid location (letters only.)");
                return;
            }
            setError("");
            if (name && location) {
            sendData();
            navigate("/002");
            } else {
                setError("Please reload the page and fill in all fields.");
            }
        }
    };

    const sendData = async () => {
        try {
            const response = await fetch("https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, location}),
            });
            const data = await response.json();
            console.log("API response:", data);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <>
            <Nav/>

            <p className="fixed font-semibold text-xs pt-16 ml-9">TO START ANALYSIS</p>
            <div className="scale-65 xs:scale-75 sm:scale-100 relative w-svw h-svh sm:overflow-hidden">
                <div
                    className={`absolute size-[360px] lg:size-[420px] z-[-10] border border-dotted border-[#A0A4AB] left-1/2 top-1/2 -translate-1/2 rotate-45 animate-[spin_90s_linear_infinite]`}
                />
                <div
                    className={`absolute size-[390px] lg:size-[450px] z-[-11] border border-dotted border-[#A0A4AB99] left-1/2 top-1/2 -translate-1/2 rotate-45 animate-[spin_120s_linear_infinite]`}
                />
                <div
                    className={`absolute size-[420px] lg:size-[480px] z-[-12] border border-dotted border-[#A0A4AB55] left-1/2 top-1/2 -translate-1/2 rotate-45 animate-[spin_150s_linear_infinite]`}
                />

                <form
                    className={`absolute left-1/2 top-1/2 -translate-1/2`}
                    onSubmit={handleSubmit}
                >
                    {step === "name" && (
                        <input
                            ref={nameInputRef}
                            className="font-roobert text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[500px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
                            placeholder="Introduce Yourself" autoComplete="off" type="text" name="name" value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    {step === "location" && (
                        <input
                            ref={locationInputRef}
                            className="font-roobert text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[500px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
                            placeholder="Where are you from?" autoComplete="off" type="text" name="location" value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    )}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            </div>

            <Link to={`/`} className={`fixed bottom-15`}>
                <ActionButton id={`Back`} label={`Back`} position={`left`}/>
            </Link>
        </>
    )
}
