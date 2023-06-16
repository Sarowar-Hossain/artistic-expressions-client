import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import SubBanner from "./SubBanner";
import banner from "/banner.jpg";
import { UserContext } from "../../Context/AuthContext";
import AXIOS from "../../Axios/UseAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UseRefetchUpdate from "../../Hooks/UseRefetchUpdate";
import UseIsAdmin from "../../Hooks/UseIsAdmin";
import UseIsInstructor from "../../Hooks/UseIsInstructor";
import { ThreeDots } from "react-loader-spinner";
import "./Classes.css";
import { FaChalkboardTeacher, FaDollarSign, FaUserAlt } from 'react-icons/fa';

const Classes = () => {
  const refetch = UseRefetchUpdate();
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState("");
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const isAdmin = UseIsAdmin();
  const isInstructor = UseIsInstructor();

  const handleCart = (id) => {
    if (!user) {
      return navigate("/login");
    }
    AXIOS.post(`/add-to-cart/${id}`, { email: user?.email })
      .then((res) => {
        console.log(res.data);
        toast.success("Bookmarked!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDetails = () => {
    toast.info("Details Coming Soon !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    fetch("https://assignmentserver-nine.vercel.app/classes")
      .then((res) => res.json())
      .then((data) => {
        setFilter(data);
        const result = data.filter((CLASS) => CLASS.status == "approved");
        setFilter(result);
        setLoader(false);
      });
  }, [user]);

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
      <SubBanner title={"Classes"} banner={banner}></SubBanner>
      <div className="my-10">
        <ToastContainer />
        <h1 className=" text-2xl font-semibold mb-6">
          Popular Classes Section
        </h1>
        <p>{error}</p>
        <div className="flex flex-wrap">
          {filter.map((clas) => (
            <div key={clas._id} class="card-list">
              <article class="card">
                <figure class="card-image">
                  <img src={clas.photo_url} />
                </figure>
                <div class="card-header">
                  <div className="text-start space-y-2">
                    <a className="card-title">{clas.class_name}</a>
                    <p className="text-xl flex items-center gap-2"><FaUserAlt></FaUserAlt> {clas.instructor_name}</p>
                    <p className="text-xl flex items-center justify-between gap-2">Seats: {clas.available_seats}
                    <span className="flex items-center font-semibold text-xl"><span><FaDollarSign></FaDollarSign></span> {clas.price}</span>
                    </p>
                  </div>
                  <button class="icon-button">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      display="block"
                      id="Heart"
                    >
                      <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                    </svg>
                  </button>
                </div>
                <div class="card-footer">
                  <div class="card-meta card-meta--views">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      display="block"
                      id="EyeOpen"
                    >
                      <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    2,465
                  </div>
                  <div class="card-meta card-meta--date">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      display="block"
                      id="Calendar"
                    >
                      <rect x="2" y="4" width="20" height="18" rx="4" />
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <path d="M2 10h20" />
                    </svg>
                    Jul 26, 2019
                  </div>
                  <div className="card-actions justify-center ms-6">
                    {isAdmin || isInstructor ? (
                      <>
                        {" "}
                        <button
                          onClick={handleDetails}
                          className="px-6  py-1 rounded font-semibold text-[#333333] hover:text-white bg-[#FFC852] hover:bg-[#F05C5C]"
                        >
                          Details
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <button
                          onClick={() => handleCart(clas._id)}
                          className=" px-6  py-1 rounded font-semibold text-[#333333] hover:text-white bg-[#FFC852] hover:bg-[#F05C5C]"
                        >
                          Select
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
