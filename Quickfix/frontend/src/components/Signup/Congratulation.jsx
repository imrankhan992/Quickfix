import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Congratulation = () => {
  const navigate = useNavigate();
  const [count, setcount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prevalue) => --prevalue);
    }, 1000);

    if (count === 0) {
      navigate("/setup");
    }
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate]);
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
     
      <div className="flex flex-col justify-center items-center w-full h-[100%]">
      
        <FaCheckCircle className="text-5xl text-greencolor animate-bounce " />
        <div className="text-3xl text-primarycolor text-center ">
          congratulations! your Account has been created
        </div>
        <div className="flex justify-center  items-center text-primarycolor  w-full m-4">Redirecting.... {count}</div>
      </div>
    </div>
  );
};

export default Congratulation;
