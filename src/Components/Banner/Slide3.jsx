import React from "react";
import { Link } from "react-router";

const Slide3 = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://i.ibb.co/2YkYXtzW/crabapple.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-5">
            Ditch the plant care stress. Root Rhythm makes nurturing your green
            friends simple and rewarding.
          </h1>
          <Link to="/auth/signup" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide3;
