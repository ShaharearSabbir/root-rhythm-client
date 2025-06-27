import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";

import { Helmet } from "react-helmet";
import PlantCard from "../../Components/Shared/PlantCard";
import PageHeader from "../../Components/Shared/PageHeader";

const PlantByCategory = () => {
  const { category } = useParams();

  const initialPlants = useLoaderData;
  const [plants, setPlants] = useState(initialPlants);
  return (
    <div>
      <Helmet>
        <title>{category} | Root Rhythm</title>
      </Helmet>
      <PageHeader> {category}</PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
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
