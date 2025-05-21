import React from "react";
import { Link } from "react-router";

const Category = ({ category }) => {
  return (
    <div className="inline-block px-10 hover:scale-105">
      <Link to={`/category/${category.categoryName}`}>
        <img
          src={category.categoryPhotoURL}
          className="rounded-full h-64 w-64 object-cover hover:shadow-xl"
          alt="Shoes"
        />
        <h2 className="text-xl font-semibold text-center mt-4">
          {category.categoryName}
        </h2>
      </Link>
    </div>
  );
};

export default Category;
