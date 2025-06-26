import React from "react";
import { Link } from "react-router";

const Slide2 = () => {
  return (
    <div className="hero min-h-[60vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://www.rhs.org.uk/getmedia/146806da-6aa1-4112-b9ec-1c6745e820fa/Container-management_PUB0011863.jpg?width=940&height=627&ext=.jpg"
          className="max-w-lg rounded-lg"
        />
        <div>
          <h1 className="text-5xl font-bold">Check Your Plants</h1>
          <Link to="/dashboard/myPlants" className="btn btn-primary my-5">
            My Plants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
