import React, { useState } from "react";
import { motion } from "framer-motion";
import './BannerStyle.css'

const banner =
  "https://i.ibb.co/CvzwysQ/dirty-coloured-palette-paint.jpg";

const Banner = () => {
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const handleTransitionEnd = () => {
    setIsTransitionComplete(true);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 5.0 }}
        style={{
          backgroundImage: `url(${banner})`,
        }}
        className={
          "w-full h-[300px] md:h-[600px] bg-no-repeat bg-cover bg-center rounded-lg"
        }
      ></motion.div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 2.0 }}
        className="absolute inset-0 bg-black opacity-60 rounded-lg"
      ></motion.div>

      <motion.div
        initial={{ x: "-250%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 2.0 }}
        
        className={`textDiv absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold md:text-5xl ${
          isTransitionComplete ? "translate-x-0" : ""
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <p className="text-center mb-4">Welcome to Our Website</p>
        <p className="text-center">Artistic Expressions</p>
      </motion.div>
    </div>
  );
};

export default Banner;
