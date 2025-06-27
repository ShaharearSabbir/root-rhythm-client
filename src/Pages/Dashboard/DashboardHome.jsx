import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Context/AuthContext";
import PageHeader from "../../Components/Shared/PageHeader";
import OverviewCard from "./OverviewCard";
import { CgProfile } from "react-icons/cg";
import { PiPlant } from "react-icons/pi";
import { GiPlantWatering } from "react-icons/gi";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_SITE}/overview/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [user]);

  const extraData = [
    { Icon: <CgProfile className="text-primary" />, route: null },
    {
      Icon: <PiPlant className="text-primary" />,
      route: "/dashboard/allPlants",
    },
    {
      Icon: <GiPlantWatering className="text-primary" />,
      route: "/dashboard/myPlants",
    },
  ];

  return (
    <div>
      <div className="md:p-8 text-center">
        <PageHeader>Welcome Back!</PageHeader>
      </div>
      <div className="card w-full max-w-sm mx-auto duration-300">
        <div className="card-body p-6 text-center">
          {" "}
          {/* Centered text for simplicity */}
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="avatar">
              <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 dark:ring-offset-gray-800 ring-offset-2 shadow-lg">
                <img
                  src={user.photoURL}
                  alt={`${name}'s avatar`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/150x150/CCCCCC/000000?text=Error";
                  }}
                />
              </div>
            </div>
          </div>
          {/* Name */}
          <h2 className="text-3xl font-bold mb-2">
            {user.displayName || "User Name"}
          </h2>
          {/* Email */}
          <p className="text-lg mb-6">{user.email || "user@example.com"}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
        {data.map((singleData, index) => (
          <OverviewCard {...singleData} {...extraData[index]} />
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
