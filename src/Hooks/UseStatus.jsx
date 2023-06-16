import React, { useContext, useEffect } from "react";
import AXIOS from "../Axios/UseAxios";
import { UserContext } from "../Context/AuthContext";
import { useState } from "react";

const UseStatus = ({ status }) => {
  const { user } = useContext(UserContext);
  const [updateRoll, setUpdateRoll] = useState("");

  AXIOS.patch(`/user-roll/${user.email}`, { roll: status }).then((res) => {
    console.log(res);
    setUpdateRoll(res.data);
  });

  return updateRoll;
};

export default UseStatus;
