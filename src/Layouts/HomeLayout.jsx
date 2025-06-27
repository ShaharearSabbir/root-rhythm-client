import React from "react";
import { Outlet, useNavigation } from "react-router";
import Loader from "../Components/Shared/Loader";
import Footer from "../Components/Shared/Footer";
import Header from "../Components/Header/Header";

const HomeLayout = () => {
  let navigation = useNavigation();

  return (
    <div className="min-h-screen relative">
      <div className="top-0 lg:sticky lg:z-100 bg-base-100 shadow-md">
        <Header></Header>
      </div>
      {navigation.state === "loading" ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="mt-10 pb-98 w-11/12 mx-auto">
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
