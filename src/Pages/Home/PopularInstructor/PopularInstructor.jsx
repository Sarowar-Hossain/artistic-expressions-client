import React, { useEffect, useState } from "react";
import AXIOS from "../../../Axios/UseAxios";
import { ThreeDots } from "react-loader-spinner";
import InstructorCard from "../InstructorCard/InstructorCard";
import "./PopularInstructor.css";
import { TypeAnimation } from "react-type-animation";

const PopularInstructor = () => {
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
    <div className="my-20 w-full">
      <span
        className="md:text-6xl text-3xl text-[#333333] font-semibold mb-6"
        style={{ fontFamily: "Signika Negative" }}
      >
        <TypeAnimation
          sequence={[
            "We Proud For Our Instructors",
            1000,
            "We Proud For Our Students",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ display: "inline-block" }}
          repeat={Infinity}
        />
      </span>
      <h2 className="text-xl mb-8 mt-4">Who Stand By Your Kids Always</h2>

      <div className="flex flex-wrap gap-8 cardBody justify-center items-center">
        {instructors.slice(0, 6).map((instructor) => (
          <InstructorCard
            key={instructor._id}
            instructor={instructor}
          ></InstructorCard>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
