import React from "react";
import "./JoinusCard.css";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const JoinUsCard = () => {
  return (
    <>
      <div className="main flex justify-between">
        <div className="card rounded-lg flex justify-between flex-col px-4 py-10 gap-4 hover:text-hoverblack">
          <div className="flex items-center justify-center ">
            {/* <RiAccountPinBoxLine className="text-primarycolor text-2xl" /> */}
          <h3 className="text-7xl text-primarycolor font-bold  ">
            {" "}
            STEP 1
          </h3></div>
          <h1 className="text-primarycolor font-semibold text-5xl"> CREATE ACCOUNT</h1>
          <p className="text-primarycolor">Sign up for free, set up your Gig, and offer your work to our global audience.</p>
            <Link to={"/signup"} className="text-primarycolor flex gap-3 items-center ">Get started <FaArrowRightLong/></Link>
        </div>

        {/* second card */}

        <div className="card2 rounded-lg flex justify-between flex-col px-4 py-10 gap-4">
          <div className="flex items-center justify-center">
            {/* <RiAccountPinBoxLine className="text-primarycolor text-2xl" /> */}
          <h3 className="text-7xl text-primarycolor font-bold  hover:text-hoverblack">
            {" "}
            STEP 2
          </h3></div>
          <h1 className="text-primarycolor font-semibold text-5xl"> SETUP PROFILE</h1>
          <p className="text-primarycolor">Setup your profile and submit.</p>
            <Link to={"/signup"} className="text-primarycolor flex gap-3 items-center ">Get started <FaArrowRightLong/></Link>
        </div>

        {/* third card */}

        <div className="card3 rounded-lg flex justify-between flex-col px-4 py-10 gap-4">
          <div className="flex items-center justify-center">
            {/* <RiAccountPinBoxLine className="text-primarycolor text-2xl" /> */}
          <h3 className="text-7xl text-primarycolor font-bold  hover:text-hoverblack">
            {" "}
            STEP 3
          </h3></div>
          <h1 className="text-primarycolor font-semibold text-5xl"> GET PAID</h1>
          <p className="text-primarycolor">Get paid on time, every time. Payment is available for withdrawal as soon as it clears.</p>
            <Link to={"/signup"} className="text-primarycolor flex gap-3 items-center ">Get started <FaArrowRightLong/></Link>
        </div>
      </div>
    </>
  );
};

export default JoinUsCard;
