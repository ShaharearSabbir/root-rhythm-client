import React from "react";
import Banner from "../../Components/Banner/Banner";
import Latest from "../../Components/Main/Latest";
import FAQ from "../../Components/Main/FAQ";
import { useLoaderData } from "react-router";
import { Helmet } from "react-helmet";
import AllCategories from "../../Components/Main/AllCategories";
import BeginnerFriendly from "../../Components/Main/BeginnerFriendly";

const Home = () => {
  const { categories, latestPlants, easyPlants } = useLoaderData();

  return (
    <div className="motion-translate-y-in-100">
      <Helmet>
        <title>Home | Root Rhythm</title>
      </Helmet>
      <div className=" max-h-[60vh] min-h-[60vh] overflow-hidden">
        <Banner></Banner>
      </div>
      <AllCategories categories={categories}></AllCategories>
      <Latest latestPlants={latestPlants}></Latest>
      <BeginnerFriendly easyPlants={easyPlants}></BeginnerFriendly>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
