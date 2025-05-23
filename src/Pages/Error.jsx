import React from "react";
import Header from "../Components/Header";
import { Helmet } from "react-helmet";

const Error = () => {
  return (
    <div>
      <Helmet>
        <title>404 Page Not Found | Root Rhythm</title>
      </Helmet>
      <div className="bg-base-200 top-0 absolute w-full shadow-md">
        <Header></Header>
      </div>
      <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
        <img
          src="https://xn--lmonblhen-g5a4o.weebly.com/uploads/1/2/4/9/124959706/oops-404-error-with-a-broken-robot_orig.gif"
          alt=""
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-error">
          404- Page Not Found
        </h1>
      </div>
    </div>
  );
};

export default Error;
