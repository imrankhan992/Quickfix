import React from "react";
import submitprofile from "../../assets/submitprofile.gif";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const SubmitProfile = () => {

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
      <div className="flex items-center justify-center flex-col w-full h-screen">
        <div className="flex flex-col items-center justify-center">
          {" "}
          <img src={submitprofile} className="w-52" alt="profilesubmiticon" />
          <p className="text-greencolor text-3xl font-bold">Hurray!</p>
          <h3 className="text-primarycolor text-2xl font-bold text-center">
            Your Profile submit successfully
          </h3>
          <p className="text-primarycolor text-center items-center py-3">
            Our team review your profile with in 48 business hours
          </p>
        </div>
        <div className="flex md:flex-row flex-col  items-center justify-center gap-3">
          <Link to={"/"}>
          <Button className="px-8 rounded-xl bg-thirdcolor text-primarycolor  hover:text-hoverblack hover:bg-hovercolor outline outline-primarycolor">
            Home Page
          </Button>
          </Link>

          <Link to={"/serviceprovider/dashboard/home"} className="bg-buttoncolor border border-buttonborder px-8 rounded-xl outline outline-buttonborder text-primarycolor py-2 ">
            Go to profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubmitProfile;
