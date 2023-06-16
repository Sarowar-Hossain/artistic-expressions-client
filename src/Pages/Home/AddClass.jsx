import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/AuthContext";
import AXIOS from "../../Axios/UseAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactiveButton from "reactive-button";

const imgHosting_Token = import.meta.env.VITE_IMAGE_APIKEY;

const AddClass = () => {
  const { user } = useContext(UserContext);
  const [state, setState] = useState("idle");
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${imgHosting_Token}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    setState("loading");
    const photoURL = data.photo_url[0];
    delete data.photo_url;

    const formData = new FormData();
    formData.append("image", photoURL);
    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        console.log(image);
        
        if (image.success) {
          AXIOS.post(`/class-add/${user?.email}`, {
            ...data,
            photo_url: image.data.display_url,
            status: "pending",
            enrolled_students: "0",
          })
            .then((res) => {
              console.log(res.data);
              setTimeout(() => {
                setState("success");
              }, 300);
              e.target.reset();
            })
            .catch((error) => console.log(error));
        }
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded px-8 mb-4 space-y-14"
      >
        <ToastContainer />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="class_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Class Name
            </label>
            <input
              {...register("class_name")}
              type="text"
              required
              name="class_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="photo_url"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Image
            </label>
            <input
              {...register("photo_url")}
              required
              type="file"
              name="photo_url"
              className="file-input  h-[40px] file-input-bordered file-input-warning shadow appearance-none border rounded w-full  "
            />
          </div>
          {/* bg-[#ffc400] */}
          <div>
            <label
              htmlFor="instructor_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Instructor Name
            </label>
            <input
              defaultValue={user?.displayName}
              readOnly
              {...register("instructor_name")}
              required
              type="text"
              name="instructor_name"
              //   defaultValue={user?.displayName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label
              htmlFor="instructor_email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Instructor email
            </label>
            <input
              defaultValue={user?.email}
              readOnly
              {...register("instructor_email")}
              required
              type="text"
              name="instructor_email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="available_seats"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Available Seats
            </label>
            <input
              {...register("available_seats")}
              required
              type="text"
              name="available_seats"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              {...register("price")}
              required
              type="number"
              name="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="short_bio"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              {...register("short_bio")}
              name="short_bio"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </div>
        <button type="submit">
          <ReactiveButton
            color={"yellow"}
            rounded={true}
            size={"large"}
            width={750}
            shadow={true}
            className={""}
            buttonState={state}
            idleText="Add Class"
            loadingText="Loading"
            successText="Done"
            // onClick={onClickHandler}
          />
        </button>
        {/* <button
          type="submit"
          className="hover:bg-[#c58b0d] mt-3 font-medium text-xl hover:text-white bg-[#FFC852] text-[#333333] w-full py-2 rounded-lg"
        >
          Add Class
        </button> */}
      </form>
    </div>
  );
};

export default AddClass;
