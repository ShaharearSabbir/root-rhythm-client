import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import PlantCard from "../Components/PlantCard";
import { Link } from "react-router";
import { FaCirclePlus } from "react-icons/fa6";
import Loader from "../Components/Loader";

const MyPlants = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`https://root-rhythms-server.vercel.app/plants/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <div className="mt-10 flex justify-between items-center">
        <h3 className="text-2xl font-bold">My Plants</h3>
        <Link to="/addPlant" className="btn btn-primary">
          {" "}
          <FaCirclePlus size={18} /> Add Plant
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

export default MyPlants;
