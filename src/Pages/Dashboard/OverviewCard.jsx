import React from "react";
import { BiArrowFromRight, BiSolidArrowFromLeft } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router";

const OverviewCard = ({ name, count, Icon, route }) => {
  return (
    <div className="border-2 border-base-200 shadow p-5 lg:p-10 flex gap-5 hover:shadow-primary">
      <div className="text-7xl">{Icon}</div>
      <div className="flex justify-between items-center flex-1">
        <div>
          <h4 className="text-lg font-bold">{name}</h4>
          <p>Number: {count}</p>
        </div>
        {route && (
          <Link to={route} className="btn btn-primary">
            View All <BsArrowRight size={23} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
