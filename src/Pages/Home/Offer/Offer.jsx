import React, { useEffect, useState } from "react";
import { FaGripLines } from "react-icons/fa";
const img = "https://i.ibb.co/sgkzrDZ/child-draws-rainbow-with-markers.jpg";

const Offer = () => {

  return (
    <div className="w-full h-[400px] my-[80px] rounded-xl">
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${img})`,
        }}
        className="w-full h-[400px] bg-no-repeat bg-cover bg-center rounded-xl"
      ></div>
      <div className="bg-black upperDiv opacity-60 w-[1215px] h-[400px] absolute top-[0px] rounded-xl"></div>
      <div
        className="thisDiv absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ fontFamily: "Signika Negative" }}
      >
        <div>
          <h1 className="text-5xl font-extrabold text-white mb-3">
            Special Offer
          </h1>
          <p className="text-6xl font-extrabold text-white">SAVE 30%</p>
          <p className="text-white text-lg my-4">
            Free Artistic Backpack For Any Course Gift 1 Colorful
            Backpack!
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Offer;
