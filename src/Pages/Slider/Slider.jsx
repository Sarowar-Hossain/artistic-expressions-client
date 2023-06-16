
import "./SliderStyle.css";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

const Slider = () => {
  const img1 =
    "https://i.ibb.co/0YkZpQ4/little-girl-is-holding-drawing-white-frame-palm-flower-print-75145-49.jpg";
  const img2 =
    "https://i.ibb.co/4VQScrN/little-girl-carpet-with-pencils-23-2147797854.jpg";
  const img3 =
    "https://i.ibb.co/0VfCzBq/girl-with-brush-near-set-water-colors-paper-sitting-floor-23-2148037931.jpg";
  const img4 =
    "https://i.ibb.co/j61gxVN/close-up-kid-painting-with-brush-23-2149065937.jpg";
  const img5 = "https://i.ibb.co/HNVBz8r/little-girl-drawing-329181-9419.jpg";
  return (
    <div className="slider-card">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img3} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img4} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img5} alt="" /></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
