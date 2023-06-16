import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AuthContext";
import ReactiveButton from "reactive-button";

const Login = () => {
  const [state, setState] = useState("idle");
  const { googleLogin, loginUser, setIsInstructor, setIsAdmin, setUser } =
    useContext(UserContext);

  const navigate = useNavigate();
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
    loginUser(email, password)
      .then((result) => {
        setUser(result.user);
        setTimeout(() => {
          setState("success");
        }, 300);
        console.log(result.user);
        navigate("/");
      })
      .then((error) => console.log(error));
    console.log(data);
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
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
        });
        navigate("/");
      })
      .then((error) => console.log(error));
  };

  return (
    <div className="container right-panel-active registration-body mx-auto mt-6">
      {/* Sign Up */}
      <div className="container__form container--signup z-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          className="form"
          id="form1"
        >
          <h2 className="text-2xl font-semibold mb-2">Login</h2>
          <input
            type="email"
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
          <button type="submit" className="mt-4 my-6">
          <ReactiveButton
            color={"yellow"}
            rounded={true}
            size={"large"}
            width={200}
            shadow={true}
            className={""}
            buttonState={state}
            idleText="Login"
            loadingText="Processing..."
            successText="Done"
          />
        </button>
          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/registration" className="text-blue-500">
              Register
            </Link>{" "}
          </p>
          <div className="mt-6 flex gap-4 items-center ">
            <p>Sign in with google:</p>
            <button onClick={handleGoogleLogin}>
              <svg height="2em" viewBox="0 0 488 512">
                <style>svg{`fill:#14161a`}</style>
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="container__overlay z-0">
        <div className="overlay z-0" />
      </div>
    </div>
  );
};

export default Login;