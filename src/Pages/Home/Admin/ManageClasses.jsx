import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { QueryClientProvider, QueryClient } from "react-query";
import AXIOS from "../../../Axios/UseAxios";
import { UserContext } from "../../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const queryClient = new QueryClient();

const ManageClasses = () => {
  const { user } = useContext(UserContext);
  const [ClassId, setClassId] = useState(null);
  const classesQueryKey = "classes";

  const { data: classes, refetch } = useQuery(classesQueryKey, () =>
    fetch("https://assignmentserver-nine.vercel.app/classes").then((res) => res.json())
  );

  const handleDelete = (id) => {
    AXIOS.delete(`/class-delete/${id}`).then((res) => {
      console.log(res);
      toast.info("Deleted!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      refetch();
      // refetch after updating data
    });
  };

  const handleDenied = (id) => {
    AXIOS.patch(`/class-denied/${id}`).then((res) => {
      console.log(res);
      toast.error("Denied!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      refetch();
      // refetch after updating data
    });
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    AXIOS.patch(`/class-feedback/${ClassId}`, { feedback: feedback }).then(
      (res) => {
        console.log(res.data);
        toast.success("Feedback sent!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        refetch();
        window.my_modal_3.close();
      }
    );
  };

  const handleApproved = (id) => {
    AXIOS.patch(`/class-approved/${id}`).then((res) => {
      console.log(res);
      toast.success("Approved!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      refetch();
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch, user]);

  return (
    <div className="container">
      <table className="table w-full">
        <thead>
          <tr className="text-center  text-[#333333]">
            <th className="bg-[#FFC852] font-semibold">Class Image</th>
            <th className="bg-[#FFC852] font-semibold"> Class name</th>
            <th className="bg-[#FFC852] font-semibold">Instructor name</th>
            <th className="bg-[#FFC852] font-semibold">Available seats</th>
            <th className="bg-[#FFC852] font-semibold">Price</th>
            <th className="bg-[#FFC852] font-semibold">Status</th>
            <th className="bg-[#FFC852] font-semibold">Deny</th>
            <th className="bg-[#FFC852] font-semibold">Approve</th>
            <th className="bg-[#FFC852] font-semibold">Feedback</th>
            <th className="bg-[#FFC852] font-semibold">Delete</th>
          </tr>
        </thead>
        {classes?.map((Class, index) => (
          <tbody key={Class._id} className="border">
            <tr className="hover:border-2 ">
              <td className="font-medium text-base">
                <img
                  className="w-[120px] h-[60px] object-cover"
                  src={Class.photo_url}
                  alt=""
                />
              </td>
              <td className=" font-medium text-base">{Class.class_name}</td>
              <td className=" font-medium text-base">
                {Class.instructor_name} <br />
                <small>{Class.instructor_email}</small>
              </td>
              <td className=" font-medium text-base">
                {Class.available_seats}
              </td>
              <td className=" font-medium text-base">{Class.price}</td>
              <td className=" font-medium text-base">{Class.status}</td>

              <td>
                <button
                  onClick={() => {
                    setClassId(Class._id);
                    handleDenied(Class._id);
                    window[`my_modal_${index + 1}`].showModal();
                  }}
                  className={`${
                    Class.status === "denied" || Class.status === "approved"
                      ? "disabled font-medium text-base border-2 px-2 py-1 rounded-lg"
                      : "px-2 py-1 bg-[#1EC0FF] rounded hover:text-white"
                  }`}
                >
                  Deny
                </button>
              </td>
              <td className="">
                <button
                  onClick={() => {
                    handleApproved(Class._id);
                  }}
                  className={`${
                    Class.status === "denied" || Class.status === "approved"
                      ? "disabled font-medium text-base border-2  px-2 py-1 rounded-lg"
                      : "px-2 py-1 bg-[#1EC0FF] rounded hover:text-white font-medium text-base"
                  }`}
                >
                  Approve
                </button>
                <ToastContainer />
              </td>
              <td>
                <button
                  onClick={() => {
                    setClassId(Class._id);
                    window.my_modal_3.showModal();
                  }}
                  className={`px-2 py-1 bg-[#FFC852] rounded hover:text-white font-medium text-base`}
                >
                  Feedback
                </button>
              </td>

              <td>
                <button
                className="font-bold text-xl hover:bg-[#FFC852] px-3 py-1 rounded-full"
                  onClick={() => handleDelete(Class._id)}
                >
                  X
                </button>
              </td>
            </tr>
            <dialog id={`my_modal_${index + 1}`} className="modal">
              <form onSubmit={handleFeedback} className="modal-box text-start">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={(e) => {
                    e.preventDefault();
                    window.my_modal_3.close();
                  }}
                >
                  X
                </button>
                <h3 className="font-bold text-lg text-center">FeedBack</h3>
                <p className="pb-4 font-base">
                  Send Your Feedback to Instructor
                </p>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Bio"
                  name="feedback"
                ></textarea>
                <button
                  type="submit"
                  className="px-full mt-2 bg-[#F05C5C] hover:bg-[#a12323] hover:text-white font-semibold rounded-lg py-1 text-center w-full"
                >
                  Sent
                </button>
              </form>
            </dialog>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ManageClasses;
