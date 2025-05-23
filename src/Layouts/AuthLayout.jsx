import React from "react";
import Header from "../Components/Header";
import { Outlet, useNavigation } from "react-router";
import Loader from "../Components/Loader";

const AuthLayout = () => {
  let navigation = useNavigation();
  return (
    <div>
      <div className="bg-base-200 shadow-md absolute w-full">
        <Header></Header>
      </div>
      {navigation.state === "loading" ? <Loader></Loader> : <Outlet></Outlet>}
    </div>
  );
};

export default AuthLayout;
