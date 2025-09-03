import React, {useState, useRef} from 'react'
import {Link} from "react-router-dom";
import SpinningSquares from "../components/SpinningSquares.jsx";
import ActionButton from "../components/ActionButton.jsx";
import camera from "../assets/camera.png";
import gallery from "../assets/gallery.png";
import wand from "../assets/wand.png";
import rounded_backdrop from "../assets/rounded_backdrop.png";
import Preview from "../components/Preview.jsx";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";

export default function StartAnalysis() {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileUploadRef = useRef(null);
    const data = useRef(null);

    function handleImageUpload(event) {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const uploadImageDisplay = async () => {
        setLoading(true);
        setSuccess(false);
        try {
            const uploadedFile = fileUploadRef.current.files[0];
            if (!uploadedFile) return;

            const toBase64 = (file) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                })

            const base64File = await toBase64(uploadedFile);

            const rawBase64 = base64File.split(",")[1];

            console.log("Sending payload", JSON.stringify({Image: rawBase64}))

            const response = await fetch("https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({image: rawBase64}),
            })
            if (response.ok) {
                const promise = await response.json();
                console.log("API response:", promise.data);
                data.current = promise.data;
                setImageUrl(base64File)
                setError(false);
                setSuccess(true);
            } else {
                console.error("Error uploading image:", response.status, response.statusText);
                setError(true);
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setError(true);
            setSuccess(false);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000)
        setTimeout(() => {
            setError(false);
        }, 5000)

    }

    return (
        <>
            <Nav text={`INTRO`}/>
            <Preview imageUrl={imageUrl} loading={loading}/>
            <Header text={`TO START ANALYSIS`}/>
            <div
                className={"scale-80 sm:scale-100 relative w-svw h-svh sm:overflow-hidden xs:py-12 flex justify-center items-center sm:pt-0"}>
                <div
                    className={"w-full md:mx-12 lg:mx-36 xl:mx-48 flex flex-col sm:flex-row sm:justify-between items-center"}>
                    <div className={"relative size-[200px] m-16"}>
                        <div
                            className={`scale-50 md:scale-66 lg:scale-68 absolute left-1/2 top-1/2 -translate-1/2 flex justify-center items-center`}>
                            <SpinningSquares/>
                        </div>
                        <img src={rounded_backdrop}
                             alt={`backdrop`}
                             className={`absolute z-[-1] left-1/2 top-1/2 -translate-1/2 transition-transform duration-500 ease-in-out hover:scale-110`}/>
                        <img src={camera} alt={"camera"}
                             className={`absolute left-1/2 top-1/2 -translate-1/2 transition-transform duration-500 ease-in-out hover:scale-110 hover:cursor-pointer`}/>
                        <p className="absolute bottom-0 sm:top-0 sm:right-0 translate-x-1/3 sm:translate-x-3/4 md:translate-x-9/10 lg:translate-x-31/30 translate-y-1/2 sm:-translate-y-1/80 md:-translate-y-1/8 lg:-translate-y-1/5 text-sm font-normal leading-[24px]">ALLOW
                            A.I.<br/>TO
                            SCAN YOUR FACE
                        </p>
                        <img src={wand} alt={"wand"}
                             className={`hidden sm:block scale-50 md:scale-75 lg:scale-100 absolute right-0 -translate-x-2/8 md:-translate-x-1/10 lg:translate-x-1/20 translate-y-3/8 md:translate-y-1/10 lg:-translate-y-1/20 z-[-1]`}/>
                    </div>
                    <div className={"relative size-[200px] m-16"}>
                        <div
                            className={`scale-50 md:scale-66 lg:scale-68 absolute left-1/2 top-1/2 -translate-1/2 flex justify-center items-center`}>
                            <SpinningSquares loading={loading} slowSeconds={90} fastSeconds={5}/>
                        </div>
                        <form id={"form"}>
                            <input
                                type="file"
                                id="file"
                                ref={fileUploadRef}
                                name="file"
                                accept="image/*"
                                className="hidden"
                                onChange={uploadImageDisplay}/>
                            <div
                                onClick={handleImageUpload}
                                className={`absolute left-1/2 top-1/2 -translate-1/2 rounded-full transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer`}
                            >
                                <img
                                    src={rounded_backdrop}
                                    className="absolute inset-0 w-full h-full rounded-full z-[-1] scale-135"
                                    alt="backdrop"
                                />
                                <img
                                    src={gallery}
                                    className={`block rounded-full relative scale-135 transition-transform duration-500 ease-in-out ${loading && "animate-pulse"
                                    }`}
                                    alt="gallery"
                                />
                            </div>
                        </form>
                        <p className="absolute bottom-0 translate-x-1/3 sm:-translate-x-3/4 md:-translate-x-9/10 lg:-translate-x-31/30 translate-y-1/2 sm:translate-y-1/80 md:translate-y-1/2 lg:translate-y-85/100 text-sm sm:text-right font-normal leading-[24px]">ALLOW
                            A.I.<br/>TO ACCESS GALLERY
                        </p>
                        <img src={wand} alt={"wand"}
                             className={`hidden sm:block scale-50 md:scale-75 lg:scale-100 absolute rotate-180 translate-x-2/8 md:translate-x-1/10 lg:-translate-x-1/20 bottom-0 -translate-y-3/8 md:-translate-y-1/10 lg:translate-y-1/20 z-[-2]`}/>
                    </div>
                </div>
            </div>
            {error && !loading && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p className="text-red-500 text-sm">Error uploading image. Please try again.</p>
            </div>}
            <Link to={`/Testing`} className={`fixed bottom-15 left-9 scale-125`}>
                <ActionButton id={`Back`} label={`Back`} direction={"left"}/>
            </Link>
            {success && !loading &&
                <Link to={`/results`} state={{data: data.current}} className={`fixed bottom-15 right-9 scale-125`}>
                    <ActionButton id={`Proceed`} label={`Proceed`} direction={`right`}/>
                </Link>}
        </>
    )
}
