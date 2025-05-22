import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Components/Context/AuthContext";

const PlantDetails = () => {
  const { user } = useContext(AuthContext);
  const {
    careLevel,
    category,
    description,
    healthStatus,
    lastWatered,
    nextWatering,
    photoURL,
    plantName,
    wateringFrequency,
    userName,
    userEmail,
  } = useLoaderData();

  return (
    <div>
      <h3 className="text-2xl bg-base-300 p-5 rounded-lg font-bold">
        {plantName}
      </h3>
      <div className="flex flex-col md:flex-row gap-10 justify-around items-center p-5 my-10">
        <div>
          <img
            className="w-[250px] rounded-lg"
            src={photoURL}
            alt={plantName}
          />
        </div>
        <div className="flex-1 space-y-2">
          <p>{description}</p>
          <p>Category: {category}</p>
          <p>Health Status: {healthStatus}</p>
        </div>
      </div>

      <div className="bg-base-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 justify-around items-center rounded-lg gap-5">
        <div>
          <h5 className="text-lg font-bold text-primary">Care Level</h5>
          <p>{careLevel}</p>
        </div>
        <div>
          <h5 className="text-lg font-bold text-primary">Last Watered</h5>
          <p>{lastWatered}</p>
        </div>
        <div>
          <h5 className="text-lg font-bold text-primary">Watering Frequency</h5>
          <p>{wateringFrequency}</p>
        </div>
        <div>
          <h5 className="text-lg font-bold text-primary">Next Watering</h5>
          <p>{nextWatering}</p>
        </div>
      </div>

      {user.email === userEmail || (
        <div className="my-10">
          <h3 className="text-xl font-bold text-primary">Owner Info</h3>
          <div>
            <h5 className="font-semibold">{userName}</h5>
            <p>Email: {userEmail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetails;
