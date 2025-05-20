import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div>
      <div className="bg-base-200 shadow-md">
        <Header></Header>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
