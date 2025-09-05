import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../components/ActionButton.jsx";
import Preview from "../components/Preview.jsx";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import CameraButton from "../components/CameraButton.jsx";
import GalleryButton from "../components/GalleryButton.jsx";

export default function StartAnalysis() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rawBase64, setRawBase64] = useState(null)
  const fileUploadRef = useRef(null);

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
          <CameraButton />
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
