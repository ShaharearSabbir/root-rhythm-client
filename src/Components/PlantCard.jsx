import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "./Context/AuthContext";

const PlantCard = ({ plant, setPlants, plants }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

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
    <div className="lg:card lg:card-side bg-base-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl motion-translate-y-in-100">
      <div className="aspect-square lg:max-w-[300px] lg:min-w-[250px]">
        <img
          src={plant.photoURL}
          alt="Plant Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full p-10 space-y-2">
        <h2 className="text-xl font-bold">{plant.plantName}</h2>
        <p>{plant.description}</p>
        <p>
          <strong>Category: </strong> {plant.category}
        </p>
        <p>
          <strong>Care Level: </strong> {plant.careLevel}
        </p>
        <div className="w-full flex justify-end mt-8 items-end">
          <div className="flex flex-col gap-3 justify-end">
            {user?.email === plant.userEmail &&
              location.pathname === "/myPlants" && (
                <div className="flex flex-col gap-3 justify-end">
                  <button
                    onClick={() => handleDelete(plant._id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/updatePlant/${plant._id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                </div>
              )}
            <Link to={`/plantDEtails/${plant._id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
