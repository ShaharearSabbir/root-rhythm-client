import React from "react";
import Banner from "../Components/Banner/Banner";
import AllCategories from "../Components/AllCategories";
import AboutUs from "../Components/AboutUs";
import WhyUs from "../Components/WhyUs";

const Home = () => {
  return (
    <div>
      <div className="rounded-3xl overflow-hidden">
        <Banner></Banner>
      </div>
      <AllCategories></AllCategories>
      <AboutUs></AboutUs>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
