import React from "react";
import logo from "/logo.png";
import { FaTwitter, FaFacebook, FaYoutube, FaPhone, FaAddressBook, FaEnvelope} from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-[#111827]">
      <footer className="footer p-10 flex flex-col md:flex-row justify-around text-neutral-content">
        <div className="mb-6 md:mb-0">
          <img src={logo} alt="" />
        </div>
        <div>
          <span className="footer-title ">Info</span>
          <Link to='/'>-Home</Link>
          <Link to='/instructors'>-Instructors</Link>
          <Link to='/classes'>-Classes</Link>
          <Link to='/dashboard'>-Dashboard</Link>
        </div>
        <div>
          <p className="flex items-center gap-2"><span><FaPhone></FaPhone></span> Phone: +123456789</p>
          <p className="flex items-center gap-2"><span><FaAddressBook></FaAddressBook></span> Address: New York, USA</p>
          <p className="flex items-center gap-2"><span><FaEnvelope></FaEnvelope></span> Mail: mdsarowar1812@gmail.com</p>
          <span className="footer-title ">Social</span>
          <div className="flex gap-4">
            <a href="#" className="text-white text-2xl">
              <FaTwitter></FaTwitter>
            </a>
            <a href="#" className="text-white text-2xl">
              <FaFacebook></FaFacebook>
            </a>
            <a href="#" className="text-white text-2xl">
              <FaYoutube></FaYoutube>
            </a>
          </div>
        </div>
      </footer>
      <div className="text-center bg-gray-950 py-2 text-white">
        <p>Copyright © 2023 - All right reserved by Md Sarowar Hossain</p>
      </div>
    </div>
  );
};

export default Footer;
