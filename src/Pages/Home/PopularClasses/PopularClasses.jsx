import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ThreeDots } from "react-loader-spinner";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("https://assignmentserver-nine.vercel.app/classes")
      .then((res) => res.json())
      .then((data) => {
        const result = data.filter((CLASS) => CLASS.status === "approved");
        setClasses(result);
        setLoader(false);
      });
  }, []);

  if (loader) {
    return (
      <div className="flex justify-center items-center">
        <ThreeDots
          height={80}
          width={80}
          radius={9}
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
    <div className="my-14">
      <h1 className="text-2xl font-semibold mb-6">Popular Class Section</h1>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: -200,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {classes.slice(0, 5).map((CLASS) => (
            <SwiperSlide key={CLASS._id}>
              <div className="card w-full md:w-80 h-[400px] gap-0 border-2">
                <figure>
                  <img
                    className="h-[250px] w-full object-cover"
                    src={CLASS.photo_url}
                    alt="car!"
                  />
                </figure>
                <div className="text-start">
                  <h2 className="card-title my-2">Name: {CLASS.class_name}</h2>
                  <h2 className="my-2">Price: ${CLASS.available_seats}</h2>
                  <h2 className="my-2">
                    Available Seats: {CLASS.available_seats}
                  </h2>
                  <h2 className="my-2">
                    Instructor Name: {CLASS.instructor_name}
                  </h2>
                  <div className=" ">
                    <button className="w-full px-6 py-1 rounded-xl font-semibold text-[#333333] bg-[#FFC852] hover:bg-[#F05C5C]">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularClasses;
