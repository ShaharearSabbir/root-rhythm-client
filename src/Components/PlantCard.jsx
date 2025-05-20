import React from "react";
import { Link } from "react-router";

const PlantCard = ({ plant }) => {
  return (
    <Link
      to={`/plantDEtails/${plant._id}`}
      className="card lg:card-side bg-base-100 shadow-sm"
    >
      <figure>
        <img src={plant.photoURL} alt={plant.plantName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{plant.plantName}</h2>
        <p>{plant.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/updatePlant/${plant._id}`} className="btn btn-primary">
            Update
          </Link>
          <button className="btn btn-secondary text-accent-content">
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
