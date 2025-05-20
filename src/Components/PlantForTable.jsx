import React from "react";
import { Link } from "react-router";

const PlantForTable = ({ plant, index }) => {
  const { plantName, category, wateringFrequency, photoURL, _id } = plant;

  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={photoURL} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{plantName}</div>
          </div>
        </div>
      </td>
      <td>{category}</td>
      <td>{wateringFrequency}</td>
      <th>
        <Link to={`/plantDEtails/${_id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </th>
    </tr>
  );
};

export default PlantForTable;
