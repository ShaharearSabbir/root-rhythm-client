import React from "react";
import Banner from "../Components/Banner/Banner";
import AllCategories from "../Components/AllCategories";
import AboutUs from "../Components/AboutUs";
import WhyUs from "../Components/WhyUs";
import Latest from "../Components/Latest";
import FAQ from "../Components/FAQ";
import { useLoaderData } from "react-router";

const Home = () => {
  const { categories, latestPlants } = useLoaderData();
  return (
    <div>
      <div className="rounded-3xl overflow-hidden">
        <Banner></Banner>
      </div>
      <AllCategories categories={categories}></AllCategories>
      <Latest latestPlants={latestPlants}></Latest>
      <AboutUs></AboutUs>
      <FAQ></FAQ>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
