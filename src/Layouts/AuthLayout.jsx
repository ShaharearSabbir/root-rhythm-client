import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div className="bg-base-200 shadow-md absolute w-full">
        <Header></Header>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
