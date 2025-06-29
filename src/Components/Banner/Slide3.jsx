import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Slide3 = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="hero min-h-[60vh]">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://npr.brightspotcdn.com/dims4/default/9d7eefa/2147483647/strip/true/crop/1244x830+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F59%2Fe4%2Fe015a7094fe1868b1a7ac1e3fa00%2Fmixed-containers-steil.jpg"
          className="max-w-lg rounded-lg"
        />
        <div>
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-5">
            Ditch the plant care stress
          </h1>
          {user ? (
            <Link to={"/dashboard/overview"} className="btn btn-primary">
              Dashboard
            </Link>
          ) : (
            <Link to="/auth/signup" className="btn btn-primary">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slide3;
