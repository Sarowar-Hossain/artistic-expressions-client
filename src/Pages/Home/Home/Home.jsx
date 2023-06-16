import React from "react";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import { useContext } from "react";
import { UserContext } from "../../../Context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import MoreAboutUs from "../../MoreAboutUs";
import Offer from "../Offer/Offer";
import SubscribeSection from "../SubscribeSection/SubscribeSection";
import Banner from "../Banner/Banner";

const Home = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    <InfinitySpin 
    width="200" 
    color="#4fa94d" 
    
    />;
  }

  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <MoreAboutUs></MoreAboutUs>
      <PopularInstructor></PopularInstructor>
      <Offer></Offer>
    </div>
  );
};

export default Home;
