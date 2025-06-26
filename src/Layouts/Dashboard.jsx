import React, { useState } from "react";
import { Outlet } from "react-router";
import SideNavigation from "../Components/Dashboard/SideNavigation";
import Navbar from "../Components/Dashboard/Navbar";

const Dashboard = () => {
  const [showSide, setShowSide] = useState(false);
  return (
    <div>
      <Navbar setShowSide={setShowSide} />
      <div className="flex">
        <div
          className={`${
            showSide ? "fixed z-10" : "hidden"
          } lg:inline w-full lg:w-3/12`}
        >
          <SideNavigation />
        </div>
        <div className="w-full lg:w-9/12 p-5 lg:p-10 my-15">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
