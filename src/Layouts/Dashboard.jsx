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
          className={` ${
            showSide ? "inline" : "hidden"
          } md:inline w-full md:w-3/12`}
        >
          <SideNavigation />
        </div>
        <div className="md:w-9/12 p-10 my-15">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
