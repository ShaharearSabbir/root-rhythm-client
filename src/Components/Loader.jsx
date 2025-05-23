import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-base-200 flex gap-5 justify-center items-center">
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );
};

export default Loader;
