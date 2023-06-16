import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../Context/AuthContext";
import AXIOS from "../Axios/UseAxios";

const UseIsUser = () => {
    const { user } = useContext(UserContext);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        AXIOS.get(`/manage-user/newUser/${user?.email}`).then((res) => {
          // console.log("is newUser hooks: ", res);
          setIsUser(res.data.IsUser);
        });
      }, [user, AXIOS]);
      return isUser;
};

export default UseIsUser;