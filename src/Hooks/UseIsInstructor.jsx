import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../Context/AuthContext";
import AXIOS from "../Axios/UseAxios";

const UseIsInstructor = () => {
    const { user } = useContext(UserContext);
    const [isInstructor, setIsInstructor] = useState(false);

    useEffect(() => {
        AXIOS.get(`/manage-user/instructor/${user?.email}`).then((res) => {
          console.log("is instructor hooks: ", res);
          setIsInstructor(res.data.instructor);
        });
      }, [user, AXIOS]);
      return isInstructor;
};

export default UseIsInstructor;