import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { UserContext } from "../Context/AuthContext";
import AXIOS from "../Axios/UseAxios";

const Payment = () => {
  const { user } = useContext(UserContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    AXIOS.get(`/user/payments/${user?.email}`).then((res) => {
      setPayments(res.data);
    });
  }, []);

  return (
    <div>
      {" "}
      <table className="table w-full">
        <thead>
          <tr className="text-center text-[#333333] text-lg">
            <th className="bg-[#FFC852] font-semibold">#</th>
            <th className="bg-[#FFC852] font-semibold">Class name</th>
            <th className="bg-[#FFC852] font-semibold">Enrolled Date and Time</th>
            <th className="bg-[#FFC852] font-semibold">Transaction Id</th>
            <th className="bg-[#FFC852] font-semibold">Amount</th>
            <th className="bg-[#FFC852] font-semibold">Details</th>
          </tr>
        </thead>
        {payments.map((payment, index) => (
          <tbody key={payment._id} className="border text-center">
            <tr className="hover:border-2">
              <td className="font-medium text-base">{index + 1}</td>
              <td className="font-medium text-base">{payment.class_name}</td>
              <td className="font-medium text-base">
                {new Date(payment.date).toLocaleTimeString()} {" "}
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td className="font-medium text-base">{payment.transactionId}</td>
              <td className="font-medium text-base">${payment.amount}</td>
              <td>
                <button className="font-medium text-base px-2 py-1 bg-[#FFC852] rounded hover:text-white">Details</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Payment;
