import { useContext, useEffect } from "react";
import { UserContext } from "../Context/AuthContext";
import AXIOS from "../Axios/UseAxios";
import { useState } from "react";

const UseIsAdmin = () => {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    AXIOS.get(`/manage-user/admin/${user?.email}`).then((res) => {
      console.log("is admin hooks: ", res);
      setIsAdmin(res.data.admin);
    });
  }, [user, AXIOS]);
  return isAdmin;
};

export default UseIsAdmin;
