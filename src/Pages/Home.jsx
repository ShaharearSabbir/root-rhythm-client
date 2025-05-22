import React from "react";
import Banner from "../Components/Banner/Banner";
import AllCategories from "../Components/AllCategories";
import AboutUs from "../Components/AboutUs";

const Home = () => {
  return (
    <div>
      <div className="rounded-3xl overflow-hidden">
        <Banner></Banner>
      </div>
      <AllCategories></AllCategories>
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;
