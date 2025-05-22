import React, { useState } from "react";
import { Link } from "react-router";
import PlantCard from "./PlantCard";

const Latest = ({ latestPlants }) => {
  const [plants, setPlants] = useState(latestPlants);
  console.log(latestPlants);
  return (
    <div className="my-20">
      <div className="bg-base-300 p-5 rounded-lg flex justify-between items-center">
        <h3 className="text-2xl font-bold">New Plants</h3>
        <Link to="/allPlants" className="btn btn-primary">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        {plants.map((plant) => (
          <PlantCard
            key={plant._id}
            plants={plants}
            setPlants={setPlants}
            plant={plant}
          ></PlantCard>
        ))}
      </div>
    </div>
  );
};

export default Latest;
