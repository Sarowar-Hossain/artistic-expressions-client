import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <img
          className="rounded-3xl w-[600px]"
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=740&t=st=1686602341~exp=1686602941~hmac=df11998c130877327928dacdf261719d898cf7183fdffb890a6fc831bd6ad449"
          alt=""
        />
      </div>
      <Link
        className="px-6 py-2 rounded-lg bg-cyan-500 text-white font-semibold text-2xl"
        to="/"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
