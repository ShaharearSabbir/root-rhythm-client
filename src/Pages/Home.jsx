import React, { useContext, useEffect } from "react";
import Banner from "../Components/Banner/Banner";
import AllCategories from "../Components/AllCategories";
import WhyUs from "../Components/WhyUs";
import Latest from "../Components/Latest";
import FAQ from "../Components/FAQ";
import { useLoaderData } from "react-router";
import BeginnerFriendly from "../Components/BeginnerFriendly";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Components/Context/AuthContext";

const Home = () => {
  const { categories, latestPlants, easyPlants } = useLoaderData();

  // const { loader, user, googleSignIn } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!loader && !user) {
  //     console.log("No user found, attempting Google sign-in...");
  //     googleSignIn();
  //   }
  // }, [loader, user, googleSignIn]);

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
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
