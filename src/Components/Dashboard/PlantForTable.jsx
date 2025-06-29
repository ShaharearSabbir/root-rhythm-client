import React from "react";
import { Link } from "react-router";

const PlantForTable = ({ plant, index }) => {
  const {
    plantName,
    category,
    wateringFrequencyTimes,
    wateringFrequencyDays,
    wateringFrequencyWeeks,
    photoURL,
    _id,
    careLevel,
  } = plant;

  return (
    <tr className="border-b-2 border-base-300">
      <th className="hidden md:block">
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
      <td>
        {" "}
        <p>
          {`
            ${wateringFrequencyTimes} ${
            wateringFrequencyTimes > 1 ? "times in" : "time in"
          }
            ${`
              ${
                wateringFrequencyDays
                  ? wateringFrequencyDays + " day"
                  : wateringFrequencyWeeks + " week"
              }
            `}
            `}
        </p>
      </td>
      <td>{careLevel}</td>
      <th className="flex justify-end">
        <Link to={`/plantDEtails/${_id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </th>
    </tr>
  );
};

export default PlantForTable;
