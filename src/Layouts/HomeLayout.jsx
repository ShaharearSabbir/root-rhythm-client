import React from "react";
import Header from "../Components/Header";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const HomeLayout = () => {
  let navigation = useNavigation();

  return (
    <div className="bg-base-200 min-h-screen relative">
      <div className="bg-base-200 top-0 absolute w-full shadow-md">
        <Header></Header>
      </div>
      {navigation.state === "loading" ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="pt-20 lg:pt-30 pb-98 w-11/12 mx-auto">
            <Outlet></Outlet>
          </div>
          <div className="bottom-0 absolute w-full">
            <Footer></Footer>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeLayout;
