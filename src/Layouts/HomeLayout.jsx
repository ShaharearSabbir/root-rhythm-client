import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="bg-base-200">
      <div className="bg-base-200 top-0 absolute w-full shadow-md">
        <Header></Header>
      </div>
      <div className="pt-25 pb-15 w-11/12 mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeLayout;
