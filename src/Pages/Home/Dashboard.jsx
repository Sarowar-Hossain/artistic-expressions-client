import { Link, NavLink, Outlet } from "react-router-dom";
import UseIsInstructor from "../../Hooks/UseIsInstructor";
import UseIsAdmin from "../../Hooks/UseIsAdmin";
import UseIsUser from "../../Hooks/UseIsUser";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import dashboardImg from "/dashboard.webp";
import logo from "/logo.png";
import { useState } from "react";

const Dashboard = () => {
  const isAdmin = UseIsAdmin();
  const isInstructor = UseIsInstructor();
  const isUser = UseIsUser();
  const [showBg, setShowBG] = useState(true);

  const handleBG = () => {
    setShowBG(false);
  };

  console.log("Admin: ", isAdmin);
  console.log("Instructor:", isInstructor);
  console.log("isUser:", isUser);

  return (
    <div className="relative">
      <Navbar></Navbar>
      <div className="flex gap-0">
        <div className="w-[350px]">
          <motion.ul
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="menu w-[280px] h-screen bg-[#FFC852] p-4 text-base-content"
          >
            {isAdmin ? (
              <>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <NavLink onClick={handleBG} to="manage-class">Manage Class</NavLink>
                </motion.li>
                <motion.li className="text-xl">
                  <NavLink onClick={handleBG} to="manage-user"> Manage Users</NavLink>
                </motion.li>
                <div className="divider"></div>
                <motion.li className="text-xl">
                  <Link to="/"> Home</Link>
                </motion.li>
                <motion.li className="text-xl">
                  <Link to="/classes">Classes</Link>
                </motion.li>
                <motion.li className="text-xl">
                  <Link to="/instructors">Instructors</Link>
                </motion.li>
              </>
            ) : isInstructor ? (
              <>
                {" "}
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <NavLink onClick={handleBG} to="my-classes">My Classes</NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <NavLink onClick={handleBG} to="add-Class">Add A Class</NavLink>
                </motion.li>
                <div className="divider"></div>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <Link to="/"> Home</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <Link to="/classes">Classes</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <Link to="/instructors">Instructors</Link>
                </motion.li>
              </>
            ) : isUser ? (
              <>
                {" "}
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <NavLink onClick={handleBG} to="selected-class">
                    {" "}
                    Selected Classes
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <NavLink onClick={handleBG} to="enrolled-classes"> Enrolled Classes</NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <NavLink onClick={handleBG} to="payment"> Payment</NavLink>
                </motion.li>
                <div className="divider"></div>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <Link to="/"> Home</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <Link to="/classes">Classes</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl"
                >
                  <Link to="/instructors">Instructors</Link>
                </motion.li>
              </>
            ) : (
              <></>
            )}
          </motion.ul>
        </div>
        {showBg ? (
          <>
            {" "}
            <div
              style={{ backgroundImage: `url(${dashboardImg})` }}
              className={
                "w-[980px] h-[500px] justify-center  bg-no-repeat bg-cover bg-center absolute left-[360px] top-[300px]"
              }
            >
              <div className="flex flex-col justify-center items-center absolute left-[250px] bottom-[450px]">
                <img src={logo} alt="" className="w-[220px]" />
                <h1 className="text-5xl font-semibold ">
                  Welcome to Dashboard
                </h1>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="w-4/6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
