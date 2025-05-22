import React from "react";
import { useLoaderData } from "react-router";
import PlantForTable from "../Components/plantForTable";

const AllPlants = () => {
  const plants = useLoaderData();
  console.log(plants);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Plant Name</th>
            <th>Category</th>
            <th>Watering Frequency</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, index) => (
            <PlantForTable
              key={plant._id}
              plant={plant}
              index={index}
            ></PlantForTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPlants;
