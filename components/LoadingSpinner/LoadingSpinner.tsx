import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-green-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
