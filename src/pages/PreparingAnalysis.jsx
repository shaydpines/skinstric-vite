import React, { useEffect, useState } from "react";
import SpinningSquares from "../components/SpinningSquares";
import { useLocation, useNavigate } from "react-router-dom";

export default function PreparingAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [rawBase64, setRawBase64] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.rawBase64) {
      setRawBase64(location.state.rawBase64);
    }
  }, [location.state?.rawBase64]);

  useEffect(() => {
    rawBase64 && sendPhoto();
  }, [rawBase64]);

  const sendPhoto = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ image: rawBase64 }),
        }
      );
      if (response.ok) {
        const promise = await response.json();
        setData(promise.data);
        setError(false);
        setSuccess(true);
      } else {
        setError(true);
        setSuccess(false);
      }
    } catch (error) {
      setError(true);
      setSuccess(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (success === true && data) {
      const timer = setTimeout(() => {
        navigate("/select", { state: { data } });
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (success === false) {
      const timer = setTimeout(() => {
        navigate("/start-analysis");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [success, data, navigate]);

  return (
    <>
      <div
        className={`scale-65 xs:scale-80 sm:scale-90 md:scale-100 absolute left-1/2 top-1/2 -translate-1/2 flex justify-center items-center`}
      >
        <SpinningSquares loading={loading} slowSeconds={10} fastSeconds={5} easing={0.5} />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-1/2">
        {error ? (
          <p className="text-red-500 uppercase text-2xl">
            Error uploading image. Please try again.
          </p>
        ) : (
          <p className="uppercase text-2xl transition-opacity duration-500 ease-in-out animate-pulse">Preparing Your Analysis ...</p>
        )}
      </div>
    </>
  );
}
