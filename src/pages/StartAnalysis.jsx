import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../components/ActionButton.jsx";
import Preview from "../components/Preview.jsx";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import CameraButton from "../components/CameraButton.jsx";
import GalleryButton from "../components/GalleryButton.jsx";

export default function StartAnalysis() {
  const [modal, setModal] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rawBase64, setRawBase64] = useState(null);
  const fileUploadRef = useRef(null);

  function toggleModal() {
    setModal(!modal);
  }

  useEffect(() => {
    console.log(modal);
  }, [modal]);

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
        });

      const base64File = await toBase64(uploadedFile);
      setImageUrl(base64File);
      setRawBase64(base64File.split(",")[1]);

      setSuccess(true);
      setError(false);
    } catch (error) {
      setError(true);
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Nav text={`INTRO`} />

      <Preview imageUrl={imageUrl} loading={loading} />
      <Header text={`TO START ANALYSIS`} />
      <div
        className={
          "scale-80 sm:scale-100 relative w-svw h-svh sm:overflow-hidden xs:py-12 flex justify-center items-center sm:pt-0"
        }
      >
        <div
          className={
            "w-full md:mx-12 lg:mx-36 xl:mx-48 flex flex-col sm:flex-row sm:justify-between items-center"
          }
        >
          <div className={"modal-anchor"}>
            <CameraButton toggleModal={toggleModal} modal={modal} />
          </div>
          <GalleryButton
            fileUploadRef={fileUploadRef}
            uploadImageDisplay={uploadImageDisplay}
            handleImageUpload={handleImageUpload}
          />
        </div>
      </div>
      {error && !loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-red-500 text-sm">
            Error uploading image. Please try again.
          </p>
        </div>
      )}

      <div
        onClick={() => setModal(false)}
        className={`fixed inset-0 bg-white/50 transition-opacity duration-200 ease-in-out
            ${
              modal
                ? "opacity-100 pointer-events-auto z-[200]"
                : "opacity-0 pointer-events-none -z-[200]"
            }
        `}
      />
      {modal && (
        <div className="modal absolute z-[300] -translate-x-138/100 translate-y-19/10 sm:translate-y-0 sm:-translate-x-1/3 bg-[#1A1B1C] pt-4 pb-2">
          <h2 className="text-[#FCFCFC] font-semibold sm:mb-12 leading-[24px] px-4">
            ALLOW A.I. TO ACCESS YOUR CAMERA
          </h2>
          <div className="mt-4 border-t border-[#FCFCFC]" />
          <div className="flex justify-end gap-2 pt-2">
            <button 
            onClick={toggleModal}
            className="px-7 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500">
              DENY
            </button>
            <Link
              to={'/camera'}
            >
            <button className="px-5 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300">
              ALLOW
            </button>
            </Link>
          </div>
        </div>
      )}

      <Link to={`/Testing`} className={`fixed bottom-15 left-9 scale-125`}>
        <ActionButton id={`Back`} label={`Back`} direction={"left"} />
      </Link>
      {success && !loading && (
        <Link
          to={`/preparing-analysis`}
          state={{ rawBase64: rawBase64 }}
          className={`fixed bottom-15 right-9 scale-125`}
        >
          <ActionButton id={`Proceed`} label={`Proceed`} direction={`right`} />
        </Link>
      )}
    </>
  );
}
