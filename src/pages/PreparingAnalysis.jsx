import React from 'react'

export default function PreparingAnalysis() {
  
    const sendPhoto = async () => {
    setSuccess(false);
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
        data.current = promise.data;
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
      setError(false);
  };
  
    return (
    <div>Preparing Analysis</div>
  )
}
