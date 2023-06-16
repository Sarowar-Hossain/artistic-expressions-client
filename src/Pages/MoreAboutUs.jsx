import React from "react";
import Slider from "./Slider/Slider";
import { FaCheckSquare } from "react-icons/fa";

const img1 =
  "https://i.ibb.co/0YkZpQ4/little-girl-is-holding-drawing-white-frame-palm-flower-print-75145-49.jpg";
const img2 =
  "https://i.ibb.co/4VQScrN/little-girl-carpet-with-pencils-23-2147797854.jpg";
const img3 =
  "https://i.ibb.co/0VfCzBq/girl-with-brush-near-set-water-colors-paper-sitting-floor-23-2148037931.jpg";
const img4 =
  "https://i.ibb.co/j61gxVN/close-up-kid-painting-with-brush-23-2149065937.jpg";
const img5 = "https://i.ibb.co/HNVBz8r/little-girl-drawing-329181-9419.jpg";

const MoreAboutUs = () => {
  return (
    <div className="md:h-[600px] w-full md:flex items-center justify-around gap-[120px] text-center md:text-start">
        <h1 className="hidden md:block"></h1>
      <div className="md:w-1/2 px-6 space-y-6">
        <h1>Discover Create Inspire</h1>
        <h1
          style={{ fontFamily: "Signika Negative" }}
          className="text-5xl font-extrabold"
        >
          Learn About Our Work Culture{" "}
          <span className="text-[#F05C5C]">Artistic Expressions</span>
        </h1>
        <p>
          As a word from our heart, we love to dedicate for Kids the valuable
          things in Life. A great education is a must for solid developments in
          both soul and mind for kids. We go with kids to play, learn, and grow
          better.
        </p>
        <ul className="md:flex  hidden  gap-20 ">
          <div className="md:flex flex-col justify-start">
            <li className="flex items-center  gap-2 font-semibold text-lg">
              <span className="text-[#F05C5C] text-xl">
                <FaCheckSquare />
              </span>{" "}
              Regular Class
            </li>
            <li className="flex items-center justify-center gap-2 font-semibold text-lg">
              <span className="text-[#F05C5C] text-xl">
                <FaCheckSquare />
              </span>
              Special Teacher
            </li>
          </div>
          <div className="flex flex-col justify-start">
            <li className="flex items-center ms-2 gap-2 font-semibold text-lg">
              <span className="text-[#F05C5C] text-xl">
                <FaCheckSquare />
              </span>{" "}
              Special Cares
            </li>
            <li className="flex items-center justify-center gap-2 font-semibold text-lg">
              <span className="text-[#F05C5C] text-xl">
                <FaCheckSquare />
              </span>
              Good Result
            </li>
          </div>
        </ul>
        <button className="hover:shadow-2xl hover:bg-[#c22d2d] px-10 font-semibold text-xl py-2 bg-[#F05C5C] text-white rounded-xl">
          See More
        </button>
      </div>
      <div className="md:w-1/2 mt-8 md:m-0 w-full">
        <Slider></Slider>
      </div>
    </div>
  );
};

export default MoreAboutUs;
