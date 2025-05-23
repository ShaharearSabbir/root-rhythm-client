import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import PlantCard from "../Components/PlantCard";
import { Helmet } from "react-helmet";

const PlantByCategory = () => {
  const { category } = useParams();

  const initialPlants = useLoaderData;
  const [plants, setPlants] = useState(initialPlants);
  return (
    <div>
      <Helmet>
        <title>{category} | Root Rhythm</title>
      </Helmet>
      <h3 className="text-2xl bg-base-300 p-5 rounded-lg font-bold">
        {category}
      </h3>

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

export default PlantByCategory;
