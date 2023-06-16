import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AXIOS from "../Axios/UseAxios";
import { useContext } from "react";
import { UserContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./SelectedClasses.css";
import UseRefetchUpdate from "../Hooks/UseRefetchUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK_TEST}`);

const SelectedClasses = () => {
  const { user } = useContext(UserContext);
  const [myClasses, setMyClasses] = useState([]);

  const handleDelete = (className) => {
    AXIOS.delete(`/user/delete-cart?email=${user?.email}&name=${className}`)
      .then((res) => {
        toast.success('Deleted!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setMyClasses((prevClasses) =>
          prevClasses.filter((myClass) => myClass.class_name !== className)
        );
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AXIOS.get(`/user/added-carts/${user?.email}`);
        setMyClasses(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <table className="table w-full">
        <ToastContainer />
        <thead>
          <tr className="text-center text-[#333333] text-lg">
            <th className="bg-[#FFC852] font-semibold">Class Image</th>
            <th className="bg-[#FFC852] font-semibold"> Class name</th>
            <th className="bg-[#FFC852] font-semibold">Instructor name</th>
            <th className="bg-[#FFC852] font-semibold">Available seats</th>
            <th className="bg-[#FFC852] font-semibold">Price</th>
            <th className="bg-[#FFC852] font-semibold">Delete</th>
            <th className="bg-[#FFC852] font-semibold">Pay</th>
          </tr>
        </thead>
        {myClasses.map((myClass, index) => (
          <tbody key={myClass._id} className="border text-center">
            <tr className="hover:border-2">
              <td>
                <img
                  className="w-[120px] h-[60px] object-cover"
                  src={myClass.photo_url}
                  alt=""
                />
              </td>
              <td className="font-medium text-base">{myClass.class_name}</td>
              <td className="font-medium text-base ">
                {myClass.instructor_name}
              </td>
              <td className="font-medium text-base">
                {myClass.available_seats}
              </td>
              <td className="font-medium text-base ">${myClass.price}</td>
              <td className="">
                <button
                  onClick={() => handleDelete(myClass.class_name)}
                  className={`font-medium text-base px-2 py-1 bg-[#FFC852] rounded hover:text-white`}
                >
                  Delete
                </button>
              </td>
              <td className="">
                <Link>
                  <button
                    className="btn"
                    onClick={() => window[`my_modal_${index+1}`].showModal()}
                  >
                    Pay
                  </button>
                </Link>
              </td>
            </tr>
            <dialog id={`my_modal_${index+1}`} className="modal">
              <div className="modal-box text-start">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => window[`my_modal_${index+1}`].close()}
                >
                  X
                </button>
                <h3 className="font-bold text-lg text-center">Payment</h3>
                <p className="pb-4 font-semibold text-lg">
                  Class Name: {myClass.class_name}
                </p>
                <p className="font-semibold text-lg mb-6">
                  Total Amount: ${myClass.price}
                </p>
                <Elements stripe={stripePromise}>
                  <CheckoutForm myClass={myClass} />
                </Elements>
              </div>
            </dialog>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default SelectedClasses;
