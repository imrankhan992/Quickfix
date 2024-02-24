import React from "react";
import { FaCheckCircle } from "react-icons/fa";
const Congratulation = () => {
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
      <div className="flex flex-col justify-center items-center w-full h-[100%]">
        <FaCheckCircle className="text-5xl text-greencolor animate-bounce " />
        <div className="text-3xl text-primarycolor text-center ">congratulations! your Account has been created</div>
      </div>
    </div>
  );
};

export default Congratulation;
