import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Components/Context/AuthContext";
import { FaSunPlantWilt } from "react-icons/fa6";
import { GiPlantWatering } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { RiWaterFlashFill } from "react-icons/ri";

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
    wateringFrequencyTimes,
    wateringFrequencyDays,
    wateringFrequencyWeeks,
    userName,
    userEmail,
  } = useLoaderData();

  return (
    <div className="motion-translate-y-in-100">
      <h3 className="text-2xl  font-bold">{plantName}</h3>
      <div className="flex flex-col md:flex-row gap-10 justify-around items-center p-5 my-10">
        <div>
          <img
            className="w-[250px] rounded-lg"
            src={photoURL}
            alt={plantName}
          />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-justify">{description}</p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Health Status:</strong> {healthStatus}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-around items-center text-center gap-6">
        <div className="p-8 bg-base-300 rounded-2xl flex justify-center items-center flex-col gap-2">
          <div>
            <FaSunPlantWilt size={80} />
          </div>
          <h5 className="text-lg font-bold text-primary">Care Level</h5>
          <p>{careLevel}</p>
        </div>
        <div className="p-8 bg-base-300 rounded-2xl flex justify-center items-center flex-col gap-2">
          <div>
            <IoWaterOutline size={80} />
          </div>
          <h5 className="text-lg font-bold text-primary">Last Watered</h5>
          <p>{lastWatered}</p>
        </div>
        <div className="p-8 bg-base-300 rounded-2xl flex justify-center items-center flex-col gap-2">
          <div>
            <GiPlantWatering size={80} />
          </div>
          <h5 className="text-lg font-bold text-primary">Watering Frequency</h5>
          <p>
            {`
            ${wateringFrequencyTimes} ${
              wateringFrequencyTimes > 1 ? "times in" : "time in"
            }
            ${`
              ${
                wateringFrequencyDays
                  ? wateringFrequencyDays + " day"
                  : wateringFrequencyWeeks + " week"
              }
            `}
            `}
          </p>
        </div>
        <div className="p-8 bg-base-300 rounded-2xl flex justify-center items-center flex-col gap-2">
          <div>
            <RiWaterFlashFill size={80} />
          </div>
          <h5 className="text-lg font-bold text-primary">Next Watering</h5>
          <p>{nextWatering}</p>
        </div>
      </div>

      {user.email === userEmail || (
        <div className="my-10">
          <h3 className="text-xl font-bold text-primary">Owner Info</h3>
          <div>
            <h5 className="font-semibold">{userName}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetails;
