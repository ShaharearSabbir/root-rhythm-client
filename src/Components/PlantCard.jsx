import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "./Context/AuthContext";
import { Toast } from "../util/utils";

const PlantCard = ({ plant, setPlants, plants }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const handleDelete = (id) => {
    fetch(`https://root-rhythms-server.vercel.app/plant/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          const remainingPlants = plants.filter((plant) => plant._id !== id);
          setPlants(remainingPlants);
        }
      });
  };

  return (
    <div className="lg:card lg:card-side bg-base-100 rounded-2xl overflow-hidden hover:shadow border-2 border-base-200 motion-translate-y-in-100">
      <div className="aspect-square lg:max-w-[300px] lg:min-w-[300px]">
        <img
          src={plant.photoURL}
          alt="Plant Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full p-10 space-y-2">
        <h2 className="text-xl font-bold">{plant.plantName}</h2>
        <p>
          <strong>Category: </strong> {plant.category}
        </p>
        <p>
          <strong>Care Level: </strong> {plant.careLevel}
        </p>
        <div className="w-full flex justify-end mt-8 items-end">
          <div className="flex flex-col gap-3 justify-end">
            {user?.email === plant.userEmail &&
              location.pathname === "/dashboard/myPlants" && (
                <div className="flex flex-col gap-3 justify-end">
                  <button
                    onClick={() => handleDelete(plant._id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboard/updatePlant/${plant._id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                </div>
              )}
            <Link to={`/plantDEtails/${plant._id}`} className="btn btn-primary">
              Show More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
