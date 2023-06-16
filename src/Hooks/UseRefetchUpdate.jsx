import { useQueryClient } from "react-query";

const UseRefetchUpdate = () => {
  const RefetchUpdate = useQueryClient();
  return () => RefetchUpdate.invalidateQueries("classes");
};

export default UseRefetchUpdate;
