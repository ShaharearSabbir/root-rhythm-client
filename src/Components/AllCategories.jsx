import React, { useEffect, useState } from "react";
import Category from "./Category";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((result) => {
        setCategories(result);
      });
  }, []);
  return (
    <div>
      <h3 className="text-2xl font-bold mt-20 mb-10">All Categories</h3>
      <div className="overflow-x-auto whitespace-nowrap p-5">
        {categories.map((category) => (
          <Category key={category._id} category={category}></Category>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
