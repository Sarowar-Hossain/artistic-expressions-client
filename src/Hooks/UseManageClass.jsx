import React from "react";
import { useQuery} from "react-query";
import AXIOS from "../Axios/UseAxios";

const UseManageClass = (id) => {

  const { isLoading, data, refetch } = useQuery(["class-denied", id], {
    queryFn: async () => {
      const res = await AXIOS.patch(`/class-denied/${id}`);
      return res.data;
    },
  });
  return [data, isLoading, refetch];
};

export default UseManageClass;
