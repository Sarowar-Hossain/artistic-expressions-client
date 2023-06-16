import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const UseLoader = (ok) => {
  const [loader, setLoader] = useState(ok);
  if (loader == ok) {
    return (
      <div className="flex justify-center items-center">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#FFC852"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }
};

export default UseLoader;
