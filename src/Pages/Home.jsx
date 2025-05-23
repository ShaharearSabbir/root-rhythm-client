import React from "react";
import Banner from "../Components/Banner/Banner";
import AllCategories from "../Components/AllCategories";
import AboutUs from "../Components/AboutUs";
import WhyUs from "../Components/WhyUs";
import Latest from "../Components/Latest";
import FAQ from "../Components/FAQ";
import { useLoaderData } from "react-router";
import BeginnerFriendly from "../Components/BeginnerFriendly";
import { Helmet } from "react-helmet";

const Home = () => {
  const { categories, latestPlants, easyPlants } = useLoaderData();
  return (
    <div className="motion-translate-y-in-100">
      <Helmet>
        <title>Home | Root Rhythm</title>
      </Helmet>
      <div className="rounded-3xl overflow-hidden">
        <Banner></Banner>
      </div>
      <AllCategories categories={categories}></AllCategories>
      <Latest latestPlants={latestPlants}></Latest>
      <BeginnerFriendly easyPlants={easyPlants}></BeginnerFriendly>
      <AboutUs></AboutUs>
      <FAQ></FAQ>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
