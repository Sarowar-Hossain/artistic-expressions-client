import React from "react";
import "./InstructorCard.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const InstructorCard = ({ instructor }) => {
  return (
    <div className="">
      <div className="this-card">
        <div className="img-bx">
          <img className="" src={instructor.photo} alt="img" />
        </div>
        <div className="content">
          <div className="detail">
            <h2>
              {instructor.name}
              <br />
              <span>{instructor.email}</span>
            </h2>
            <ul className="sci">
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f">
                    <FaInstagram></FaInstagram>
                  </i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter">
                    <FaLinkedinIn></FaLinkedinIn>
                  </i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-linkedin-in">
                    <FaTwitter></FaTwitter>
                  </i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram">
                    {" "}
                    <FaFacebook></FaFacebook>
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
