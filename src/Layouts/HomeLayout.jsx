import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div>
      <div className="bg-base-200 top-0 absolute w-full shadow-md">
        <Header></Header>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
