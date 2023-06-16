import React from "react";
import { useEffect } from "react";
import AXIOS from "../../Axios/UseAxios";
import { useContext } from "react";
import { UserContext } from "../../Context/AuthContext";
import { useState } from "react";

const MyClasses = () => {
  const { user } = useContext(UserContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    AXIOS.get(`/classes/${user?.email}`).then((res) => {
      setClasses(res.data);
    });
  }, []);

  console.log(classes);

  return (
    <div>
      <div>
        <table className="table w-full">
          <thead>
            <tr className="text-center text-[#333333] text-lg">
              <th className="bg-[#FFC852] font-semibold">Class Name</th>
              <th className="bg-[#FFC852] font-semibold">Class Status</th>
              <th className="bg-[#FFC852] font-semibold">Price</th>
              <th className="bg-[#FFC852] font-semibold">Enrolled Students</th>
              <th className="bg-[#FFC852] font-semibold">Available Seats</th>
              <th className="bg-[#FFC852] font-semibold">FeedBack</th>
              <th className="bg-[#FFC852] font-semibold">Action</th>
            </tr>
          </thead>
          {classes.map((Class) => (
            <tbody key={user._id} className="border text-center">
              <tr className="">
                <td className=" font-medium text-base">{Class.class_name}</td>
                <td className=" font-medium text-base">{Class.status}</td>
                <td className=" font-medium text-base">${Class.price}</td>
                <td className=" font-medium text-base">{Class.enrolled_students}</td>
                <td className=" font-medium text-base">{Class.available_seats}</td>
                <td className=" font-medium text-base">{Class.feedback}</td>
                <td className=" font-medium text-base">
                  <button className="font-medium text-base px-2 py-1 bg-[#FFC852] rounded hover:text-white">
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
