import React, {useState, useRef, useEffect} from 'react'
import {Link} from "react-router-dom";
import ActionButton from "../components/ActionButton.jsx";
import SpinningSquares from "../components/SpinningSquares.jsx";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";

export default function Testing() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [step, setStep] = useState("name");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
                setLoading(true);
                sendData();
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
            setStep("success");
        } catch (error) {
            console.error("Error sending data:", error);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    };

    return (
        <>
            <Nav text={`INTRO`} />
            <Header text={`TO START ANALYSIS`}/>
            <div className="scale-65 xs:scale-75 sm:scale-100 relative w-svw h-svh sm:overflow-hidden">

                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <SpinningSquares loading={loading} slowSeconds={90} fastSeconds={5} direction={1} ratios={[1,0.75,0.6]} />
                </div>

                {loading ? (<div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center"
                >
                    <p
                        className="text-[#82878b] text-4xl font-semibold text-center mb-4">
                        Processing Request
                    </p>
                </div>) : step !== "success" ? (<>
                    <p className="absolute left-1/2 top-2/5 -translate-x-1/2 translate-y-1/2 text-[#82878b] tracking-wider uppercase mb-1">
                        {(!name && step === "name") ? `CLICK TO TYPE` : (name && step === "name") ? `Introduce yourself` : (!location && step === "location") ? `CLICK TO TYPE` : `Where are you from?`}
                    </p>

                    <form
                        className={`absolute left-1/2 top-1/2 -translate-1/2`}
                        onSubmit={handleSubmit}
                    >
                        {step === "name" && (
                            <input
                                ref={nameInputRef}
                                className="font-roobert text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none min-w-[400px] max-w-svw field-sizing-content pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
                                placeholder="Introduce yourself" autoComplete="off" type="text" name="name" value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}
                        {step === "location" && (
                            <input
                                ref={locationInputRef}
                                className="font-roobert text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none min-w-[500px] max-w-svw field-sizing-content pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
                                placeholder="Where are you from?" autoComplete="off" type="text" name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        )}
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                </>) : (<>
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
                        <p
                            className="text-4xl font-normal text-[#1A1B1C] tracking-wide">Thank you!</p><p
                        className="text-lg text-[#82878b]">Proceed for the next step</p></div>
                </>)
                }
            </div>

            <Link to={`/`} className={`fixed bottom-15 left-9 scale-125`}>
                <ActionButton id={`Back`} label={`Back`} direction={"left"}/>
            </Link>
            {step === "success" && !loading && <Link to={`/start-analysis`} className={`fixed bottom-15 right-9 scale-125`}>
                <ActionButton id={`Proceed`} label={`Proceed`} direction={`right`}/>
            </Link>}
        </>
    )
}
