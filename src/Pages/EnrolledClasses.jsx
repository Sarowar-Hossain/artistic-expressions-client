import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import AXIOS from "../Axios/UseAxios";
import "ka-table/style.css";
import { Table } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";

const EnrolledClasses = () => {
  const { user } = useContext(UserContext);
  const [EnrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    AXIOS.get(`/user/enrolled-classes/${user?.email}`).then((res) => {
      setEnrolledClasses(res.data);
    });
  }, [user, AXIOS]);
  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr className="text-center text-[#333333] text-lg">
            <th className="bg-[#FFC852] font-semibold">#</th>
            <th className="bg-[#FFC852] font-semibold">Class name</th>
            <th className="bg-[#FFC852] font-semibold">Enrolled Date</th>
            <th className="bg-[#FFC852] font-semibold">Details</th>
          </tr>
        </thead>
        {EnrolledClasses.map((Enrolled, index) => (
          <tbody key={Enrolled._id} className="border text-center">
            <tr className="hover:border-2 text-center">
              <td className="font-medium text-base">{index + 1}</td>
              <td className="font-medium text-base">{Enrolled.class_name}</td>
              <td className="text-start font-medium text-base">
                {new Date(Enrolled.date).toLocaleTimeString()}{" "}
                {new Date(Enrolled.date).toLocaleDateString()}
              </td>
              <td className="flex items-center justify-center gap-2">
                <button className=" font-medium text-base px-2 py-1 bg-[#FFC852] rounded hover:text-white">
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default EnrolledClasses;
