import React, { useContext, useEffect, useState } from "react";
import "./RegistrationStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../Context/AuthContext";
import AXIOS from "../../../Axios/UseAxios";
import ReactiveButton from "reactive-button";

const imgHosting_Token = import.meta.env.VITE_IMAGE_APIKEY;
const Registration = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState("idle");
  const { registerUser, userProUpdate, userLogOut, googleLogin } =
    useContext(UserContext);
  const navigate = useNavigate();

  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${imgHosting_Token}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, event) => {
    setState("loading");
    event.preventDefault();
    const password = data.password;
    const email = data.email;
    const name = data.name;
    // const photo = data.photoURL;
    setError("");

    // password validation
    if (!/(?=.*[A-Z])/.test(password)) {
      return setError("Password need a uppercase");
    } else if (password.length < 6) {
      return setError("password should be more than 6 character");
    } else if (!/(?=.*[!@#$%&?"])/.test(password)) {
      return setError("Password need a special character");
    } else if (password !== data.password2) {
      return setError("Password Doesn't matched");
    }
    // ------------------------------------------------------

    const formData = new FormData();
    formData.append("image", data.photoURL[0]);
    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgURL) => {
        if (imgURL.success) {
          const img_URL = imgURL.data.display_url;
          const info = { name, email, password, photo: img_URL, roll: "users" };
          console.log(info);
          registerUser(email, password)
            .then((result) => {
              const signInUser = result.user;
              console.log(signInUser);
              userProUpdate(name, info.photo)
                .then((result) => {
                  // --------------------------------
                  // AXIOS.post('/users', info).then(res=>{
                  //   console.log(res)
                  //   .then((data) => {
                  //     console.log("registration: ", data);
                  //     setTimeout(() => {
                  //       setState("success");
                  //     }, 300);
                  //     userLogOut();
                  //     navigate("/login");
                  //   })
                  // })
                  // ----------------------------------------------

                  fetch("https://assignmentserver-nine.vercel.app/users", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(info),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log("registration: ", data);
                      setTimeout(() => {
                        setState("success");
                      }, 300);
                      userLogOut();
                      navigate("/login");
                    })
                    .catch((error) => console.log(error));

              //  ---------------------------------------------------------- 
                })
                .then((error) => console.log(error.message));
            })
            .then((error) => console.log(error.message));
        }
      });

    // -----------------------------------------------------
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const info = {
          name: user?.displayName || "",
          email: user?.email || "",
          password: user?.password || "",
          photo: user?.photoURL || "",
          roll: "users",
        };
        fetch("https://assignmentserver-nine.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("registration :", data);
          });
        navigate("/");
      })
      .then((error) => console.log(error));
  };

  return (
    <div className="container right-panel-active registration-body mx-auto mt-6">
      {/* Sign Up */}
      <div className="container__form container--signup">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          className="form"
          id="form1"
        >
          <h2 className="text-2xl font-semibold mb-2">Registration</h2>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="input"
          />
          <input
            type="file"
            placeholder="Photo URL"
            {...register("photoURL")}
            className="file-input  w-full max-w-xs"
          />

          <input
            type="text"
            required
            placeholder="Your Email"
            {...register("email")}
            className="input"
          />
          <input
            type="password"
            required
            placeholder="Password"
            {...register("password")}
            className="input"
          />

          <input
            type="password"
            required
            placeholder="Confirm Password"
            {...register("password2")}
            className="input"
          />
          <small className="text-error">{error}</small>
          {/* <button type="submit" className="btn">
            Register
          </button> */}
          <button type="submit" className="mt-4 mb-6">
            <ReactiveButton
              color={"yellow"}
              rounded={true}
              size={"large"}
              width={200}
              shadow={true}
              className={""}
              buttonState={state}
              idleText="Register"
              loadingText="Processing..."
              successText="Done"
            />
          </button>

          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>{" "}
          </p>
          <div className="mt-4 flex gap-4 items-center ">
            <p>Sign in with google:</p>
            <button onClick={handleGoogleLogin}>
              <svg

                height="2em"
                viewBox="0 0 488 512"
              >
                <style>svg{`fill:#14161a`}</style>
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="container__overlay z-0">
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default Registration;
