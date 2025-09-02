import React, {useState, useRef} from 'react'
import {Link} from "react-router-dom";
import SpinningSquares from "../components/SpinningSquares.jsx";
import ActionButton from "../components/ActionButton.jsx";
import camera from "../assets/camera.png";
import gallery from "../assets/gallery.png";
import wand from "../assets/wand.png";

//https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo

export default function StartAnalysis() {
    const [avatarURL, setAvatarURL] = useState(null);

    const fileUploadRef = useRef();

    function handleImageUpload(event) {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const uploadImageDisplay = async () => {
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

            console.log("Sending payload", JSON.stringify({Image: rawBase64 }))

            const response = await fetch("https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({Image: rawBase64 }),
            })
            if (response.ok) {
                const data = await response.json();
                console.log("API response:", data);
                setAvatarURL(base64File);
            } else {
                console.error("Error uploading image:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    return (
        <>
            <div
                className="hidden xs:block absolute top-16 right-9 transition-opacity duration-300 opacity-100">
                <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
                <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden">
                    {avatarURL && <img src={avatarURL} alt="avatar" className="w-full h-full object-cover"/>}
                </div>
            </div>
            <div className="absolute top-16 left-9"><p
                className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p></div>
            <div
                className={"scale-80 sm:scale-100 xl:scale-125 relative w-svw h-svh sm:overflow-hidden xs:py-12 sm:pt-24 flex justify-center items-center sm:pt-0"}>
                <div
                    className={"w-full md:mx-12 lg:mx-24 xl:mx-60 flex flex-col sm:flex-row sm:justify-between items-center"}>
                    <div className={"relative size-[200px] m-16"}>
                        <div
                            className={`scale-50 md:scale-66 lg:scale-68 absolute left-1/2 top-1/2 -translate-1/2 flex justify-center items-center`}>
                            <SpinningSquares/>
                        </div>
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
                            <SpinningSquares/>
                        </div>
                        <form id={"form"} encType={"multipart/form-data"}>
                            <input
                                type="file"
                                id="file"
                                ref={fileUploadRef}
                                name="file"
                                accept="image/*"
                                className="hidden"
                                onChange={uploadImageDisplay}/>
                            <button
                                type={"submit"}
                                onClick={handleImageUpload}
                            >
                                <img src={gallery} alt={"camera"}
                                     className={`absolute left-1/2 top-1/2 -translate-1/2 transition-transform duration-500 ease-in-out hover:scale-110 hover:cursor-pointer`}/>
                            </button>
                        </form>
                        <p className="absolute bottom-0 translate-x-1/3 sm:-translate-x-72/100 md:-translate-x-9/10 lg:-translate-x-31/30 translate-y-1/2 sm:translate-y-1/80 md:translate-y-1/2 lg:translate-y-85/100 text-sm sm:text-right font-normal leading-[24px]">ALLOW
                            A.I.<br/>TO ACCESS GALLERY
                        </p>
                        <img src={wand} alt={"wand"}
                             className={`hidden sm:block scale-50 md:scale-75 lg:scale-100 absolute rotate-180 translate-x-2/8 md:translate-x-1/10 lg:-translate-x-1/20 bottom-0 -translate-y-3/8 md:-translate-y-1/10 lg:translate-y-1/20 z-[-1]`}/>
                    </div>
                </div>
            </div>
            <Link to={`/Testing`} className={`fixed bottom-15 left-9 scale-125`}>
                <ActionButton id={`Back`} label={`Back`} direction={"left"}/>
            </Link>
        </>
    )
}
