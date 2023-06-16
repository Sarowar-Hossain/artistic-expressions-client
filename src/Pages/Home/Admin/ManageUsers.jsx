import React, { useEffect, useState } from "react";
import AXIOS from "../../../Axios/UseAxios";
import UseRefetchUpdate from "../../../Hooks/UseRefetchUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const refetchUpdate = UseRefetchUpdate();
  console.log(users);

  const handleInstructor = (id) => {
    AXIOS.patch(`/user-roll/${id}`).then((res) => {
      toast.success("Promoted to Instructor!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      refetchUpdate();
    });
  };
  const handleAdmin = (id) => {
    AXIOS.patch(`/user-admin/${id}`).then((res) => {
      toast.success("Promoted to Admin!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      refetchUpdate();
    });
  };

  useEffect(() => {
    AXIOS.get("/users").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, [refetchUpdate]);

  return (
    <table className="table w-full">
      <thead>
        <tr className="text-center  text-[#333333]">
          <th className="bg-[#FFC852] font-semibold">Name</th>
          <th className="bg-[#FFC852] font-semibold">Email</th>
          <th className="bg-[#FFC852] font-semibold">Status</th>
          <th className="bg-[#FFC852] font-semibold">Action</th>
        </tr>
      </thead>
      {users.map((user) => (
        <tbody key={user._id} className="border text-center">
          <ToastContainer />
          <tr className="">
            <td className=" font-medium text-base">{user.name}</td>
            <td className=" font-medium text-base">{user.email}</td>
            <td className=" font-medium text-base">{user.roll}</td>
            <td className="font-normal flex gap-4">
              <button
                onClick={() => handleAdmin(user._id)}
                className={`${
                  user?.roll == "admin"
                    ? "disabled bg-black text-white px-3 rounded-lg"
                    : "px-4 py-2 bg-[#FFC852] hover:bg-[#1EC0FF] rounded-lg font-semibold"
                }`}
              >
                Make Admin
              </button>
              <button
                onClick={() => handleInstructor(user._id)}
                className={`${
                  user?.roll == "instructor"
                    ? `disabled bg-black text-white px-3 rounded-lg`
                    : "px-4 py-2 bg-[#F05C5C] hover:bg-[#1EC0FF] rounded-lg font-semibold"
                }`}
              >
                Make Instructor
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default ManageUsers;
