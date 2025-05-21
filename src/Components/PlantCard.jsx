import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const PlantCard = ({ plant, setPlants, plants }) => {
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
    console.log(id);
    fetch(`http://localhost:5000/plant/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          const remainingPlants = plants.filter((plant) => plant._id !== id);
          console.log(remainingPlants);
          setPlants(remainingPlants);
        }
      });
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <img
          src={plant.photoURL}
          className="max-w-[250px] max-h-[200px] object-cover"
          alt={plant.plantName}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{plant.plantName}</h2>
        <p>{plant.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/updatePlant/${plant._id}`} className="btn btn-primary">
            Update
          </Link>
          <button
            onClick={() => handleDelete(plant._id)}
            className="btn btn-secondary text-accent-content"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
