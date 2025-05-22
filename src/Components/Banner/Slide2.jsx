import React from "react";
import { Link } from "react-router";

const Slide2 = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://i.ibb.co/Xr4PQnFC/indoor-annual-plants3.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Check Your Plants</h1>
          <Link to="/myPlants" className="btn btn-primary my-5">
            My Plants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
