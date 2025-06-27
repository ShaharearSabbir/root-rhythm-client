import React, { useState } from "react";
import { Link } from "react-router";
import PlantCard from "../Shared/PlantCard";

const Latest = ({ latestPlants }) => {
  const [plants, setPlants] = useState(latestPlants);
  return (
    <div className="my-10 md:my-20 lg:my-32">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">New Plants</h3>
        <Link to="/allPlants" className="btn btn-primary">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 my-6 lg:my-10">
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
