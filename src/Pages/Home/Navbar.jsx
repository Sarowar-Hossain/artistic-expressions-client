import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/logo.png";
import { UserContext } from "../../Context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userLogOut } = useContext(UserContext);

  const handleLogout = () => {
    userLogOut().then((result) => {
      localStorage.removeItem("access-token");
      window.location.reload();
    });
  };

  return (
    <div className="w-full bg-white">
      <nav className="py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center ">
              <Link to="/" title="home">
                <img src={logo} alt="" className="w-[150px]" />
              </Link>
            </div>
            <div className="hidden md:flex">
              <div className="ml-10 flex items-center my-4 space-x-4">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold underline text-xl text-[#F05C5C]"
                      : "font-semibold text-xl"
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold underline text-xl text-[#F05C5C]"
                      : "font-semibold text-xl"
                  }
                  to="/instructors"
                >
                  Instructors
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold underline text-xl text-[#F05C5C]"
                      : "font-semibold text-xl"
                  }
                  to="/classes"
                >
                  Classes
                </NavLink>

                {user ? (
                  <>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "font-semibold underline text-xl text-[#F05C5C]"
                          : "font-semibold text-xl"
                      }
                      to="dashboard"
                    >
                      Dashboard
                    </NavLink>

                    <div className="relative inline-block text-left">
                      <button
                        className="nav-link flex text-sm border-2  rounded-full"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        <img
                          className="h-[50px] w-[50px] object-cover rounded-full border-2  border-[#1EC0FF]"
                          src={user?.photoURL}
                          title={user?.displayName}
                          referrerPolicy="no-referrer"
                        />
                      </button>
                      <div
                        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                          isMenuOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="py-1 rounded-md bg-white shadow-xs">
                          <NavLink
                            to="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Profile
                          </NavLink>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={handleLogout}
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="block text-center w-full py-2 px-5 border border-transparent rounded-md text-xl font-medium text-[#333333] hover:bg-[#F05C5C] hover:text-white bg-[#FFC852] hover:[#F05C5C]"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              >
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 space-x-4 text-center pb-3 sm:px-3">
            <NavLink
              exact
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-lg text-[#F05C5C]"
                  : "font-semibold text-base"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/instructors"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-lg text-[#F05C5C]"
                  : "font-semibold text-base"
              }
            >
              Instructors
            </NavLink>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-lg text-[#F05C5C]"
                  : "font-semibold text-base"
              }
            >
              Classes
            </NavLink>
            {user ? (
              <>
                {" "}
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold underline text-lg text-[#F05C5C]"
                      : "font-semibold text-base"
                  }
                >
                  Dashboard
                </NavLink>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-6 text-gray-800">
                    {user?.displayName}
                  </div>
                  <div className="text-sm font-medium leading-5 text-gray-500">
                    {user?.email}
                  </div>
                </div>
                <button
                  //   onClick={handleLogout}
                  type="button"
                  className="ml-auto bg-gray-200 rounded-full flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#F05C5C]"
                >
                  <span className="sr-only">Sign out</span>
                  <i className="h-20 w-20 text-gray-600"><FaSignOutAlt></FaSignOutAlt></i>
                </button>
              </div>
            ) : (
              <div className="mt-3 px-2">
                <NavLink
                  to="/login"
                  className="block text-center w-full py-2 px-3 border border-transparent rounded-md text-base font-medium text-[#333333] hover:text-white bg-[#FFC852] hover:[#F05C5C]"
                >
                  Log in
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
