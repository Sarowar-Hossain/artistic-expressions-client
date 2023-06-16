import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SubBanner from "./SubBanner";
import banner from "/banner.jpg";
import { ThreeDots } from "react-loader-spinner";
import InstructorCard from "./InstructorCard/InstructorCard";
import AXIOS from "../../Axios/UseAxios";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    AXIOS.get("/users").then((res) => {
      const filter = res.data.filter(
        (instructor) => instructor.roll === "instructor"
      );
      setInstructors(filter);
      setLoader(false);
    });
  }, []);

  if (loader) {
    return (
      <div className="flex justify-center items-center">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#FFC852"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div>
      <SubBanner banner={banner} title={"Instructors"}></SubBanner>
      <div className="my-10">
        <h1 className=" text-2xl font-semibold mb-6">Popular Instructors</h1>
        <div className="flex flex-wrap gap-8 cardBody justify-center items-center">
        {instructors.map((instructor) => (
          <InstructorCard
            key={instructor._id}
            instructor={instructor}
          ></InstructorCard>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Instructors;
