import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { PiPlant } from "react-icons/pi";
import { GiPlantSeed, GiPlantWatering } from "react-icons/gi";
import PageHeader from "../Shared/PageHeader";
import { GrDashboard, GrOverview } from "react-icons/gr";
const SideNavigation = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="p-10 mt-15 bg-primary min-h-screen fixed z-10 w-full lg:w-3/12 text-white">
      <PageHeader className="flex items-center">
        <GrDashboard className="inline" /> Dashboard
      </PageHeader>
      <ul className="sidenav mt-5">
        <li>
          <NavLink
            className="text-lg font-semibold btn btn-ghost w-full justify-start "
            to="/dashboard/overview"
          >
            <GrOverview /> Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-lg font-semibold btn btn-ghost w-full justify-start"
            to={`/dashboard/allPlants`}
          >
            <PiPlant /> All Plants
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-lg font-semibold btn btn-ghost w-full justify-start"
            to={`/dashboard/myPlants`}
          >
            <GiPlantWatering /> My Plants
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-lg font-semibold btn btn-ghost w-full justify-start"
            to={`/dashboard/addPlant`}
          >
            <GiPlantSeed /> Add Plant
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
