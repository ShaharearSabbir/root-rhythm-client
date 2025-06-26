import React from "react";
import { Link } from "react-router";

const Slide1 = () => {
  return (
    <div
      className="hero min-h-[60vh]"
      style={{
        backgroundImage: "url(https://i.ibb.co/zTTfj665/cover-1.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Welcome to Root Rhythm! Cultivate thriving plants and peace of mind
            with your personal plant care assistant
          </p>
          <Link to={"/auth/signin"} className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
