import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import PlantCard from "../Components/PlantCard";

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/plants/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
      });
  }, []);
  return (
    <div>
      <h3 className="text-2xl bg-base-300 p-5 rounded-lg font-bold">
        My Plants
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        {plants.map((plant) => (
          <PlantCard key={plant._id} plant={plant}></PlantCard>
        ))}
      </div>
    </div>
  );
};

export default MyPlants;
