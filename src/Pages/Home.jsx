import React from "react";
import Banner from "../Components/Banner/Banner";
import AllCategories from "../Components/AllCategories";

const Home = () => {
  return (
    <div>
      <div className="rounded-3xl overflow-hidden">
        <Banner></Banner>
      </div>
      <AllCategories></AllCategories>
    </div>
  );
};

export default Home;
